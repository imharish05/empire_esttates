const { ProjectCategory, Project } = require('../models');
const { Op } = require('sequelize');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const list = await ProjectCategory.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories.', error: error.message });
  }
};

// Create category  
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: 'Category name is required.' });
    const exists = await ProjectCategory.findOne({ where: { name: name.trim() } });
    if (exists) return res.status(400).json({ message: 'Category already exists.' });
    const category = await ProjectCategory.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category.', error: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await ProjectCategory.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const oldName = category.name;
    const newName = name.trim();

    await category.update({ name: newName });

    // Cascade update all projects with old category name
    if (oldName !== newName) {
      await Project.update(
        { category: newName },
        {
          where: {
            [Op.or]: [
              { category: oldName },
              { category: String(id) }
            ]
          }
        }
      );
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category.', error: error.message });
  }
};

// Delete category and all projects under it
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProjectCategory.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    const catName = category.name.trim().toLowerCase();

    // Destroy target category
    await category.destroy();

    // Get all remaining valid category names
    const remainingCategories = await ProjectCategory.findAll();
    const validCategorySet = new Set(remainingCategories.map(c => c.name.trim().toLowerCase()));
    validCategorySet.add('ongoing project');
    validCategorySet.add('on going project');
    validCategorySet.add('upcoming project');

    // Fetch all projects and purge any project belonging to the deleted category or orphaned category
    const allProjects = await Project.findAll();
    const projectsToDelete = allProjects.filter(p => {
      if (!p.category) return true; // Purge projects with empty category
      const pCat = String(p.category).trim().toLowerCase();
      const isDeletedCat = pCat === catName || pCat === String(id) || pCat.includes(catName) || catName.includes(pCat);
      const isOrphanedCat = !validCategorySet.has(pCat);
      return isDeletedCat || isOrphanedCat;
    });

    for (const proj of projectsToDelete) {
      await proj.destroy();
    }

    res.status(200).json({ message: 'Category and associated projects deleted.', id });
  } catch (error) {
    console.error('Error deleting category and projects:', error);
    res.status(500).json({ message: 'Failed to delete category.', error: error.message });
  }
};