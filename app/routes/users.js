const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_TOKEN } = process.env;

const User = require('../models/user'); // User Model

const router = express.Router();

// Create new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error when registering new user' });
  }
});

// Create JWT when user make login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Incorrect email or password' });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(401).json({ error: 'Incorrect email or password' });
        } else {
          const token = jwt.sign({ email }, JWT_TOKEN, { expiresIn: '1d' });
          res.json({ user: user, token: token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal error. Please try again' });
  }
});

module.exports = router;
