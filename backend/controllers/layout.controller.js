const { Layout } = require('../models');

exports.getAllLayouts = async (req, res) => {
  try {
    const layouts = await Layout.findAll();
    res.json(layouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLayout = async (req, res) => {
  try {
    const { title, area = '', image, image2 } = req.body;

    const newLayout = await Layout.create({ title, area, image, image2 });
    res.status(201).json(newLayout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLayout = async (req, res) => {
  try {
    const layout = await Layout.findByPk(req.params.id);
    if (!layout) {
      return res.status(404).json({ error: 'Layout not found' });
    }
    const { title, area, image, image2 } = req.body;
    await layout.update({
      title: title ?? layout.title,
      area: area ?? layout.area ?? '',
      image: image ?? layout.image,
      image2: image2 ?? layout.image2,
    });
    res.json(layout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLayout = async (req, res) => {
  try {
    const layout = await Layout.findByPk(req.params.id);
    if (!layout) {
      return res.status(404).json({ error: 'Layout not found' });
    }

    await layout.destroy();
    res.json({ message: 'Layout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
