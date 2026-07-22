const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Servicecontroller');

router.get('/',            serviceController.getAll);
router.get('/slug/:slug',  serviceController.getBySlug);
router.get('/:id',         serviceController.getOne);
router.post('/',           serviceController.create);
router.put('/:id',         serviceController.update);
router.delete('/:id',      serviceController.remove);

module.exports = router;