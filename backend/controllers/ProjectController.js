const { Project } = require('../models');

// Fetch all projects
exports.getAllProjects = async (req, res) => {
  try {
    const list = await Project.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to retrieve projects.', error: error.message });
  }
};

// Fetch project by slug
exports.getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ where: { slug } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    res.status(500).json({ message: 'Failed to retrieve project.', error: error.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project.', error: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    await project.update(req.body);
    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project.', error: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully.', id });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project.', error: error.message });
  }
};