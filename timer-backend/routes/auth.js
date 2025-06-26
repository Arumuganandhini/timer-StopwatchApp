const express = require('express');
const router = express.Router();

// Signup route
router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Signup:', email);
  res.status(201).json({ message: 'User registered', user: { email } });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login:', email);
  res.status(200).json({ message: 'Login successful', user: { email } });
});

module.exports = router;
