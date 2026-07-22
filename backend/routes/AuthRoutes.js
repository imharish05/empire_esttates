const express = require('express');
const router = express.Router();

const { Admin } = require('../models');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    console.log('Login attempt:', { providedEmail: email, providedPassword: password });

    const admin = await Admin.findOne({ where: { email: email.trim() } });

    if (admin && admin.password === password.trim()) {
      // In a real app, you would sign a JWT here. 
      // For now, we just return success.
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
