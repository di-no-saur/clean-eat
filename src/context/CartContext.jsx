import { createContext, useState, useContext, useEffect, useMemo } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import {
  mockMeals,
  getMockCart,
  saveMockCart,
  calculateCartTotals,
} from "../utils/mockData";
import { getMeals } from "../utils/mockDb";
export const CartContext = createContext();

// MOCK MODE - Set to true to work without backend
const MOCK_MODE = true;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        const mockCart = { ...getMockCart() };
        mockCart.items = [...mockCart.items];

        const meals = getMeals();

        // Lọc item hợp lệ (meal còn tồn tại)
        const validItems = mockCart.items.filter((item) =>
          meals.some((m) => m._id === item.meal),
        );

        // Nếu có item bị admin xoá → cập nhật lại cart
        if (validItems.length !== mockCart.items.length) {
          mockCart.items = validItems;

          const totals = calculateCartTotals(mockCart.items);

          saveMockCart({
            items: mockCart.items,
            totalPrice: totals.totalPrice,
            totalCalories: totals.totalCalories,
          });
        }

        // Populate meal data
        const populatedItems = mockCart.items.map((item) => {
          const meal = meals.find((m) => m._id === item.meal);

          return {
            meal,
            quantity: item.quantity,
          };
        });

        const totals = calculateCartTotals(populatedItems);

        setCart({
          items: populatedItems,
          totalPrice: totals.totalPrice,
          totalCalories: totals.totalCalories,
        });
      } else {
        const { data } = await api.get("/cart");
        setCart(data.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (mealId, quantity = 1) => {
    try {
      if (!isAuthenticated) {
        toast.warning("Please login to add items to cart");
        return;
      }
      if (MOCK_MODE) {
        const mockCart = { ...getMockCart() };
        mockCart.items = [...mockCart.items];

        const existingItemIndex = mockCart.items.findIndex(
          (item) => item.meal === mealId,
        );

        if (existingItemIndex > -1) {
          mockCart.items[existingItemIndex] = {
            ...mockCart.items[existingItemIndex],
            quantity: mockCart.items[existingItemIndex].quantity + quantity,
          };
        } else {
          mockCart.items.push({ meal: mealId, quantity });
        }

        const totals = calculateCartTotals(mockCart.items);

        const newCart = {
          items: mockCart.items,
          totalPrice: totals.totalPrice,
          totalCalories: totals.totalCalories,
        };

        saveMockCart(newCart);

        const meals = getMeals();

        const populatedItems = newCart.items
          .map((item) => {
            const meal = meals.find((m) => m._id === item.meal);
            if (!meal) return null;
            return { meal, quantity: item.quantity };
          })
          .filter(Boolean);

        setCart({
          items: populatedItems,
          totalPrice: newCart.totalPrice,
          totalCalories: newCart.totalCalories,
        });

        toast.success("Added to cart! (Mock Mode)");
      } else {
        const { data } = await api.post("/cart/add", { mealId, quantity });
        setCart(data.data);
        toast.success("Added to cart!");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to cart";
      toast.error(message);
      throw error;
    }
  };

  const updateCartItem = async (mealId, action) => {
    try {
      if (MOCK_MODE) {
        const mockCart = getMockCart();
        mockCart.items = [...mockCart.items];

        const itemIndex = mockCart.items.findIndex(
          (item) => item.meal === mealId,
        );

        if (itemIndex > -1) {
          if (action === "increase") {
            mockCart.items[itemIndex].quantity += 1;
          }

          if (action === "decrease") {
            mockCart.items[itemIndex].quantity -= 1;
          }

          if (mockCart.items[itemIndex].quantity <= 0) {
            mockCart.items.splice(itemIndex, 1);
          }
        }

        const totals = calculateCartTotals(mockCart.items);

        const newCart = {
          items: mockCart.items,
          totalPrice: totals.totalPrice,
          totalCalories: totals.totalCalories,
        };

        saveMockCart(newCart);

        const meals = getMeals();

        const populatedItems = newCart.items
          .map((item) => {
            const meal = meals.find((m) => m._id === item.meal);
            if (!meal) return null;
            return { meal, quantity: item.quantity };
          })
          .filter(Boolean);

        setCart({
          items: populatedItems,
          totalPrice: newCart.totalPrice,
          totalCalories: newCart.totalCalories,
        });
      } else {
        const { data } = await api.put("/cart/update", { mealId, action });
        setCart(data.data);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update cart";
      toast.error(message);
      throw error;
    }
  };

  const removeFromCart = async (mealId) => {
    try {
      if (MOCK_MODE) {
        const mockCart = { ...getMockCart() };
        mockCart.items = [...mockCart.items];
        mockCart.items = mockCart.items.filter((item) => item.meal !== mealId);

        const totals = calculateCartTotals(mockCart.items);
        mockCart.totalPrice = totals.totalPrice;
        mockCart.totalCalories = totals.totalCalories;

        saveMockCart(mockCart);
        const meals = getMeals();
        const populatedItems = mockCart.items.map((item) => {
          const meal = meals.find((m) => m._id === item.meal);
          return {
            meal: meal,
            quantity: item.quantity,
          };
        });

        setCart({
          items: populatedItems,
          totalPrice: mockCart.totalPrice,
          totalCalories: mockCart.totalCalories,
        });

        toast.success("Item removed from cart");
      } else {
        const { data } = await api.delete(`/cart/remove/${mealId}`);
        setCart(data.data);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove item";
      toast.error(message);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (MOCK_MODE) {
        saveMockCart({ items: [], totalPrice: 0, totalCalories: 0 });
        setCart({ items: [], totalPrice: 0, totalCalories: 0 });
      } else {
        const { data } = await api.delete("/cart/clear");
        setCart(data.data);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const cartItemCount = useMemo(() => {
    if (!cart?.items) return 0;

    return cart.items.reduce((sum, item) => {
      if (!item.meal) return sum;
      return sum + item.quantity;
    }, 0);
  }, [cart]);

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
