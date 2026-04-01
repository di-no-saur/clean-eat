import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import MealCard from "../components/MealCard";
import { FaArrowRight, FaStar, FaCheck } from "react-icons/fa";
import { mockMeals } from "../utils/mockData";

const MOCK_MODE = true;

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const fetchBestSellers = async () => {
    try {
      if (MOCK_MODE) {
        // Mock mode: filter best sellers from local data
        const bestSellers = mockMeals
          .filter((meal) => meal.isBestSeller)
          .slice(0, 6);
        setBestSellers(bestSellers);
      } else {
        const { data } = await api.get("/meals?bestSeller=true&limit=6");
        setBestSellers(data.data);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("heroTitle")} 🥗
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                {t("heroSubtitle")}
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2"
              >
                {t("orderNow")} <FaArrowRight />
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop"
                alt="Healthy food"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("whyChooseUs")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t("freshIngredients"), icon: "🥬" },
              { title: t("expertNutrition"), icon: "⚖️" },
              { title: t("fastDelivery"), icon: "🚚" },
            ].map((item, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600">{t("premiumQuality")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <FaStar className="text-yellow-500" />
            {t("bestSellers")}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">{t("startJourney")}</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/meal-plans")}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              {t("viewMealPlansTitle")}
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-800 transition border-2 border-white"
            >
              {t("exploreMenuTitle")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
