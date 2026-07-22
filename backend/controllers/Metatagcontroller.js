const { MetaTag } = require('../models');

const sanitizePageUrl = (url) => {
  if (!url) return url;
  const clientDomain = (process.env.CLIENT_URL || process.env.SITE_URL || 'https://empireesttates.freshmindz.in').replace(/\/$/, '');
  return url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, clientDomain);
};

// GET all meta tags
exports.getAll = async (req, res) => {
  try {
    const list = await MetaTag.findAll({ order: [['id', 'ASC']] });
    const formatted = list.map(item => {
      const data = item.toJSON();
      if (data.pageUrl) data.pageUrl = sanitizePageUrl(data.pageUrl);
      return data;
    });
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching meta tags:', error);
    res.status(500).json({ message: 'Failed to fetch meta tags.', error: error.message });
  }
};

// POST create new meta tag
exports.create = async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.pageUrl) body.pageUrl = sanitizePageUrl(body.pageUrl);
    const item = await MetaTag.create(body);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating meta tag:', error);
    res.status(500).json({ message: 'Failed to create meta tag.', error: error.message });
  }
};

// PUT update meta tag
exports.update = async (req, res) => {
  try {
    const item = await MetaTag.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Meta tag not found.' });
    const body = { ...req.body };
    if (body.pageUrl) body.pageUrl = sanitizePageUrl(body.pageUrl);
    await item.update(body);
    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating meta tag:', error);
    res.status(500).json({ message: 'Failed to update meta tag.', error: error.message });
  }
};

// DELETE meta tag
exports.remove = async (req, res) => {
  try {
    const item = await MetaTag.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Meta tag not found.' });
    await item.destroy();
    res.status(200).json({ message: 'Meta tag deleted successfully.', id: req.params.id });
  } catch (error) {
    console.error('Error deleting meta tag:', error);
    res.status(500).json({ message: 'Failed to delete meta tag.', error: error.message });
  }
};