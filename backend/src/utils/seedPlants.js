require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const plants = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    description: 'Also known as Mother-in-Law\'s Tongue, this hardy plant is perfect for beginners. It purifies air and tolerates low light.',
    price: 24.99,
    category: 'Air-Purifying',
    image: '/images/snake-plant.jpg',
    stock: 15,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    wateringFrequency: 'Every 2-3 weeks',
    featured: true,
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    description: 'Beautiful white flowers and excellent air purification qualities. Thrives in low to medium light.',
    price: 29.99,
    category: 'Air-Purifying',
    image: '/images/peace-lily.jpg',
    stock: 12,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    wateringFrequency: 'Weekly',
    featured: true,
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    description: 'Zamioculcas zamiifolia is nearly indestructible. Perfect for offices and low-light spaces.',
    price: 34.50,
    category: 'Low-Light',
    image: '/images/zz-plant.jpg',
    stock: 10,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    wateringFrequency: 'Every 2-3 weeks',
    featured: false,
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    description: 'Fast-growing trailing vine with heart-shaped leaves. Great for hanging baskets or shelves.',
    price: 19.99,
    category: 'Low-Light',
    image: '/images/pothos.jpg',
    stock: 20,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    wateringFrequency: 'Weekly',
    featured: true,
  },
  {
    id: 'parlor-palm',
    name: 'Parlor Palm',
    description: 'Elegant palm that\'s safe for pets. Adds a tropical touch to any room.',
    price: 22.00,
    category: 'Pet-Friendly',
    image: '/images/parlor-palm.jpg',
    stock: 8,
    careLevel: 'Moderate',
    lightRequirement: 'Medium',
    wateringFrequency: 'Weekly',
    featured: false,
  },
  {
    id: 'calathea',
    name: 'Calathea',
    description: 'Stunning patterned leaves that fold up at night. Safe for pets and prefers indirect light.',
    price: 31.00,
    category: 'Pet-Friendly',
    image: '/images/calathea.jpg',
    stock: 7,
    careLevel: 'Moderate',
    lightRequirement: 'Medium',
    wateringFrequency: 'Weekly',
    featured: true,
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing plants
    await Plant.deleteMany({});
    console.log('🗑️  Cleared existing plants');

    // Insert new plants
    await Plant.insertMany(plants);
    console.log('✅ Seeded plants successfully');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@greennest.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@greennest.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Created admin user (admin@greennest.com / admin123)');
    }

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
