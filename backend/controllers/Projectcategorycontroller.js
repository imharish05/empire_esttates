const { ProjectCategory } = require('../models');

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
    await category.update({ name: name.trim() });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category.', error: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProjectCategory.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    await category.destroy();
    res.status(200).json({ message: 'Category deleted.', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category.', error: error.message });
  }
};