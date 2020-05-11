const express = require('express');

const User = require('../models/user');

const router = express.Router();

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

module.exports = router;
