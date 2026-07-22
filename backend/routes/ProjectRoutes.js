const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');

router.get('/', projectController.getAllProjects);
router.get('/slug/:slug', projectController.getProjectBySlug);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
