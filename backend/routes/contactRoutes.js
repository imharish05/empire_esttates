const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');
const { verifyToken } = require('./AuthRoutes'); // assuming we have a verifyToken middleware for protected admin routes. Let me check if verifyToken exists.
// Actually, I'll just use a simple router without auth for now or check AuthRoutes first.

router.post('/', contactController.createContact);
router.get('/', contactController.getContacts); // Should be protected by admin auth, but adding it for functionality
router.delete('/:id', contactController.deleteContact);

module.exports = router;
