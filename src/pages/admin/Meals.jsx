import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../utils/api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { mockMeals } from '../../utils/mockData';

const MOCK_MODE = true;

const Meals = () => {
  const { t } = useTranslation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    calories: '',
    protein: '',
    carb: '',
    fat: '',
    category: 'maintain',
    ingredients: '',
    description: '',
    isBestSeller: false
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      if (MOCK_MODE) {
        setMeals(mockMeals);
      } else {
        const { data } = await api.get('/meals');
        setMeals(data.data);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein),
        carb: parseInt(formData.carb),
        fat: parseInt(formData.fat),
        ingredients: formData.ingredients.split(',').map(i => i.trim())
      };

      if (editingId) {
        await api.put(`/admin/meals/${editingId}`, payload);
        toast.success('Meal updated');
      } else {
        await api.post('/admin/meals', payload);
        toast.success('Meal created');
      }

      resetForm();
      fetchMeals();
    } catch (error) {
      toast.error('Error saving meal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/admin/meals/${id}`);
      toast.success('Meal deleted');
      fetchMeals();
    } catch (error) {
      toast.error('Error deleting meal');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      price: '',
      calories: '',
      protein: '',
      carb: '',
      fat: '',
      category: 'maintain',
      ingredients: '',
      description: '',
      isBestSeller: false
    });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Meals</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Create Meal
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Meal' : 'Create Meal'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Calories *</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Protein (g) *</label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Carbs (g) *</label>
              <input
                type="number"
                name="carb"
                value={formData.carb}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Fat (g) *</label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="maintain">Maintain</option>
                <option value="muscle-gain">Muscle Gain</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">Ingredients (comma-separated) *</label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Chicken, Rice, Vegetables"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 resize-none h-20"
                required
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">Mark as Best Seller</span>
              </label>
            </div>

            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Price</th>
              <th className="px-6 py-3 font-semibold">Calories</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{meal.name}</td>
                <td className="px-6 py-3">${meal.price}</td>
                <td className="px-6 py-3">{meal.calories} cal</td>
                <td className="px-6 py-3 capitalize">{meal.category}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        ...meal,
                        ingredients: meal.ingredients.join(', ')
                      });
                      setEditingId(meal._id);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meals;
