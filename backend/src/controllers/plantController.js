const Plant = require('../models/Plant');

// @desc    Get all plants
// @route   GET /api/plants
// @access  Public
exports.getAllPlants = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    let plants = Plant.find(query);

    // Sort
    if (sort === 'price-asc') {
      plants = plants.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      plants = plants.sort({ price: -1 });
    } else if (sort === 'name') {
      plants = plants.sort({ name: 1 });
    } else {
      plants = plants.sort({ createdAt: -1 });
    }

    const result = await plants;
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single plant
// @route   GET /api/plants/:id
// @access  Public
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.findOne({ id: req.params.id });

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json({ success: true, data: plant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create plant
// @route   POST /api/plants
// @access  Private/Admin
exports.createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json({ success: true, data: plant });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update plant
// @route   PUT /api/plants/:id
// @access  Private/Admin
exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json({ success: true, data: plant });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete plant
// @route   DELETE /api/plants/:id
// @access  Private/Admin
exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndDelete({ id: req.params.id });

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json({ success: true, message: 'Plant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get plant categories
// @route   GET /api/plants/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Plant.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
