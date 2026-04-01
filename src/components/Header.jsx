import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/UseCart";
import { useTranslation } from "react-i18next";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaLanguage,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../img/logo.jpg";

const Header = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { cartItemCount, fetchCart } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    fetchCart();
  }, []);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || "vi";
    const newLang = currentLang.includes("en") ? "vi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Eat Clean Logo"
              className="h-[50px] w-auto rounded-full object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              {t("home")}
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              {t("menu")}
            </Link>
            <Link
              to="/meal-plans"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              {t("mealPlans")}
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              {t("about")}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title={`Switch to ${i18n.language === "en" ? "Vietnamese" : "English"}`}
            >
              <FaLanguage className="text-gray-700 text-lg" />
            </button>

            {/* Cart */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FaShoppingCart className="text-gray-700 text-lg" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Links */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition hidden sm:inline"
                >
                  {t("login")}
                </Link>
                <Link to="/register" className="btn-primary">
                  {t("register")}
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2">
                  <FaUser className="text-gray-700" />
                  <span className="text-sm text-gray-700 hidden sm:inline">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu - Khoảng cách được xử lý bằng padding thay vì margin */}
                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50">
                  <div className="bg-white rounded-lg shadow-lg">
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 first:rounded-t-lg"
                      >
                        {t("admin")}
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {t("profile")}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {t("orders")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg flex items-center gap-2 text-red-600"
                    >
                      <FaSignOutAlt /> {t("logout")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
