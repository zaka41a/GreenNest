const Order = require('../models/Order');
const Plant = require('../models/Plant');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Calculate total amount and validate stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Try to find by _id (ObjectId) or by id (string)
      let plant = await Plant.findById(item.plant).catch(() => null);

      // If not found by ObjectId, try to find by string id field
      if (!plant) {
        plant = await Plant.findOne({ id: item.plant });
      }

      if (!plant) {
        return res.status(404).json({ message: `Plant not found: ${item.plant}` });
      }

      if (plant.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${plant.name}. Available: ${plant.stock}`
        });
      }

      totalAmount += plant.price * item.quantity;

      orderItems.push({
        plant: plant._id,
        name: plant.name,
        price: plant.price,
        quantity: item.quantity,
        image: plant.image,
      });

      // Update plant stock
      plant.stock -= item.quantity;
      await plant.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
