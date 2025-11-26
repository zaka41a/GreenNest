const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { protect, admin } = require('../middleware/authMiddleware')

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, phoneNumber, notes } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    // Calculate total amount
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    const order = await Order.create({
      userId: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      items,
      totalAmount,
      shippingAddress,
      phoneNumber,
      notes
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    order.status = status
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   PUT /api/orders/:id/payment
// @desc    Update payment status (Admin only)
// @access  Private/Admin
router.put('/:id/payment', protect, admin, async (req, res) => {
  try {
    const { paymentStatus } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    order.paymentStatus = paymentStatus
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
