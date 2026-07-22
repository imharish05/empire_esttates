const express = require('express');
const router = express.Router();
const metaTagController = require('../controllers/Metatagcontroller');

router.get('/',      metaTagController.getAll);
router.post('/',     metaTagController.create);
router.put('/:id',   metaTagController.update);
router.delete('/:id', metaTagController.remove);

module.exports = router;