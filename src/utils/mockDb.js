import { mockMeals, mockUsers, mockOrders } from "./mockData";

export const initDB = () => {
  // seed meals
  if (!localStorage.getItem("meals")) {
    localStorage.setItem("meals", JSON.stringify(mockMeals));
  }

  // seed users
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }

  // seed orders
  if (!localStorage.getItem("mockOrders")) {
    localStorage.setItem("mockOrders", JSON.stringify(mockOrders));
  }
};

export const getMeals = () => {
  return JSON.parse(localStorage.getItem("meals") || "[]");
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("mockOrders") || "[]");
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};
