const Stat = require('../models/Stat');

// Get all stats (Admin gets all, query parameter activeOnly=true returns active ones)
exports.getAllStats = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const where = {};
    if (activeOnly === 'true') {
      where.active = true;
    }

    const stats = await Stat.findAll({
      where,
      order: [
        ['order', 'ASC'],
        ['id', 'ASC'],
      ],
    });
    res.json(stats);
  } catch (error) {
    console.error('Error fetching Stats:', error);
    res.status(500).json({ message: 'Failed to fetch Stats', error: error.message });
  }
};

// Get single Stat by ID
exports.getStatById = async (req, res) => {
  try {
    const stat = await Stat.findByPk(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat counter not found' });
    }
    res.json(stat);
  } catch (error) {
    console.error('Error fetching Stat:', error);
    res.status(500).json({ message: 'Failed to fetch Stat', error: error.message });
  }
};

// Create new Stat counter
exports.createStat = async (req, res) => {
  try {
    const { count, suffix, title, icon, order, active } = req.body;
    if (title === undefined || title === '') {
      return res.status(400).json({ message: 'Title/Description is required' });
    }

    // Restrict maximum 4 stat counters
    const currentCount = await Stat.count();
    if (currentCount >= 4) {
      return res.status(400).json({ message: 'Maximum limit of 4 stat counters reached. You cannot add more than 4 items.' });
    }

    const newStat = await Stat.create({
      count: count !== undefined ? parseInt(count, 10) : 0,
      suffix: suffix !== undefined ? suffix : '+',
      title: title,
      icon: icon || 'FaAward',
      order: order !== undefined ? parseInt(order, 10) : 0,
      active: active !== undefined ? Boolean(active) : true,
    });

    res.status(201).json(newStat);
  } catch (error) {
    console.error('Error creating Stat:', error);
    res.status(500).json({ message: 'Failed to create Stat', error: error.message });
  }
};

// Update existing Stat counter
exports.updateStat = async (req, res) => {
  try {
    const stat = await Stat.findByPk(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat counter not found' });
    }

    const { count, suffix, title, icon, order, active } = req.body;

    if (count !== undefined) stat.count = parseInt(count, 10);
    if (suffix !== undefined) stat.suffix = suffix;
    if (title !== undefined) stat.title = title;
    if (icon !== undefined) stat.icon = icon;
    if (order !== undefined) stat.order = parseInt(order, 10);
    if (active !== undefined) stat.active = Boolean(active);

    await stat.save();
    res.json(stat);
  } catch (error) {
    console.error('Error updating Stat:', error);
    res.status(500).json({ message: 'Failed to update Stat', error: error.message });
  }
};

// Toggle Stat active status
exports.toggleStatActive = async (req, res) => {
  try {
    const stat = await Stat.findByPk(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat counter not found' });
    }

    stat.active = !stat.active;
    await stat.save();
    res.json(stat);
  } catch (error) {
    console.error('Error toggling Stat active state:', error);
    res.status(500).json({ message: 'Failed to toggle Stat status', error: error.message });
  }
};

// Delete Stat counter
exports.deleteStat = async (req, res) => {
  try {
    const stat = await Stat.findByPk(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: 'Stat counter not found' });
    }

    await stat.destroy();
    res.json({ message: 'Stat counter deleted successfully' });
  } catch (error) {
    console.error('Error deleting Stat:', error);
    res.status(500).json({ message: 'Failed to delete Stat', error: error.message });
  }
};
