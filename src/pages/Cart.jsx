import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';
  const { cart, loading, removeFromCart, updateCartItem } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg text-gray-600 mb-6">Please log in to view your cart</p>
        <Link to="/login" className="btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg text-gray-600 mb-6">{t('emptyCart')}</p>
        <Link to="/menu" className="btn-primary">
          {t('menu')}
        </Link>
      </div>
    );
  }

  const handleUpdateQuantity = async (mealId, newQuantity) => {
    if (newQuantity > 0) {
      await updateCartItem(mealId, newQuantity);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{t('yourCart')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.meal._id} className="card p-6 flex gap-6">
                <img
                  src={item.meal.image}
                  alt={item.meal.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{isVi ? item.meal.nameVi : item.meal.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{isVi ? item.meal.descriptionVi : item.meal.description}</p>
                  <p className="text-primary-600 font-bold">${item.meal.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.meal._id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>

                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleUpdateQuantity(item.meal._id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.meal._id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-bold text-xl mb-6">{t('totalPrice')}</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${cart.totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('totalCalories')}:</span>
                <span>{cart.totalCalories} cal</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span className="text-primary-600">${cart.totalPrice}</span>
            </div>

            <Link to="/checkout" className="btn-primary w-full text-center">
              {t('proceedToCheckout')}
            </Link>

            <Link
              to="/menu"
              className="btn-secondary w-full text-center mt-4 flex items-center justify-center gap-2"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
