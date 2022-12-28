const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/adminAuth');
const AppError = require('../controllers/errorController');
const foodController = require('../controllers/foodController');

/**
 * PUBLIC ROUTES
 */
router.get('/', foodController.getAvailableFoods);

router.get('/:id', foodController.getFoodDetails);

router.get('/in-30-min', foodController.getInThirtyMinutes);

router.get('/top/restaurants', foodController.getTopRestaurants);

router.get('/restaurant/:id', foodController.getAllFoodsFromRestaurant);

router.use(AppError.onInvalidEndpoint);

module.exports = router;
