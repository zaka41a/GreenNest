require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const plantRoutes = require('./src/routes/plantRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: '🌱 GreenNest API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
