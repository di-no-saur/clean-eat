import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaUtensils,
  FaClipboard,
  FaUsers,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {
  const { user, isAuthenticated, logout, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const menuItems = [
    { icon: FaChartLine, label: t("dashboard"), path: "/admin/dashboard" },
    { icon: FaUtensils, label: t("products"), path: "/admin/meals" },
    { icon: FaClipboard, label: t("orderManagement"), path: "/admin/orders" },
    { icon: FaUsers, label: t("users"), path: "/admin/users" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">🥗 EAT CLEAN</div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <item.icon className="text-lg" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow px-6 py-3 flex justify-end">
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
              <FaUser className="text-gray-700" />
              <span className="text-sm text-gray-700 hidden sm:inline">
                {user?.name}
              </span>
            </button>

            {/* Dropdown Menu - Khoảng cách được xử lý bằng padding thay vì margin */}
            <div className="absolute right-0 top-full pt-2 w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50">
              <div className="bg-white rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg flex items-center gap-2 text-red-600"
                >
                  <FaSignOutAlt /> {t("logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
