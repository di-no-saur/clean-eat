import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaCopy, FaCheckCircle, FaQrcode, FaUniversity, FaWallet } from 'react-icons/fa';
import { createPaymentLink } from '../utils/payosService';

const MOCK_MODE = true;

// Bank account info
const BANK_INFO = {
  bankName: 'Vietcombank',
  bankBranch: 'Chi nhánh TP.HCM',
  accountNumber: '1234567890',
  accountName: 'CONG TY TNHH EAT CLEAN',
  swiftCode: 'BFTVVNVX'
};

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [qrCode, setQrCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    district: user?.address?.district || '',
    ward: user?.address?.ward || '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate order number for payment content
  const generateOrderNumber = () => {
    return 'EC' + Date.now().toString().slice(-8);
  };

  // Generate VietQR URL
  const generateQRCode = (amount, orderNumber) => {
    // VietQR format: https://img.vietqr.io/image/{BANK_ID}-{ACCOUNT_NUMBER}-{TEMPLATE}.png?amount={AMOUNT}&addInfo={INFO}&accountName={NAME}
    const bankId = 'VCB'; // Vietcombank
    const accountNumber = BANK_INFO.accountNumber;
    const template = 'compact2'; // QR template style
    const info = encodeURIComponent(`DH ${orderNumber}`);
    const accountName = encodeURIComponent(BANK_INFO.accountName);
    
    return `https://img.vietqr.io/image/${bankId}-${accountNumber}-${template}.png?amount=${amount}&addInfo=${info}&accountName=${accountName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const shippingInfo = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        note: formData.note
      };

      // Handle PayOS payment
      if (paymentMethod === 'payos') {
        const orderCode = `ORD${Date.now()}`;
        
        try {
          const paymentLink = await createPaymentLink({
            orderCode,
            amount: cart.totalPrice,
            buyerName: formData.name,
            buyerEmail: formData.email,
            buyerPhone: formData.phone,
            buyerAddress: formData.address,
            description: `Thanh toán đơn hàng từ EAT CLEAN - ${cart.items.length} sản phẩm`,
          });

          // Lưu order pending vào localStorage trước khi redirect
          const mockOrder = {
            _id: 'order' + Date.now(),
            orderCode,
            orderNumber: orderCode,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email
            },
            items: cart.items.map(item => ({
              meal: item.meal,
              name: item.meal.name,
              price: item.meal.price,
              quantity: item.quantity,
              calories: item.meal.calories
            })),
            totalPrice: cart.totalPrice,
            totalCalories: cart.totalCalories,
            shippingInfo,
            paymentMethod: 'payos',
            paymentStatus: 'pending',
            orderStatus: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
          };

          const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
          existingOrders.push(mockOrder);
          localStorage.setItem('mockOrders', JSON.stringify(existingOrders));

          // Redirect to PayOS checkout
          toast.info('Redirecting to PayOS...');
          if (paymentLink.data && paymentLink.data.checkoutUrl) {
            window.location.href = paymentLink.data.checkoutUrl;
          } else {
            // Mock mode - simulate success
            setTimeout(() => {
              navigate(`/checkout/success?orderCode=${orderCode}&mock=true`);
            }, 1500);
          }
        } catch (error) {
          toast.error(error.message || 'Failed to create payment link');
          setLoading(false);
        }
        return;
      }

      if (MOCK_MODE) {
        // Mock mode: create order in localStorage
        const mockOrder = {
          _id: 'order' + Date.now(),
          orderNumber: 'EC' + Date.now(),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          items: cart.items.map(item => ({
            meal: item.meal,
            name: item.meal.name,
            price: item.meal.price,
            quantity: item.quantity,
            calories: item.meal.calories
          })),
          totalPrice: cart.totalPrice,
          totalCalories: cart.totalCalories,
          shippingInfo,
          paymentMethod,
          paymentStatus: 'pending',
          orderStatus: 'confirmed',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Save to localStorage
        const existingOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
        existingOrders.push(mockOrder);
        localStorage.setItem('mockOrders', JSON.stringify(existingOrders));

        // Clear cart
        await clearCart();

        toast.success('Order placed successfully! (Mock Mode)');
        setTimeout(() => {
          navigate(`/orders/${mockOrder._id}`);
        }, 1500);
      } else {
        const { data } = await api.post('/orders', {
          shippingInfo,
          paymentMethod
        });

        if (data.data.qrCode) {
          setQrCode(data.data.qrCode);
        }

        toast.success('Order placed successfully!');
        setTimeout(() => {
          navigate(`/orders/${data.data._id}`);
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{t('checkout')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="card p-6">
              <h2 className="font-bold text-xl mb-6">{t('shippingInfo')}</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('fullName')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('phone')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('address')} *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('city')} *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('district')}</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('ward')}</label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">{t('note')}</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="3"
                    className="input-field resize-none"
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-bold text-lg mb-4">{t('paymentMethod')}</h3>

                  <div className="space-y-3">
                    {[
                      { value: 'cod', label: t('cod'), icon: '💵' },
                      { value: 'bank-transfer', label: t('bankTransfer'), icon: '🏦' },
                      { value: 'qr-code', label: t('qrCode'), icon: '📱' },
                      { value: 'payos', label: 'PayOS', icon: '💳' }
                    ].map((method) => (
                      <label key={method.value} className="flex items-center cursor-pointer p-4 border-2 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3 w-5 h-5"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-semibold">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Bank Transfer Information */}
                  {paymentMethod === 'bank-transfer' && (
                    <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <FaUniversity className="text-blue-600 text-xl" />
                        <h4 className="font-bold text-lg text-blue-900">
                          {t('bankTransferInfo') || 'Bank Transfer Information'}
                        </h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600 mb-1">Bank Name</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">{BANK_INFO.bankName}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(BANK_INFO.bankName)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <FaCopy />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{BANK_INFO.bankBranch}</p>
                        </div>

                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600 mb-1">Account Number</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-xl text-gray-900">{BANK_INFO.accountNumber}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(BANK_INFO.accountNumber)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600 mb-1">Account Name</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">{BANK_INFO.accountName}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(BANK_INFO.accountName)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded border">
                          <p className="text-xs text-gray-600 mb-1">Transfer Amount</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-2xl text-green-600">{cart.totalPrice.toLocaleString()}đ</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(cart.totalPrice.toString())}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <FaCopy />
                            </button>
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded border border-yellow-300">
                          <p className="text-xs text-gray-600 mb-1">Transfer Content / Message</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">DH {generateOrderNumber()}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(`DH ${generateOrderNumber()}`)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <FaCopy />
                            </button>
                          </div>
                          <p className="text-xs text-orange-600 mt-2">⚠️ Please include this content in your transfer</p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-100 rounded">
                        <p className="text-sm text-blue-900">
                          <FaCheckCircle className="inline mr-2 text-blue-600" />
                          Your order will be confirmed after we receive the payment
                        </p>
                      </div>
                    </div>
                  )}

                  {/* QR Code Payment */}
                  {paymentMethod === 'qr-code' && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <FaQrcode className="text-purple-600 text-xl" />
                        <h4 className="font-bold text-lg text-purple-900">
                          {t('scanQRCode') || 'Scan QR Code to Pay'}
                        </h4>
                      </div>

                      <div className="bg-white p-6 rounded-lg text-center">
                        <img
                          src={generateQRCode(cart.totalPrice, generateOrderNumber())}
                          alt="QR Code"
                          className="mx-auto w-64 h-64 border-4 border-purple-200 rounded-lg shadow-lg"
                        />
                        
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-600">Amount to pay</p>
                          <p className="text-3xl font-bold text-purple-600">{cart.totalPrice.toLocaleString()}đ</p>
                        </div>

                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm font-semibold text-purple-900 mb-2">How to pay:</p>
                          <ol className="text-xs text-left text-gray-700 space-y-1">
                            <li>1️⃣ Open your banking app</li>
                            <li>2️⃣ Select "Scan QR" or "Transfer"</li>
                            <li>3️⃣ Scan the QR code above</li>
                            <li>4️⃣ Confirm the amount: <strong>{cart.totalPrice.toLocaleString()}đ</strong></li>
                            <li>5️⃣ Complete the payment</li>
                          </ol>
                        </div>

                        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
                          <p className="text-sm text-green-800">
                            <FaCheckCircle className="inline mr-2 text-green-600" />
                            Payment will be automatically verified
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD Information */}
                  {paymentMethod === 'cod' && (
                    <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <FaCheckCircle className="inline mr-2 text-green-600" />
                        You will pay <strong className="text-lg">{cart.totalPrice.toLocaleString()}đ</strong> in cash when receiving your order
                      </p>
                    </div>
                  )}

                  {/* PayOS Payment */}
                  {paymentMethod === 'payos' && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <FaWallet className="text-indigo-600 text-xl" />
                        <h4 className="font-bold text-lg text-indigo-900">
                          PayOS - Fast & Secure Payment
                        </h4>
                      </div>

                      <div className="bg-white p-4 rounded-lg mb-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment Amount:</span>
                          <span className="font-bold text-2xl text-indigo-600">{cart.totalPrice.toLocaleString()}đ</span>
                        </div>
                        <hr />
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Fast & Secure
                          </p>
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Multiple payment methods
                          </p>
                          <p className="flex items-center text-green-700">
                            <FaCheckCircle className="mr-2" /> Instant confirmation
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-indigo-100 rounded-lg border border-indigo-300">
                        <p className="text-sm text-indigo-900">
                          Click <strong>"Place Order"</strong> to proceed to PayOS payment gateway. You can pay with:
                        </p>
                        <ul className="text-sm text-indigo-900 mt-2 space-y-1 ml-4 list-disc">
                          <li>Bank Transfer QR Code</li>
                          <li>Banking App/Website</li>
                          <li>Installment Methods</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-6 py-4 text-lg"
                >
                  {loading ? 'Processing...' : t('placeOrder')}
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.meal._id} className="flex justify-between text-sm">
                  <span>{isVi ? item.meal.nameVi : item.meal.name} x {item.quantity}</span>
                  <span>${(item.meal.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${cart.totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Cal:</span>
                <span>{cart.totalCalories}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary-600">${cart.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
