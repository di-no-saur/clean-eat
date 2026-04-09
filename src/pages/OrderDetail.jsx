import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import { mockOrders } from '../utils/mockData';
import { formatVND } from "../utils/formatCurrency";
const MOCK_MODE = true;

const OrderDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      if (MOCK_MODE) {
        // Mock mode: get order from localStorage + mockOrders
        const localOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
        const allOrders = [...mockOrders, ...localOrders];
        const foundOrder = allOrders.find(o => o._id === id);
        setOrder(foundOrder);
      } else {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = ['confirmed', 'preparing', 'delivering', 'completed'];
    const currentIndex = steps.indexOf(order.orderStatus);
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return <div className="container-custom py-12">Order not found</div>;
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <Link to="/orders" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <FaArrowLeft /> Back to Orders
        </Link>

        <h1 className="text-4xl font-bold mb-8">Order #{order.orderNumber}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Tracker */}
            <div className="card p-8">
              <h2 className="font-bold text-xl mb-8">Order Status</h2>
              <div className="flex items-center justify-between">
                {statusSteps.map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 transition ${
                        item.completed || item.active
                          ? 'bg-primary-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <FaCheckCircle />
                    </div>
                    <span className="text-sm font-semibold capitalize text-center">
                      {t(item.step)}
                    </span>

                    {index < statusSteps.length - 1 && (
                      <div
                        className={`h-1 w-12 mt-3 ${
                          statusSteps[index + 1].completed ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="card p-8">
              <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                <FaBox /> Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item._id || item.meal?._id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-semibold">{isVi && item.meal?.nameVi ? item.meal.nameVi : item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatVND(item.price)}</p>
                      <p className="text-sm text-gray-600">
  {item.quantity} × {formatVND(item.price)}
</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">
  {formatVND(order.totalPrice)}
</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Total Calories:</span>
                  <span>{order.totalCalories} cal</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="card p-8">
              <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                <FaMapMarkerAlt /> Shipping Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{order.shippingInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold flex items-center gap-2">
                    <FaPhoneAlt className="text-primary-600" />
                    {order.shippingInfo.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">
                    {order.shippingInfo.address}, {order.shippingInfo.ward}, {order.shippingInfo.district}, {order.shippingInfo.city}
                  </p>
                </div>
                {order.shippingInfo.note && (
                  <div>
                    <p className="text-sm text-gray-600">Note</p>
                    <p className="font-semibold">{order.shippingInfo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="card p-8 h-fit sticky top-24">
            <h2 className="font-bold text-lg mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold capitalize">{t(order.orderStatus)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment:</span>
                <span className="font-semibold capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Status:</span>
                <span className={`font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{formatVND(order.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary-600">
  {formatVND(order.totalPrice)}
</span>
            </div>

            {/* QR Code */}
            {order.qrCode && (
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600 mb-3">{isVi ? 'Mã QR Thanh Toán' : 'Payment QR Code'}</p>
                <img 
                  src={order.qrCode.startsWith('http') ? order.qrCode : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(order.qrCode)}`} 
                  alt="QR Code" 
                  className="w-48 h-48 mx-auto" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
