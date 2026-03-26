import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      menu: 'Menu',
      mealPlans: 'Meal Plans',
      about: 'About Us',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      orders: 'My Orders',
      admin: 'Admin',
      
      // Home Page
      heroTitle: 'Eat Clean, Live Healthy',
      heroSubtitle: 'Nutritious meals delivered to your door',
      orderNow: 'Order Now',
      bestSellers: 'Best Sellers',
      whyChooseUs: 'Why Choose EAT CLEAN?',
      freshIngredients: 'Fresh Ingredients',
      expertNutrition: 'Expert Nutrition',
      fastDelivery: 'Fast Delivery',
      premiumQuality: 'Premium quality meals designed by nutrition experts',
      startJourney: 'Start Your Health Journey Today',
      viewMealPlansTitle: 'View Meal Plans',
      exploreMenuTitle: 'Explore Menu',
      
      // Menu
      allMeals: 'All Meals',
      weightLoss: 'Weight Loss',
      maintain: 'Maintain',
      muscleGain: 'Muscle Gain',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      
      // Product Details
      calories: 'Calories',
      protein: 'Protein',
      carbs: 'Carbs',
      fat: 'Fat',
      ingredients: 'Ingredients',
      relatedMeals: 'Related Meals',
      
      // Cart
      yourCart: 'Your Cart',
      emptyCart: 'Your cart is empty',
      totalPrice: 'Total Price',
      totalCalories: 'Total Calories',
      quantity: 'Quantity',
      remove: 'Remove',
      proceedToCheckout: 'Proceed to Checkout',
      
      // Checkout
      checkout: 'Checkout',
      shippingInfo: 'Shipping Information',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      city: 'City',
      district: 'District',
      ward: 'Ward',
      note: 'Note',
      paymentMethod: 'Payment Method',
      cod: 'Cash on Delivery',
      bankTransfer: 'Bank Transfer',
      qrCode: 'QR Code',
      placeOrder: 'Place Order',
      
      // Orders
      orderHistory: 'Order History',
      orderNumber: 'Order Number',
      date: 'Date',
      status: 'Status',
      total: 'Total',
      viewOrder: 'View Order',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      delivering: 'Delivering',
      completed: 'Completed',
      cancelled: 'Cancelled',
      
      // Auth
      emailAddress: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      loginToAccount: 'Login to Your Account',
      createAccount: 'Create Account',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      
      // Admin
      dashboard: 'Dashboard',
      users: 'Users',
      products: 'Products',
      orderManagement: 'Order Management',
      totalUsers: 'Total Users',
      totalOrders: 'Total Orders',
      totalRevenue: 'Total Revenue',
      recentOrders: 'Recent Orders',
      
      // Common
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      submit: 'Submit',
      back: 'Back',
      loading: 'Loading...',
      price: 'Price',
      
      // Payment & Checkout
      paymentSuccess: 'Payment Successful',
      paymentCancelled: 'Payment Cancelled',
      paymentCancelledDesc: 'You have cancelled this payment',
      paymentExpired: 'Payment link has expired',
      orderPlaced: 'Your order has been placed successfully',
      confirmationEmail: 'We will send a confirmation email',
      viewOrders: 'View Orders',
      continueShopping: 'Continue Shopping',
      needHelp: 'Need Help?',
      tryAgain: 'Try Again',
      bankTransferInfo: 'Bank Transfer Information',
      scanQRCode: 'Scan QR Code to Pay',
      processing: 'Processing',
      orderCode: 'Order Code',
      
      // Footer
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      
      // About
      ourMission: 'Our Mission',
      missionText: 'To provide healthy, nutritious meals that help you achieve your fitness goals.',
      missionDesc: "We believe that eating healthy should be convenient, affordable, and delicious. That's why we create meals that nourish your body and delight your taste buds.",
      ourStory: 'Our Story',
      storyText: 'EAT CLEAN started with a simple belief: healthy eating should be convenient and delicious.',
      aboutSubtitle: 'Learn more about our mission and values',
      storyDesc: 'Founded in 2024, EAT CLEAN has grown from a small idea to a trusted source of nutritious meals for thousands of customers. Our commitment to quality, freshness, and sustainability remains unchanged.',
      ourValues: 'Our Values',
      valQualityTitle: 'Quality',
      valQualityDesc: 'We use only the freshest, highest quality ingredients',
      valHealthTitle: 'Health',
      valHealthDesc: 'Every meal is designed by nutrition experts',
      valSustainTitle: 'Sustainability',
      valSustainDesc: 'We care about our environment and future',
    }
  },
  vi: {
    translation: {
      // Navigation
      home: 'Trang Chủ',
      menu: 'Thực Đơn',
      mealPlans: 'Gói Ăn',
      about: 'Về Chúng Tôi',
      cart: 'Giỏ Hàng',
      login: 'Đăng Nhập',
      register: 'Đăng Ký',
      logout: 'Đăng Xuất',
      profile: 'Hồ Sơ',
      orders: 'Đơn Hàng',
      admin: 'Quản Trị',
      
      // Home Page
      heroTitle: 'Ăn Sạch, Sống Khỏe',
      heroSubtitle: 'Bữa ăn dinh dưỡng giao tận nơi',
      orderNow: 'Đặt Hàng Ngay',
      bestSellers: 'Bán Chạy Nhất',
      whyChooseUs: 'Tại Sao Chọn EAT CLEAN?',
      freshIngredients: 'Nguyên Liệu Tươi Sạch',
      expertNutrition: 'Chuyên Gia Dinh Dưỡng',
      fastDelivery: 'Giao Hàng Nhanh Chóng',
      premiumQuality: 'Bữa ăn chất lượng cao cấp được thiết kế bởi chuyên gia dinh dưỡng',
      startJourney: 'Bắt Đầu Hành Trình Sức Khỏe Của Bạn Hôm Nay',
      viewMealPlansTitle: 'Xem Gói Ăn',
      exploreMenuTitle: 'Khám Phá Thực Đơn',
      
      // Menu
      allMeals: 'Tất Cả',
      weightLoss: 'Giảm Cân',
      maintain: 'Duy Trì',
      muscleGain: 'Tăng Cơ',
      addToCart: 'Thêm Vào Giỏ',
      viewDetails: 'Xem Chi Tiết',
      
      // Product Details
      calories: 'Calo',
      protein: 'Protein',
      carbs: 'Carb',
      fat: 'Chất Béo',
      ingredients: 'Thành Phần',
      relatedMeals: 'Món Ăn Liên Quan',
      
      // Cart
      yourCart: 'Giỏ Hàng Của Bạn',
      emptyCart: 'Giỏ hàng trống',
      totalPrice: 'Tổng Tiền',
      totalCalories: 'Tổng Calo',
      quantity: 'Số Lượng',
      remove: 'Xóa',
      proceedToCheckout: 'Tiến Hành Thanh Toán',
      
      // Checkout
      checkout: 'Thanh Toán',
      shippingInfo: 'Thông Tin Giao Hàng',
      fullName: 'Họ và Tên',
      phone: 'Số Điện Thoại',
      email: 'Email',
      address: 'Địa Chỉ',
      city: 'Thành Phố',
      district: 'Quận/Huyện',
      ward: 'Phường/Xã',
      note: 'Ghi Chú',
      paymentMethod: 'Phương Thức Thanh Toán',
      cod: 'Thanh Toán Khi Nhận Hàng',
      bankTransfer: 'Chuyển Khoản Ngân Hàng',
      qrCode: 'Mã QR',
      placeOrder: 'Đặt Hàng',
      
      // Orders
      orderHistory: 'Lịch Sử Đơn Hàng',
      orderNumber: 'Mã Đơn',
      date: 'Ngày',
      status: 'Trạng Thái',
      total: 'Tổng',
      viewOrder: 'Xem Đơn',
      confirmed: 'Đã Xác Nhận',
      preparing: 'Đang Chuẩn Bị',
      delivering: 'Đang Giao',
      completed: 'Hoàn Thành',
      cancelled: 'Đã Hủy',
      
      // Auth
      emailAddress: 'Địa Chỉ Email',
      password: 'Mật Khẩu',
      confirmPassword: 'Xác Nhận Mật Khẩu',
      name: 'Họ Tên',
      loginToAccount: 'Đăng Nhập Tài Khoản',
      createAccount: 'Tạo Tài Khoản',
      dontHaveAccount: 'Chưa có tài khoản?',
      alreadyHaveAccount: 'Đã có tài khoản?',
      
      // Admin
      dashboard: 'Tổng Quan',
      users: 'Người Dùng',
      products: 'Sản Phẩm',
      orderManagement: 'Quản Lý Đơn Hàng',
      totalUsers: 'Tổng Người Dùng',
      totalOrders: 'Tổng Đơn Hàng',
      totalRevenue: 'Tổng Doanh Thu',
      recentOrders: 'Đơn Hàng Gần Đây',
      
      // Common
      search: 'Tìm Kiếm',
      save: 'Lưu',
      cancel: 'Hủy',
      edit: 'Sửa',
      delete: 'Xóa',
      create: 'Tạo',
      update: 'Cập Nhật',
      submit: 'Gửi',
      back: 'Quay Lại',
      loading: 'Đang Tải...',
      price: 'Giá',
      
      // Payment & Checkout
      paymentSuccess: 'Thanh Toán Thành Công',
      paymentCancelled: 'Thanh Toán Bị Hủy',
      paymentCancelledDesc: 'Bạn đã hủy thanh toán này',
      paymentExpired: 'Link thanh toán đã hết hạn',
      orderPlaced: 'Đơn hàng của bạn đã được đặt thành công',
      confirmationEmail: 'Chúng tôi sẽ gửi email xác nhận',
      viewOrders: 'Xem Đơn Hàng',
      continueShopping: 'Tiếp Tục Mua Sắm',
      needHelp: 'Cần Hỗ Trợ?',
      tryAgain: 'Thử Lại',
      bankTransferInfo: 'Thông Tin Chuyển Khoản',
      scanQRCode: 'Quét Mã QR Để Thanh Toán',
      processing: 'Đang Xử Lý',
      orderCode: 'Mã Đơn Hàng',
      
      // Footer
      aboutUs: 'Về Chúng Tôi',
      contactUs: 'Liên Hệ',
      followUs: 'Theo Dõi',
      
      // About
      ourMission: 'Sứ Mệnh',
      missionText: 'Cung cấp bữa ăn lành mạnh, giàu dinh dưỡng giúp bạn đạt được mục tiêu sức khỏe.',
      missionDesc: 'Chúng tôi tin rằng việc ăn uống lành mạnh phải tiện lợi, giá cả phải chăng và ngon miệng. Đó là lý do chúng tôi tạo ra những bữa ăn vừa nuôi dưỡng cơ thể vừa thỏa mãn vị giác của bạn.',
      ourStory: 'Câu Chuyện',
      storyText: 'EAT CLEAN bắt đầu với niềm tin: ăn uống lành mạnh phải tiện lợi và ngon miệng.',
      aboutSubtitle: 'Tìm hiểu thêm về sứ mệnh và giá trị của chúng tôi',
      storyDesc: 'Được thành lập vào năm 2024, EAT CLEAN đã phát triển từ một ý tưởng nhỏ thành nguồn cung cấp bữa ăn dinh dưỡng đáng tin cậy cho hàng ngàn khách hàng. Cam kết của chúng tôi về chất lượng, sự tươi mới và bền vững vẫn không thay đổi.',
      ourValues: 'Giá Trị Cốt Lõi',
      valQualityTitle: 'Chất Lượng',
      valQualityDesc: 'Chúng tôi chỉ sử dụng những nguyên liệu tươi ngon và chất lượng nhất',
      valHealthTitle: 'Sức Khỏe',
      valHealthDesc: 'Mỗi bữa ăn đều được thiết kế bởi các chuyên gia dinh dưỡng',
      valSustainTitle: 'Bền Vững',
      valSustainDesc: 'Chúng tôi quan tâm đến môi trường và tương lai chung',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
