const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a plant name'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Air-Purifying', 'Low-Light', 'Pet-Friendly', 'Succulents', 'Tropical'],
  },
  image: {
    type: String,
    default: '/images/default-plant.jpg',
  },
  stock: {
    type: Number,
    default: 10,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  careLevel: {
    type: String,
    enum: ['Easy', 'Moderate', 'Advanced'],
    default: 'Easy',
  },
  lightRequirement: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  wateringFrequency: {
    type: String,
    default: 'Weekly',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
plantSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Plant', plantSchema);
