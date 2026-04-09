import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { mockOrders } from "../../utils/mockData";
import { formatVND } from "../../utils/formatCurrency";
const MOCK_MODE = true;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        let localOrders = JSON.parse(
          localStorage.getItem("mockOrders") || "[]",
        );

        // lọc order hợp lệ
        localOrders = localOrders.filter(
          (order) =>
            order && order.orderNumber && order.totalPrice && order.user,
        );

        let filtered = [...localOrders];

        if (filter) {
          filtered = filtered.filter((order) => order.orderStatus === filter);
        }

        setOrders(filtered);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (orderId, newStatus) => {
    if (MOCK_MODE) {
      const localOrders = JSON.parse(
        localStorage.getItem("mockOrders") || "[]",
      );

      const updatedOrders = localOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order,
      );

      localStorage.setItem("mockOrders", JSON.stringify(updatedOrders));

      toast.success("Order status updated");

      fetchOrders();
      return;
    }

    // Real API
    api.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
  };

  const updatePayment = (orderId, newStatus) => {
    if (MOCK_MODE) {
      const localOrders = JSON.parse(
        localStorage.getItem("mockOrders") || "[]",
      );

      const updatedOrders = localOrders.map((order) =>
        order._id === orderId ? { ...order, paymentStatus: newStatus } : order,
      );

      localStorage.setItem("mockOrders", JSON.stringify(updatedOrders));

      toast.success("Payment status updated");

      fetchOrders();
      return;
    }

    // Real API
    api.put(`/admin/orders/${orderId}/payment`, { paymentStatus: newStatus });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <div className="flex gap-2 mb-4">
          {["", "confirmed", "preparing", "delivering", "completed"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status
                  ? status.charAt(0).toUpperCase() + status.slice(1)
                  : "All"}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold">Order #</th>
              <th className="px-6 py-3 font-semibold">Customer</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Payment</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{order.orderNumber}</td>
                <td className="px-6 py-3">{order.user?.name}</td>
                <td className="px-6 py-3 font-bold text-green-600">
                  {formatVND(order.totalPrice)}
                </td>
                <td className="px-6 py-3">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivering">Delivering</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-3">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updatePayment(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="px-6 py-3">
                  <button className="text-blue-600 hover:underline text-xs">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
