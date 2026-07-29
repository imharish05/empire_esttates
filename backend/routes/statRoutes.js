const express = require('express');
const router = express.Router();
const statController = require('../controllers/StatController');

router.get('/', statController.getAllStats);
router.get('/:id', statController.getStatById);
router.post('/', statController.createStat);
router.put('/:id', statController.updateStat);
router.patch('/:id/toggle', statController.toggleStatActive);
router.delete('/:id', statController.deleteStat);

module.exports = router;
