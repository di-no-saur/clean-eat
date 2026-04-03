import { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

// MOCK MODE - Set to true to work without backend
const MOCK_MODE = true;

// Demo accounts for mock mode
const MOCK_USERS = {
  "admin@eatclean.com": {
    _id: "admin123",
    name: "Admin User",
    email: "admin@eatclean.com",
    phone: "0901234567",
    password: "123456",
    role: "admin",
    isActive: true,
  },
  "user@eatclean.com": {
    _id: "user123",
    name: "User",
    email: "user@eatclean.com",
    phone: "0907654321",
    password: "123456",
    role: "user",
    isActive: true,
  },
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (MOCK_MODE) {
        // Mock mode: check localStorage only
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await api.get("/auth/me");
          setUser(data.data);
        }
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      if (MOCK_MODE) {
        // Mock mode login
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password) {
          const { password: _, ...userWithoutPassword } = mockUser;
          localStorage.setItem("token", "mock-token-" + Date.now());
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          setUser(userWithoutPassword);
          toast.success("Login successful!");
          return { user: userWithoutPassword, token: "mock-token" };
        } else {
          toast.error("Invalid email or password");
          throw new Error("Invalid credentials");
        }
      } else {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast.success("Login successful!");
        return data;
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      if (MOCK_MODE) {
        // Mock mode register
        const newUser = {
          _id: "user" + Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || "",
          role: "user",
          isActive: true,
        };
        localStorage.setItem("token", "mock-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        toast.success("Registration successful! (Mock Mode)");
        return { user: newUser, token: "mock-token" };
      } else {
        const { data } = await api.post("/auth/register", userData);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast.success("Registration successful!");
        return data;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!MOCK_MODE) {
        await api.post("/auth/logout");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      if (MOCK_MODE) {
        // Mock mode update
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("Profile updated successfully (Mock Mode)");
        return { data: updatedUser };
      } else {
        const { data } = await api.put("/auth/updateprofile", profileData);
        setUser(data.data);
        toast.success("Profile updated successfully");
        return data;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
