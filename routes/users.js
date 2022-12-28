const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');

// const router = express.Router({ mergeParams: true });
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const auth = require('../middlewares/userAuth');

// Get All users // not needed
router.get('/', verifyToken, (req, res) => {
  User.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log(err.message);
    }
  }).sort({ date: -1 });
});

// update a user // to change roles
router.put('/:id', verifyToken, (req, res) => {
  const { id, newRole } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $set: { role: newRole } }, // this will change later
    (err, doc) => {
      if (doc) {
        res.json(doc);
      } else {
        return res.status(404).json({ msg: 'not found..' });
      }
    }
  ).catch((err) => console.log(err));
});

// Delete a user
router.delete('/:id', verifyToken, (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, deletedUser) => {
    if (deletedUser) {
      res.json({ msg: 'User has been deleted successfully' });
    } else {
      res.json({ msg: 'User not found' });
    }
  });
});

router.put('/cart/:id/:qty', auth, userController.editCart);

router.post('/cart/:id', auth, userController.addToCart);

router.get('/cart', auth, userController.getCart);

router.get('/order', auth, userController.getOrder);

router.get('/order/:id', auth, userController.getSelectedOrder);

router.post('/add-order', auth, userController.addOrder);

router.get('/profile', auth, userController.viewProfile);

router.post('/address', auth, userController.editAddress);

module.exports = router;
