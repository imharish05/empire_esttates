const { Elevation } = require('../models');

exports.getAllElevations = async (req, res) => {
  try {
    const items = await Elevation.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching elevations' });
  }
};

exports.createElevation = async (req, res) => {
  try {
    const { title, location, clientName, description, image } = req.body;
    const newItem = await Elevation.create({ title, location, clientName, description, image });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating elevation' });
  }
};

exports.updateElevation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, clientName, description, image } = req.body;
    const item = await Elevation.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    item.title = title || item.title;
    item.location = location || item.location;
    item.clientName = clientName !== undefined ? clientName : item.clientName;
    item.description = description !== undefined ? description : item.description;
    if (image) item.image = image;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating elevation' });
  }
};

exports.deleteElevation = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Elevation.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    await item.destroy();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting elevation' });
  }
};
