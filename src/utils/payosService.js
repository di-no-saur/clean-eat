import CryptoJS from "crypto-js";
import axios from "axios";

const PAYOS_CLIENT_ID = "73044e1d-00c0-4e9d-a7ca-54dd61163d4a";
const PAYOS_API_KEY = "f53de674-6285-4d61-a5d3-f0b4a1971f80";
const PAYOS_CHECK_SUM_KEY =
  "d3b7315841ce1eab0dca3d96949625b8395fbe9b61f02a2ad5b90264427c24ea";

// Tạo chữ ký HMAC SHA256
export const generateSignature = (data) => {
  const dataString = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.HmacSHA256(dataString, PAYOS_CHECK_SUM_KEY).toString();
};

// Tạo payment link từ PayOS
export const createPaymentLink = async (orderData) => {
  try {
    // Nếu đang chạy trên máy chủ thật (Production) -> Gọi Vercel Serverless Function
    if (import.meta.env.PROD) {
      const response = await axios.post("/api/create-payment-link", {
        orderData,
      });
      if (response.data && response.data.code !== "00") {
        throw new Error(response.data.desc || "PayOS Error");
      }
      return response.data;
    }

    // Nếu chạy dưới local máy dev (npm run dev) -> Dùng code tạo signature ở Client như cũ
    // Nếu không có API key, dùng mock mode
    if (!PAYOS_CLIENT_ID || !PAYOS_API_KEY) {
      console.warn("PayOS credentials not found, using mock mode");
      return {
        success: true,
        data: {
          checkoutUrl: `/checkout/success?orderCode=${orderData.orderCode}&mock=true`,
          qrCode: `https://api.payos.vn/v1/qr-code/${orderData.orderCode}`,
          orderCode: orderData.orderCode,
        },
      };
    }

    const payload = {
      orderCode: Number(
        String(orderData.orderCode).replace(/\D/g, "") || Date.now(),
      ), // Ensure orderCode is a number for PayOS
      amount: Math.round(orderData.amount),
      description:
        `EATCLEAN ${String(orderData.orderCode).substring(10)}`.substring(
          0,
          25,
        ), // max 25 chars
      buyerName: orderData.buyerName,
      buyerEmail: orderData.buyerEmail,
      buyerPhone: orderData.buyerPhone,
      buyerAddress: orderData.buyerAddress,
      returnUrl: `${window.location.origin}/checkout/success`,
      cancelUrl: `${window.location.origin}/checkout/cancel`,
      expiredAt: Math.floor(Date.now() / 1000) + 600, // 10 phút
    };

    // PayOS requires signature of amount, cancelUrl, description, orderCode, returnUrl
    const signatureData = {
      amount: payload.amount,
      cancelUrl: payload.cancelUrl,
      description: payload.description,
      orderCode: payload.orderCode,
      returnUrl: payload.returnUrl,
    };

    const sortedKeys = Object.keys(signatureData).sort();
    const dataString = sortedKeys
      .map((key) => `${key}=${signatureData[key]}`)
      .join("&");
    const signature = generateSignature(dataString);

    // Gửi request tới PayOS API
    const response = await axios.post(
      "/payos-api/v2/payment-requests",
      {
        ...payload,
        signature,
      },
      {
        headers: {
          "x-client-id": PAYOS_CLIENT_ID,
          "x-api-key": PAYOS_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.code !== "00") {
      console.error("PayOS API returned error:", response.data);
      throw new Error(response.data.desc || "PayOS Error");
    }

    return response.data;
  } catch (error) {
    console.error("PayOS Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Tạo link thanh toán thất bại",
    );
  }
};

// Xác thực webhook từ PayOS
export const verifyWebhook = (body, signature) => {
  const dataString = JSON.stringify(body);
  const calculatedSignature = generateSignature(dataString);
  return calculatedSignature === signature;
};

// Lấy trạng thái thanh toán
export const getPaymentStatus = async (orderCode) => {
  try {
    if (!PAYOS_CLIENT_ID || !PAYOS_API_KEY) {
      return { success: true, data: { status: "PAID" } };
    }

    const response = await axios.get(
      `/payos-api/v2/payment-requests/${orderCode}`,
      {
        headers: {
          "x-client-id": PAYOS_CLIENT_ID,
          "x-api-key": PAYOS_API_KEY,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Get payment status error:", error);
    throw error;
  }
};

// Hủy payment link
export const cancelPaymentLink = async (orderCode) => {
  try {
    if (!PAYOS_CLIENT_ID || !PAYOS_API_KEY) {
      return { success: true };
    }

    const response = await axios.delete(
      `/payos-api/v2/payment-requests/${orderCode}`,
      {
        headers: {
          "x-client-id": PAYOS_CLIENT_ID,
          "x-api-key": PAYOS_API_KEY,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Cancel payment error:", error);
    throw error;
  }
};

export default {
  createPaymentLink,
  verifyWebhook,
  getPaymentStatus,
  cancelPaymentLink,
  generateSignature,
};
