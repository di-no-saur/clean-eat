import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { mockUsers } from "../../utils/mockData";

const MOCK_MODE = true;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (MOCK_MODE) {
        setUsers(mockUsers);
      } else {
        const { data } = await api.get("/admin/users");
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-status`);
      toast.success("User status updated");
      fetchUsers();
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Phone</th>
              <th className="px-6 py-3 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.phone || "-"}</td>
                <td className="px-6 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
