const express = require('express');
const router = express.Router();
const layoutController = require('../controllers/layout.controller');

router.get('/', layoutController.getAllLayouts);
router.post('/', layoutController.createLayout);
router.put('/:id', layoutController.updateLayout);
router.delete('/:id', layoutController.deleteLayout);

module.exports = router;
