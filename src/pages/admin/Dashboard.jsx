import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../utils/api";
import { FaUsers, FaClipboard, FaUtensils, FaDollarSign } from "react-icons/fa";
import { mockUsers, mockMeals } from "../../utils/mockData";
import { formatVND } from "../../utils/formatCurrency";
const MOCK_MODE = true;

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    window.addEventListener("storage", fetchStats);

    return () => window.removeEventListener("storage", fetchStats);
  }, []);

  const fetchStats = async () => {
    try {
      if (MOCK_MODE) {
        let orders = JSON.parse(localStorage.getItem("mockOrders") || "[]");

        // lọc order hợp lệ
        orders = orders.filter(
          (o) =>
            o &&
            o.orderNumber &&
            o.totalPrice !== undefined &&
            o.user &&
            o.createdAt,
        );

        let meals = JSON.parse(localStorage.getItem("meals") || "[]");
        if (meals.length === 0) {
          localStorage.setItem("meals", JSON.stringify(mockMeals));
          meals = mockMeals;
        }

        const totalOrders = orders.length;

        const totalRevenue = orders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0,
        );

        const recentOrders = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setStats({
          totalUsers: mockUsers.length,
          totalMeals: meals.length,
          totalOrders,
          totalRevenue,
          recentOrders,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t("totalUsers"),
      value: stats?.totalUsers || 0,
      icon: FaUsers,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t("totalOrders"),
      value: stats?.totalOrders || 0,
      icon: FaClipboard,
      color: "bg-green-100 text-green-600",
    },
    {
      title: t("products"),
      value: stats?.totalMeals || 0,
      icon: FaUtensils,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: t("totalRevenue"),
      value: formatVND(stats?.totalRevenue || 0),
      icon: FaDollarSign,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  {card.title}
                </p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <div className={`p-4 rounded-lg ${card.color}`}>
                <card.icon className="text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b">
              <tr>
                <th className="pb-3 font-semibold">Order #</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-semibold">{order.orderNumber}</td>
                  <td className="py-3">{order.user?.name}</td>
                  <td className="py-3 font-bold text-green-600">
                    {formatVND(order.totalPrice)}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
