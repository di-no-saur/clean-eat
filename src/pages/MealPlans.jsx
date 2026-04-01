import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaFire,
  FaDumbbell,
  FaBalanceScale,
  FaCheckCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { mockMeals } from "../utils/mockData";
import { useCart } from "../context/UseCart";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const MealPlans = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");
  const [showCalculator, setShowCalculator] = useState(false);

  // Calorie Calculator State
  const [userInfo, setUserInfo] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "moderate",
    goal: "maintain",
  });
  const [recommendedCalories, setRecommendedCalories] = useState(null);

  // Meal Plans Data
  const mealPlans = {
    "weight-loss": {
      name: "Weight Loss Plan",
      nameVi: "Gói Giảm Cân",
      icon: FaFire,
      color: "orange",
      targetCalories: 1500,
      description:
        "7-day meal plan designed for safe and effective weight loss",
      descriptionVi:
        "Gói ăn 7 ngày được thiết kế để giảm cân an toàn và hiệu quả",
      price: 850000,
      originalPrice: 1050000,
      meals: mockMeals.filter((m) => m.category === "weight-loss").slice(0, 7),
    },
    maintain: {
      name: "Maintenance Plan",
      nameVi: "Gói Duy Trì",
      icon: FaBalanceScale,
      color: "green",
      targetCalories: 2000,
      description: "7-day balanced meal plan to maintain your ideal weight",
      descriptionVi: "Gói ăn 7 ngày cân bằng để duy trì cân nặng lý tưởng",
      price: 900000,
      originalPrice: 1120000,
      meals: mockMeals.filter((m) => m.category === "maintain").slice(0, 7),
    },
    "muscle-gain": {
      name: "Muscle Gain Plan",
      nameVi: "Gói Tăng Cơ",
      icon: FaDumbbell,
      color: "blue",
      targetCalories: 2500,
      description: "7-day high-protein meal plan for building lean muscle",
      descriptionVi: "Gói ăn 7 ngày giàu protein để xây dựng cơ bắp",
      price: 1100000,
      originalPrice: 1400000,
      meals: mockMeals.filter((m) => m.category === "muscle-gain").slice(0, 7),
    },
  };

  const currentPlan = mealPlans[selectedGoal];

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateCalories = () => {
    const { age, gender, weight, height, activity, goal } = userInfo;

    if (!age || !weight || !height) {
      toast.error("Please fill in all fields");
      return;
    }

    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === "male") {
      bmr =
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseFloat(age) +
        5;
    } else {
      bmr =
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseFloat(age) -
        161;
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    let tdee = bmr * activityMultipliers[activity];

    // Adjust for goal
    const goalAdjustments = {
      lose: -500, // 500 calorie deficit
      maintain: 0,
      gain: 300, // 300 calorie surplus
    };

    const finalCalories = Math.round(tdee + goalAdjustments[goal]);

    setRecommendedCalories({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: finalCalories,
      goal: goal,
    });

    // Suggest meal plan based on target calories
    if (finalCalories < 1800) {
      setSelectedGoal("weight-loss");
    } else if (finalCalories < 2200) {
      setSelectedGoal("maintain");
    } else {
      setSelectedGoal("muscle-gain");
    }

    toast.success("Calorie target calculated! Suggested meal plan updated.");
  };

  const handleAddPlanToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add meal plan to cart");
      navigate("/login");
      return;
    }

    try {
      // Add all meals in the plan to cart
      for (const meal of currentPlan.meals) {
        await addToCart(meal._id, 1);
      }
      toast.success(`${currentPlan.meals.length} meals added to cart!`);
    } catch (error) {
      console.error("Error adding plan to cart:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            {i18n.language === "vi"
              ? "Gói Ăn Theo Mục Tiêu"
              : "Goal-Based Meal Plans"}
          </h1>
          <p className="text-xl text-gray-600">
            {i18n.language === "vi"
              ? "Chọn gói ăn 7 ngày phù hợp với mục tiêu của bạn"
              : "Choose a 7-day meal plan that fits your goals"}
          </p>
        </div>

        {/* Calorie Calculator Section */}
        <div className="card p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaFire className="text-orange-500" />
                {i18n.language === "vi"
                  ? "Tính Lượng Calo Cần Thiết"
                  : "Calculate Your Daily Calories"}
              </h2>
              <p className="text-gray-600 mt-2">
                {i18n.language === "vi"
                  ? "Tính toán lượng calo hàng ngày dựa trên thông tin của bạn"
                  : "Calculate your daily calorie needs based on your information"}
              </p>
            </div>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="btn-primary"
            >
              {showCalculator ? "Hide Calculator" : "Show Calculator"}
            </button>
          </div>

          {showCalculator && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi" ? "Tuổi" : "Age"}
                  </label>
                  <input
                    type="number"
                    value={userInfo.age}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, age: e.target.value })
                    }
                    placeholder="25"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi" ? "Giới tính" : "Gender"}
                  </label>
                  <select
                    value={userInfo.gender}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, gender: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="male">
                      {i18n.language === "vi" ? "Nam" : "Male"}
                    </option>
                    <option value="female">
                      {i18n.language === "vi" ? "Nữ" : "Female"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi" ? "Cân nặng (kg)" : "Weight (kg)"}
                  </label>
                  <input
                    type="number"
                    value={userInfo.weight}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, weight: e.target.value })
                    }
                    placeholder="70"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi" ? "Chiều cao (cm)" : "Height (cm)"}
                  </label>
                  <input
                    type="number"
                    value={userInfo.height}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, height: e.target.value })
                    }
                    placeholder="170"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi"
                      ? "Mức độ vận động"
                      : "Activity Level"}
                  </label>
                  <select
                    value={userInfo.activity}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, activity: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="sedentary">
                      {i18n.language === "vi"
                        ? "Ít vận động"
                        : "Sedentary (little/no exercise)"}
                    </option>
                    <option value="light">
                      {i18n.language === "vi" ? "Nhẹ" : "Light (1-3 days/week)"}
                    </option>
                    <option value="moderate">
                      {i18n.language === "vi"
                        ? "Trung bình"
                        : "Moderate (3-5 days/week)"}
                    </option>
                    <option value="active">
                      {i18n.language === "vi"
                        ? "Tích cực"
                        : "Active (6-7 days/week)"}
                    </option>
                    <option value="veryActive">
                      {i18n.language === "vi"
                        ? "Rất tích cực"
                        : "Very Active (2x/day)"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {i18n.language === "vi" ? "Mục tiêu" : "Goal"}
                  </label>
                  <select
                    value={userInfo.goal}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, goal: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="lose">
                      {i18n.language === "vi" ? "Giảm cân" : "Lose Weight"}
                    </option>
                    <option value="maintain">
                      {i18n.language === "vi" ? "Duy trì" : "Maintain"}
                    </option>
                    <option value="gain">
                      {i18n.language === "vi" ? "Tăng cơ" : "Gain Muscle"}
                    </option>
                  </select>
                </div>
              </div>

              <button
                onClick={calculateCalories}
                className="btn-primary w-full md:w-auto"
              >
                {i18n.language === "vi" ? "Tính Toán" : "Calculate"}
              </button>

              {recommendedCalories && (
                <div className="mt-6 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <h3 className="text-xl font-bold mb-4 text-primary-700">
                    {i18n.language === "vi" ? "Kết Quả" : "Results"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        BMR (Base Metabolic Rate)
                      </p>
                      <p className="text-3xl font-bold text-primary-600">
                        {recommendedCalories.bmr}
                      </p>
                      <p className="text-sm text-gray-500">
                        calories/day at rest
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        TDEE (Total Daily Energy)
                      </p>
                      <p className="text-3xl font-bold text-primary-600">
                        {recommendedCalories.tdee}
                      </p>
                      <p className="text-sm text-gray-500">
                        calories/day with activity
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {i18n.language === "vi"
                          ? "Mục Tiêu"
                          : "Target Calories"}
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {recommendedCalories.target}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i18n.language === "vi"
                          ? "calo/ngày để đạt mục tiêu"
                          : "calories/day for goal"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Goal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(mealPlans).map(([key, plan]) => (
            <button
              key={key}
              onClick={() => setSelectedGoal(key)}
              className={`card p-6 text-center transition-all ${
                selectedGoal === key
                  ? `ring-4 ring-${plan.color}-500 bg-${plan.color}-50`
                  : "hover:shadow-lg"
              }`}
            >
              <plan.icon
                className={`text-5xl mx-auto mb-4 text-${plan.color}-500`}
              />
              <h3 className="font-bold text-xl mb-2">
                {i18n.language === "vi" ? plan.nameVi : plan.name}
              </h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">
                {plan.targetCalories}
              </p>
              <p className="text-sm text-gray-600">calories/day</p>
            </button>
          ))}
        </div>

        {/* Selected Plan Details */}
        <div className="card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <currentPlan.icon
                  className={`text-5xl text-${currentPlan.color}-500`}
                />
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {i18n.language === "vi"
                      ? currentPlan.nameVi
                      : currentPlan.name}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {i18n.language === "vi"
                      ? currentPlan.descriptionVi
                      : currentPlan.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {i18n.language === "vi"
                      ? "Tổng calo/ngày"
                      : "Daily Calories"}
                  </p>
                  <p className="text-2xl font-bold text-primary-600">
                    {currentPlan.targetCalories}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {i18n.language === "vi" ? "Số bữa ăn" : "Total Meals"}
                  </p>
                  <p className="text-2xl font-bold text-primary-600">
                    {currentPlan.meals.length}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <span>
                    {i18n.language === "vi"
                      ? "7 ngày suất ăn đủ dinh dưỡng"
                      : "7 days of nutritious meals"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <span>
                    {i18n.language === "vi"
                      ? "Tối ưu hóa macro theo mục tiêu"
                      : "Optimized macros for your goal"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <span>
                    {i18n.language === "vi"
                      ? "Giao hàng tận nơi"
                      : "Home delivery included"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <span>
                    {i18n.language === "vi"
                      ? "Tiết kiệm 20% so với mua lẻ"
                      : "Save 20% vs individual meals"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 rounded-lg">
              <p className="text-sm mb-2 opacity-90">
                {i18n.language === "vi" ? "Gói 7 ngày" : "7-Day Package"}
              </p>
              <div className="mb-4">
                <span className="text-2xl line-through opacity-75">
                  {currentPlan.originalPrice.toLocaleString()}đ
                </span>
                <p className="text-4xl font-bold">
                  {currentPlan.price.toLocaleString()}đ
                </p>
                <p className="text-sm mt-2 bg-yellow-400 text-yellow-900 inline-block px-3 py-1 rounded-full font-bold">
                  {i18n.language === "vi" ? "Tiết kiệm" : "Save"}{" "}
                  {(
                    (1 - currentPlan.price / currentPlan.originalPrice) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
              <button
                onClick={handleAddPlanToCart}
                className="w-full bg-white text-primary-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart />{" "}
                {i18n.language === "vi" ? "Thêm Vào Giỏ" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Meal List */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              {i18n.language === "vi" ? "Thực Đơn 7 Ngày" : "7-Day Menu"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPlan.meals.map((meal, index) => (
                <div
                  key={meal._id}
                  className="border rounded-lg p-4 hover:shadow-lg transition"
                >
                  <div className="flex gap-3">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {i18n.language === "vi" ? "Ngày" : "Day"} {index + 1}
                      </p>
                      <h4 className="font-bold text-sm mb-1">
                        {i18n.language === "vi" ? meal.nameVi : meal.name}
                      </h4>
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold">{meal.calories}</span>{" "}
                        cal |
                        <span className="font-semibold"> {meal.protein}g</span>{" "}
                        protein
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlans;
