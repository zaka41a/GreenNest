const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      plant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      image: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    default: 'card',
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
