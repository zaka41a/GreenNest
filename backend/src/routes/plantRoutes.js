const express = require('express');
const router = express.Router();
const {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
  getCategories,
} = require('../controllers/plantController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getAllPlants).post(protect, admin, createPlant);

router.get('/categories', getCategories);

router
  .route('/:id')
  .get(getPlant)
  .put(protect, admin, updatePlant)
  .delete(protect, admin, deletePlant);

module.exports = router;
