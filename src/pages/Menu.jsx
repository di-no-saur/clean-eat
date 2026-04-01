import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import MealCard from "../components/MealCard";
import { mockMeals } from "../utils/mockData";

const MOCK_MODE = true;

const Menu = () => {
  const { t } = useTranslation();
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
  }, [category, search]);

  const fetchMeals = async () => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        // Lấy từ localStorage
        const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];

        let filtered = [...storedMeals];

        if (category) {
          filtered = filtered.filter((meal) => meal.category === category);
        }

        if (search) {
          const searchLower = search.toLowerCase();
          filtered = filtered.filter(
            (meal) =>
              meal.name.toLowerCase().includes(searchLower) ||
              meal.nameVi?.toLowerCase().includes(searchLower) ||
              meal.description?.toLowerCase().includes(searchLower),
          );
        }

        setMeals(filtered);
      } else {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const { data } = await api.get(`/meals?${params}`);
        setMeals(data.data);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <h1 className="text-4xl font-bold mb-4">{t("menu")}</h1>
          <p className="text-gray-600">
            Choose from our selection of healthy meals
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search meals..."
                  className="input-field text-sm"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {[
                    { value: "", label: t("allMeals") },
                    { value: "weight-loss", label: t("weightLoss") },
                    { value: "maintain", label: t("maintain") },
                    { value: "muscle-gain", label: t("muscleGain") },
                  ].map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mr-2 w-4 h-4"
                      />
                      <span className="text-sm">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Meals Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : meals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No meals found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meals.map((meal) => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
