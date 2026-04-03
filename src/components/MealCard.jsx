import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/UseCart";
import { formatVND } from "../utils/formatCurrency";
const MealCard = ({ meal }) => {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === "vi";
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(meal._id, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition">
          <FaHeart className="text-red-500" />
        </button>
        {meal.isBestSeller && (
          <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Best Seller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {isVi ? meal.nameVi : meal.name}
        </h3>

        <div className="flex justify-between items-center mb-3">
          <span className="text-primary-600 font-bold text-lg">
            {formatVND(meal.price)}
          </span>
          <span className="text-sm text-gray-500">{meal.calories} cal</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {isVi ? meal.descriptionVi : meal.description}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/product/${meal._id}`}
            className="flex-1 btn-secondary text-center text-sm"
          >
            {t("viewDetails")}
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
          >
            <FaShoppingCart /> {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
