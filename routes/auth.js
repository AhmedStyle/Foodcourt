const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// login
router.post(
  '/',
  [
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Incorrect password').exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    User.findOne({ email })
      .then((foundUser, err) => {
        if (foundUser) {
          bcrypt.compare(password, foundUser.password, (err, matched) => {
            if (matched) {
              const payload = {
                user: {
                  userID: foundUser.id,
                },
              };
              jwt.sign(payload, process.env.TOKEN_KEY, (err, token) => {
                if (!err) {
                  res.json({ token });
                } else {
                  console.log('err with the token' + err);
                }
              });
            } else {
              return res
                .status(400)
                .json({ msg: 'The password you entered is incorrect' });
            }
          });
        } else {
          res.status(400).json({ msg: 'Please enter a valid email address' });
        }
      })
      .catch((err) => {
        console.log('in catch');
        console.error(err.message);
      });
  }
);

module.exports = router;
