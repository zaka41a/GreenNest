const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);

router.get('/my-orders', protect, getMyOrders);

router.route('/:id').get(protect, getOrder);

router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
