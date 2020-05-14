const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_TOKEN } = process.env;

const User = require('../models/user'); // User Model
const withAuth = require('../middlewares/auth'); // middleware to autenticate

const router = express.Router();

// Create new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    user.password = undefined;
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
        user.password = undefined;
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

// Update User name and Email
router.put('/', withAuth, async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { name: name, email: email } },
      { upsert: true, 'new': true }
    );
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

// Update User Password
router.put('/password', withAuth, async (req, res) => {
  const { password } = req.body;

  try {
    let user = await User.findOne({ _id: req.user._id });
    user.password = password;
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

// Delete User
router.delete('/', withAuth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    await user.delete();
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
