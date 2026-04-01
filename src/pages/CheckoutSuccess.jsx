import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/UseCart";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getPaymentStatus } from "../utils/payosService";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  const orderCode = searchParams.get("orderCode");
  const isMock = searchParams.get("mock") === "true";

  useEffect(() => {
    const processOrder = async () => {
      try {
        if (!orderCode) {
          navigate("/checkout");
          return;
        }

        // Lấy thông tin thanh toán từ PayOS
        if (!isMock) {
          const paymentStatus = await getPaymentStatus(orderCode);
          if (paymentStatus.data?.status !== "PAID") {
            navigate("/checkout/cancel");
            return;
          }
        }

        // Tạo order mới
        const newOrder = {
          id: orderCode,
          userId: user?.id,
          customerName: user?.fullName || "Guest",
          customerEmail: user?.email || "",
          customerPhone: user?.phone || "",
          date: new Date().toISOString(),
          status: "processing",
          paymentMethod: "payos",
          paymentStatus: "paid",
          notes: "Paid via PayOS",
        };

        // Lưu vào localStorage
        const MOCK_MODE = true;
        if (MOCK_MODE) {
          const orders = JSON.parse(localStorage.getItem("mockOrders") || "[]");
          localStorage.setItem(
            "mockOrders",
            JSON.stringify([...orders, newOrder]),
          );
        }

        setOrderData(newOrder);
        clearCart();
        setLoading(false);
      } catch (error) {
        console.error("Error processing order:", error);
        setLoading(false);
      }
    };

    processOrder();
  }, [orderCode, navigate, clearCart, user, isMock]);

  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="spinner"></div>
        <p className="text-lg text-gray-600 mt-4">{t("processing")}...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-20">
      <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">✓</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          {t("paymentSuccess") || "Thanh toán thành công"}
        </h1>

        <p className="text-gray-600 mb-4">
          {t("orderPlaced") || "Đơn hàng của bạn đã được đặt thành công"}
        </p>

        {/* Order Details */}
        {orderData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                {t("orderCode") || "Mã đơn hàng"}:
              </span>
              <span className="font-semibold">{orderData.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t("date") || "Ngày đặt"}:</span>
              <span className="font-semibold">
                {new Date(orderData.date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t("status") || "Trạng thái"}:
              </span>
              <span className="font-semibold text-blue-600">
                {t("processing") || "Đang xử lý"}
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <p className="text-sm text-gray-500 mb-8">
          {t("confirmationEmail") ||
            "Chúng tôi sẽ gửi email xác nhận đơn hàng của bạn"}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 btn-primary"
          >
            {t("viewOrders") || "Xem đơn hàng"}
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
          >
            {t("continueShopping") || "Tiếp tục mua"}
          </button>
        </div>
      </div>
    </div>
  );
}
