const express = require('express');
const router = express.Router();
const controller = require('../controllers/elevation.controller');

router.get('/', controller.getAllElevations);
router.post('/', controller.createElevation);
router.put('/:id', controller.updateElevation);
router.delete('/:id', controller.deleteElevation);

module.exports = router;
