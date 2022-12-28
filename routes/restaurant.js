const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const adminController = require('../controllers/adminController');

// not finished yet

//@route    GET api/restaurants
//@desc     get all restaurants
//@access   Private-admin
router.get('/', verifyToken, async (req, res, next) => {
  await adminController.addRestaurant(req, res, next);
  res.json(req.user);
});

//@route    POST api/restaurants
//@desc     add a restaurant
//@access   Private-admin

//@route    PUT api/restaurants:id
//@desc     update a restaurant
//@access   Private-admin

//@route    DELETE api/restaurants:id
//@desc     delete a restaurant
//@access   Private-admin
module.exports = router;
