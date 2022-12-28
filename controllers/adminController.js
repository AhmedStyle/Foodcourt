const Food = require('../models/food');
const Restaurant = require('../models/restaurant');
const AppError = require('./errorController');

exports.addRestaurant = (req, res, next) => {
  const name = req.body.name;
  const foodType = req.body.foodType;
  const pincode = req.body.pincode;
  const address = req.body.address;
  const phone = req.body.phone;

  const restaurant = new Restaurant({
    name: name,
    foodType: foodType,
    pincode: pincode,
    address: address,
    phone: phone,
  });

  restaurant
    .save()
    .then((restaurant) => {
      return res.json(restaurant);
    })
    .catch((err) => {
      return AppError.onError(res, 'restaurant add error' + err);
    });
};

exports.viewAllRestaurant = (req, res, next) => {
  Restaurant.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((err) => {
      return AppError.onError(res, 'restaurant add error' + err);
    });
};

exports.addFood = (req, res, next) => {
  const restaurantId = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const readyTime = req.body.readyTime;

  let currentRestaurant;

  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      currentRestaurant = restaurant;
      let food = new Food({
        name: name,
        description: description,
        category: category,
        rating: 0,
        price: price,
        images: [],
        readyTime: readyTime,
      });

      return food.save();
    })
    .then((food) => {
      currentRestaurant.foods.push(food);
      return currentRestaurant.save();
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

// to check if the user is admin or not
// const User = require('../models/User');

// exports.addRestaurant = (req, res, next) => {
//   User.findById(req.user.userID)
//     .then((foundUser, err) => {
//       if (!err) {
//         if (foundUser.permissionLevel == 2) {
//           next();
//         } else {
//           return res.status(401).json({ msg: 'Access denied.. ' });
//         }
//       } else {
//         return res.status(404).json({ msg: 'No such a user.. ' });
//       }
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };
