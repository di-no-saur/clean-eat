import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ desc: "Method Not Allowed" });
  }

  const { orderData } = req.body;
  if (!orderData) {
    return res.status(400).json({ desc: "Missing orderData" });
  }

  // Vercel Environment Variables
  const CLIENT_ID = "73044e1d-00c0-4e9d-a7ca-54dd61163d4a";
  const API_KEY = "f53de674-6285-4d61-a5d3-f0b4a1971f80";
  const CHECKSUM_KEY =
    "d3b7315841ce1eab0dca3d96949625b8395fbe9b61f02a2ad5b90264427c24ea";

  if (!CLIENT_ID || !API_KEY || !CHECKSUM_KEY) {
    console.error("PayOS credentials not found in environment variables.");
    return res.status(500).json({ desc: "Server missing PayOS configuration" });
  }

  try {
    const payload = {
      orderCode: Number(
        String(orderData.orderCode).replace(/\D/g, "") || Date.now(),
      ),
      amount: Math.round(orderData.amount),
      description:
        `EATCLEAN ${String(orderData.orderCode).substring(10)}`.substring(
          0,
          25,
        ),
      buyerName: orderData.buyerName,
      buyerEmail: orderData.buyerEmail,
      buyerPhone: orderData.buyerPhone,
      buyerAddress: orderData.buyerAddress,
      returnUrl: `${req.headers.origin || "http://localhost:5173"}/checkout/success`,
      cancelUrl: `${req.headers.origin || "http://localhost:5173"}/checkout/cancel`,
      expiredAt: Math.floor(Date.now() / 1000) + 600,
    };

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
    const signature = crypto
      .createHmac("sha256", CHECKSUM_KEY)
      .update(dataString)
      .digest("hex");

    const response = await fetch(
      "https://api-merchant.payos.vn/v2/payment-requests",
      {
        method: "POST",
        headers: {
          "x-client-id": CLIENT_ID,
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          signature,
        }),
      },
    );

    const responseData = await response.json();

    if (responseData.code !== "00") {
      console.error("PayOS API Error:", responseData);
      return res.status(400).json(responseData);
    }

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Vercel PayOS API Error:", error);
    return res
      .status(500)
      .json({ desc: error.message || "Internal Server Error" });
  }
}
