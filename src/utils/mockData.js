// Mock data for all entities when working without backend

export const mockMeals = [
  {
    _id: '1',
    name: 'Grilled Chicken with Quinoa',
    nameVi: 'Gà Nướng với Quinoa',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500',
    price: 85000,
    calories: 450,
    protein: 35,
    carb: 40,
    fat: 12,
    category: 'weight-loss',
    ingredients: ['Grilled chicken breast', 'Quinoa', 'Broccoli', 'Cherry tomatoes', 'Olive oil'],
    ingredientsVi: ['Ức gà nướng', 'Quinoa', 'Bông cải xanh', 'Cà chua bi', 'Dầu olive'],
    description: 'High protein, low fat meal perfect for weight loss. Grilled chicken breast with nutritious quinoa and fresh vegetables.',
    descriptionVi: 'Bữa ăn giàu protein, ít chất béo hoàn hảo cho giảm cân. Ức gà nướng với quinoa giàu dinh dưỡng và rau tươi.',
    isAvailable: true,
    isBestSeller: true,
    rating: 5
  },
  {
    _id: '2',
    name: 'Salmon with Sweet Potato',
    nameVi: 'Cá Hồi với Khoai Lang',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    price: 120000,
    calories: 520,
    protein: 40,
    carb: 45,
    fat: 18,
    category: 'muscle-gain',
    ingredients: ['Grilled salmon', 'Sweet potato', 'Asparagus', 'Lemon', 'Herbs'],
    ingredientsVi: ['Cá hồi nướng', 'Khoai lang', 'Măng tây', 'Chanh', 'Thảo mộc'],
    description: 'Omega-3 rich salmon with complex carbs from sweet potato. Ideal for muscle building.',
    descriptionVi: 'Cá hồi giàu Omega-3 với carb phức tạp từ khoai lang. Lý tưởng cho tăng cơ.',
    isAvailable: true,
    isBestSeller: true,
    rating: 5
  },
  {
    _id: '3',
    name: 'Beef Steak with Brown Rice',
    nameVi: 'Bít Tết Bò với Gạo Lứt',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
    price: 135000,
    calories: 650,
    protein: 48,
    carb: 55,
    fat: 22,
    category: 'muscle-gain',
    ingredients: ['Grass-fed beef steak', 'Brown rice', 'Green beans', 'Mushrooms', 'Garlic'],
    ingredientsVi: ['Bít tết bò thảo mộc', 'Gạo lứt', 'Đậu que', 'Nấm', 'Tỏi'],
    description: 'High protein beef steak with brown rice for sustained energy and muscle growth.',
    descriptionVi: 'Bít tết bò giàu protein với gạo lứt cho năng lượng bền vững và tăng trưởng cơ bắp.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.5
  },
  {
    _id: '4',
    name: 'Tofu Buddha Bowl',
    nameVi: 'Tô Phật Đậu Hũ',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    price: 65000,
    calories: 380,
    protein: 18,
    carb: 48,
    fat: 12,
    category: 'weight-loss',
    ingredients: ['Grilled tofu', 'Mixed greens', 'Chickpeas', 'Avocado', 'Tahini dressing'],
    ingredientsVi: ['Đậu hũ nướng', 'Rau xanh hỗn hợp', 'Đậu gà', 'Bơ', 'Sốt tahini'],
    description: 'Plant-based protein bowl with healthy fats and fiber. Perfect vegetarian option.',
    descriptionVi: 'Tô protein thực vật với chất béo lành mạnh và chất xơ. Lựa chọn chay hoàn hảo.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },
  {
    _id: '5',
    name: 'Shrimp Pad Thai',
    nameVi: 'Pad Thai Tôm',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    price: 95000,
    calories: 480,
    protein: 28,
    carb: 52,
    fat: 15,
    category: 'maintain',
    ingredients: ['Shrimp', 'Rice noodles', 'Bean sprouts', 'Peanuts', 'Lime', 'Fish sauce'],
    ingredientsVi: ['Tôm', 'Bánh phở', 'Giá đỗ', 'Đậu phộng', 'Chanh', 'Nước mắm'],
    description: 'Thai-inspired balanced meal with protein and complex carbs.',
    descriptionVi: 'Món ăn cân bằng lấy cảm hứng từ Thái với protein và carb phức tạp.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.7
  },
  {
    _id: '6',
    name: 'Turkey Meatballs with Pasta',
    nameVi: 'Thịt Viên Gà Tây với Mì Ý',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500',
    price: 110000,
    calories: 580,
    protein: 42,
    carb: 50,
    fat: 18,
    category: 'muscle-gain',
    ingredients: ['Turkey meatballs', 'Whole wheat pasta', 'Tomato sauce', 'Parmesan', 'Basil'],
    ingredientsVi: ['Thịt viên gà tây', 'Mì nguyên cám', 'Sốt cà chua', 'Phô mai Parmesan', 'Húng quế'],
    description: 'Lean turkey protein with whole wheat pasta for muscle recovery.',
    descriptionVi: 'Protein gà tây nạc với mì nguyên cám cho phục hồi cơ bắp.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.6
  },
  {
    _id: '7',
    name: 'Chicken Caesar Salad',
    nameVi: 'Salad Caesar Gà',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
    price: 70000,
    calories: 320,
    protein: 30,
    carb: 18,
    fat: 15,
    category: 'weight-loss',
    ingredients: ['Grilled chicken', 'Romaine lettuce', 'Parmesan', 'Caesar dressing', 'Croutons'],
    ingredientsVi: ['Gà nướng', 'Xà lách Romaine', 'Phô mai Parmesan', 'Sốt Caesar', 'Bánh mì nướng'],
    description: 'Classic Caesar salad with grilled chicken. Low carb, high protein.',
    descriptionVi: 'Salad Caesar cổ điển với gà nướng. Ít carb, giàu protein.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.9
  },
  {
    _id: '8',
    name: 'Vegetable Stir-fry with Tofu',
    nameVi: 'Rau Xào Đậu Hũ',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    price: 60000,
    calories: 350,
    protein: 15,
    carb: 42,
    fat: 12,
    category: 'maintain',
    ingredients: ['Tofu', 'Bell peppers', 'Broccoli', 'Carrots', 'Soy sauce', 'Ginger'],
    ingredientsVi: ['Đậu hũ', 'Ớt chuông', 'Bông cải xanh', 'Cà rốt', 'Nước tương', 'Gừng'],
    description: 'Colorful vegetable stir-fry with plant-based protein.',
    descriptionVi: 'Rau xào đầy màu sắc với protein thực vật.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.5
  },
  {
    _id: '9',
    name: 'Grilled Fish with Vegetables',
    nameVi: 'Cá Nướng với Rau',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
    price: 90000,
    calories: 380,
    protein: 35,
    carb: 22,
    fat: 14,
    category: 'weight-loss',
    ingredients: ['White fish', 'Zucchini', 'Bell peppers', 'Lemon', 'Herbs'],
    ingredientsVi: ['Cá trắng', 'Bí ngòi', 'Ớt chuông', 'Chanh', 'Thảo mộc'],
    description: 'Light and healthy grilled fish with seasonal vegetables.',
    descriptionVi: 'Cá nướng nhẹ và lành mạnh với rau theo mùa.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.7
  },
  {
    _id: '10',
    name: 'Protein Pancakes',
    nameVi: 'Bánh Pancake Protein',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500',
    price: 75000,
    calories: 420,
    protein: 32,
    carb: 45,
    fat: 10,
    category: 'maintain',
    ingredients: ['Protein powder', 'Oats', 'Eggs', 'Banana', 'Blueberries', 'Honey'],
    ingredientsVi: ['Bột protein', 'Yến mạch', 'Trứng', 'Chuối', 'Việt quất', 'Mật ong'],
    description: 'Delicious breakfast option packed with protein and complex carbs.',
    descriptionVi: 'Lựa chọn bữa sáng ngon miệng chứa đầy protein và carb phức tạp.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.8
  },
  {
    _id: '11',
    name: 'Egg White Omelette',
    nameVi: 'Trứng Chiên Lòng Trắng',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500',
    price: 55000,
    calories: 180,
    protein: 24,
    carb: 8,
    fat: 4,
    category: 'weight-loss',
    ingredients: ['Egg whites', 'Spinach', 'Mushrooms', 'Tomatoes', 'Herbs'],
    ingredientsVi: ['Lòng trắng trứng', 'Rau bina', 'Nấm', 'Cà chua', 'Thảo mộc'],
    description: 'Low calorie, high protein breakfast option. Perfect for weight loss.',
    descriptionVi: 'Lựa chọn bữa sáng ít calo, giàu protein. Hoàn hảo cho giảm cân.',
    isAvailable: true,
    isBestSeller: false,
    rating: 4.6
  },
  {
    _id: '12',
    name: 'Protein Smoothie Bowl',
    nameVi: 'Tô Sinh Tố Protein',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
    price: 80000,
    calories: 380,
    protein: 25,
    carb: 48,
    fat: 8,
    category: 'maintain',
    ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Granola', 'Chia seeds'],
    ingredientsVi: ['Bột protein', 'Chuối', 'Quả mọng', 'Sữa hạnh nhân', 'Granola', 'Hạt chia'],
    description: 'Refreshing smoothie bowl loaded with protein and antioxidants.',
    descriptionVi: 'Tô sinh tố sảng khoái chứa đầy protein và chất chống oxi hóa.',
    isAvailable: true,
    isBestSeller: true,
    rating: 4.9
  }
];

export const mockOrders = [
  {
    _id: 'order1',
    orderNumber: 'EC2024001',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[0],
        name: mockMeals[0].name,
        price: mockMeals[0].price,
        quantity: 2,
        calories: mockMeals[0].calories
      },
      {
        meal: mockMeals[3],
        name: mockMeals[3].name,
        price: mockMeals[3].price,
        quantity: 1,
        calories: mockMeals[3].calories
      }
    ],
    totalPrice: 235000,
    totalCalories: 1280,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward',
      note: 'Please deliver before 12pm'
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  },
  {
    _id: 'order2',
    orderNumber: 'EC2024002',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[1],
        name: mockMeals[1].name,
        price: mockMeals[1].price,
        quantity: 3,
        calories: mockMeals[1].calories
      }
    ],
    totalPrice: 360000,
    totalCalories: 1560,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward'
    },
    paymentMethod: 'bank-transfer',
    paymentStatus: 'paid',
    orderStatus: 'delivering',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-16')
  },
  {
    _id: 'order3',
    orderNumber: 'EC2024003',
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'user@eatclean.com'
    },
    items: [
      {
        meal: mockMeals[6],
        name: mockMeals[6].name,
        price: mockMeals[6].price,
        quantity: 1,
        calories: mockMeals[6].calories
      },
      {
        meal: mockMeals[9],
        name: mockMeals[9].name,
        price: mockMeals[9].price,
        quantity: 2,
        calories: mockMeals[9].calories
      }
    ],
    totalPrice: 220000,
    totalCalories: 1160,
    shippingInfo: {
      name: 'Test User',
      phone: '0907654321',
      email: 'user@eatclean.com',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward'
    },
    paymentMethod: 'qr-code',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  }
];

export const mockUsers = [
  {
    _id: 'user123',
    name: 'Test User',
    email: 'user@eatclean.com',
    phone: '0907654321',
    role: 'user',
    isActive: true
  },
  {
    _id: 'admin1',
    name: 'Admin',
    email: 'admin@eatclean.com',
    phone: '0987654321',
    role: 'admin',
    isActive: true
  },
  {
    _id: 'user124',
    name: 'Jane Doe',
    email: 'jane@eatclean.com',
    phone: '0912345678',
    role: 'user',
    isActive: false
  }
];

export const mockStats = {
  totalUsers: 156,
  totalOrders: 423,
  totalMeals: 12,
  totalRevenue: 45750000,
  recentOrders: mockOrders
};

// Helper function to get mock cart from localStorage
export const getMockCart = () => {
  const cartData = localStorage.getItem('mockCart');
  return cartData ? JSON.parse(cartData) : { items: [], totalPrice: 0, totalCalories: 0 };
};

// Helper function to save mock cart to localStorage
export const saveMockCart = (cart) => {
  localStorage.setItem('mockCart', JSON.stringify(cart));
};

// Helper function to calculate cart totals
export const calculateCartTotals = (items) => {
  let totalPrice = 0;
  let totalCalories = 0;
  
  items.forEach(item => {
    const meal = mockMeals.find(m => m._id === item.meal._id || m._id === item.meal);
    if (meal) {
      totalPrice += meal.price * item.quantity;
      totalCalories += meal.calories * item.quantity;
    }
  });
  
  return {
    totalPrice: Math.round(totalPrice),
    totalCalories: Math.round(totalCalories)
  };
};
