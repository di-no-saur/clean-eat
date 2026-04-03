import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "user@eatclean.com",
    password: "123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData.email, formData.password);

      if (formData.email === "admin@eatclean.com") navigate("/admin/dashboard");
      else navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-2">🥗 EAT CLEAN</h1>
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
        {t("loginToAccount")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t("emailAddress")}
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {t("password")}
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading ? "Logging in..." : t("login")}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        {t("dontHaveAccount")}{" "}
        <Link
          to="/register"
          className="text-primary-600 font-semibold hover:underline"
        >
          {t("register")}
        </Link>
      </p>
    </div>
  );
};

export default Login;
