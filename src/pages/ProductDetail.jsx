import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import { useCart } from "../context/UseCart";
import {
  FaArrowLeft,
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaTint,
} from "react-icons/fa";
import { mockMeals } from "../utils/mockData";
import { formatVND } from "../utils/formatCurrency";
const MOCK_MODE = true;

const ProductDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === "vi";
  const [meal, setMeal] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const fetchMeal = async () => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        // Lấy meals từ localStorage
        const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];

        // tìm meal theo id
        const foundMeal = storedMeals.find((m) => m._id === id);
        setMeal(foundMeal);

        // lấy related meals
        if (foundMeal) {
          const relatedMeals = storedMeals
            .filter((m) => m.category === foundMeal.category && m._id !== id)
            .slice(0, 3);

          setRelated(relatedMeals);
        }
      } else {
        const [mealRes, relatedRes] = await Promise.all([
          api.get(`/meals/${id}`),
          api.get(`/meals/${id}/related`),
        ]);

        setMeal(mealRes.data.data);
        setRelated(relatedRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(meal._id, quantity);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600 text-lg">Meal not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <FaArrowLeft /> {t("back")}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="card overflow-hidden h-[420px]">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {isVi ? meal.nameVi : meal.name}
            </h1>

            <div className="bg-primary-100 rounded-lg p-4 mb-6">
              <p className="text-primary-900">
                {isVi ? meal.descriptionVi : meal.description}
              </p>
            </div>

            {/* Nutrition Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="card p-4 text-center">
                <FaFire className="text-orange-500 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">{t("calories")}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {meal.calories}
                </p>
              </div>
              <div className="card p-4 text-center">
                <FaDrumstickBite className="text-red-500 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">{t("protein")}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {meal.protein}g
                </p>
              </div>
              <div className="card p-4 text-center">
                <FaBreadSlice className="text-yellow-500 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">{t("carbs")}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {meal.carb}g
                </p>
              </div>
              <div className="card p-4 text-center">
                <FaTint className="text-purple-500 text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">{t("fat")}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {meal.fat}g
                </p>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600">Price</span>
                <span className="text-3xl font-bold text-primary-600">
                  {formatVND(meal.price)}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-600">{t("quantity")}:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button onClick={handleAddToCart} className="btn-primary w-full">
                {t("addToCart")}
              </button>
            </div>

            {/* Ingredients */}
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">{t("ingredients")}</h3>
              <ul className="space-y-2">
                {(isVi && meal.ingredientsVi
                  ? meal.ingredientsVi
                  : meal.ingredients
                ).map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Meals */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">{t("relatedMeals")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((relMeal) => (
                <Link
                  key={relMeal._id}
                  to={`/product/${relMeal._id}`}
                  className="card overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={relMeal.image}
                    alt={relMeal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">
                      {isVi ? relMeal.nameVi : relMeal.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-600 font-bold">
                        ${relMeal.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {relMeal.calories} cal
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
