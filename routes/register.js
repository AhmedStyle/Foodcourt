const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// registeration
router.post(
  '/',
  // conditions for validation
  [
    check('name', 'Name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],

  (req, res) => {
    // validation based on the conditions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, username, email, password } = req.body;

      User.findOne({ $or: [{ email }, { username }] }, (err, foundUser) => {
        if (foundUser) {
          return res.status(400).json({
            errors: `This ${
              email == foundUser.email ? 'email' : 'username'
            } already exists`,
          });
        }
        bcrypt.hash(password, 10, (err, hashed) => {
          if (!err) {
            // create new user
            const newUser = new User({
              name,
              username,
              email,
              password: hashed,
            });

            newUser.save((err, createdUser) => {
              if (!err) {
                // Create token
                const token = jwt.sign(
                  { userID: newUser._id },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: '2h',
                  }
                );
                // return token
                return res.status(201).json({ token });
              }
            });
          }
        });
      });
    } catch (err) {
      res.json(err);
    }
  }
);

module.exports = router;
