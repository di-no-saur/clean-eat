import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import MealCard from "../components/MealCard";
import {
  FaArrowRight,
  FaStar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { mockMeals } from "../utils/mockData";

const MOCK_MODE = true;

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
      title: "heroTitle",
      subtitle: "heroSubtitle",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      title: "heroTitle2",
      subtitle: "Fresh salads and healthy bowls delivered to your door",
    },
    {
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
      title: "heroTitle3",
      subtitle: "Customized nutrition plans for your lifestyle",
    },
  ];

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
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };
  return (
    <div className="w-full">
      {/* Hero Section with Full-width Slider */}
      <section className="relative w-full h-screen md:h-[600px] overflow-hidden text-white">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <div className="relative h-full flex items-center">
          <div className="container-custom w-full">
            <div className="max-w-2xl animate-fade-in-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-500">
                {t(`heroSlides.${currentSlide}.title`)} 🥗
              </h1>
              <p className="text-lg md:text-2xl text-gray-100 mb-8 transition-all duration-500 font-light">
                {t(`heroSubtitles.${currentSlide}.Subtitle`)}
              </p>
              <button
                onClick={() => navigate("/menu")}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                {t("orderNow")} <FaArrowRight className="animate-bounce-x" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <FaChevronRight size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-3 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            {t("whyChooseUs")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t("freshIngredients"), icon: "🥬", delay: "0ms" },
              { title: t("expertNutrition"), icon: "⚖️", delay: "100ms" },
              { title: t("fastDelivery"), icon: "🚚", delay: "200ms" },
            ].map((item, index) => (
              <div
                key={index}
                className="card p-6 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
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
      <section className="relative bg-primary-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in">
            {t("startJourney")}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
            <button
              onClick={() => navigate("/meal-plans")}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t("viewMealPlansTitle")}
            </button>
            <button
              onClick={() => navigate("/menu")}
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-800 hover:scale-105 transition-all duration-300 border-2 border-white shadow-lg hover:shadow-xl"
            >
              {t("exploreMenuTitle")}
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-x {
          animation: bounce-x 2s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
