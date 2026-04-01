import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { mockOrders } from "../utils/mockData";
import { useAuth } from "../context/AuthContext";

const MOCK_MODE = true;

const OrderHistory = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      if (MOCK_MODE) {
        // Mock mode: get orders from localStorage + mockOrders
        const localOrders = JSON.parse(
          localStorage.getItem("mockOrders") || "[]",
        );
        console.log("mockOrders:", mockOrders);
        console.log("localOrders:", localOrders);
        console.log("user:", user);
        const userOrders = [...localOrders].filter(
          (order) => order?.user?._id === user?._id,
        );
        setOrders(userOrders);
      } else {
        const { data } = await api.get("/orders/myorders");
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-yellow-100 text-yellow-800",
      delivering: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{t("orderHistory")}</h1>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">No orders yet</p>
            <Link to="/menu" className="btn-primary inline-block">
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm text-gray-600">{t("orderNumber")}</p>
                    <p className="font-bold text-lg">{order.orderNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">{t("date")}</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">{t("status")}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}
                    >
                      {t(order.orderStatus)}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">{t("total")}</p>
                    <p className="font-bold text-lg text-primary-600">
                      ${order.totalPrice}
                    </p>
                  </div>

                  <div className="text-right">
                    <Link
                      to={`/orders/${order._id}`}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <FaEye /> {t("viewOrder")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
