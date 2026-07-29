const { Service } = require('../models');

// Helper to generate a unique slug for a service
const generateUniqueSlug = async (title, currentId = null) => {
  let baseSlug = (title || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!baseSlug) baseSlug = 'service';
  
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await Service.findOne({ where: { slug } });
    if (!existing || (currentId && Number(existing.id) === Number(currentId))) {
      return slug;
    }
    slug = `${baseSlug}-${count}`;
    count++;
  }
};

// GET all services
exports.getAll = async (req, res) => {
  try {
    const list = await Service.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services.', error: error.message });
  }
};

// GET single service by id
exports.getOne = async (req, res) => {
  try {
    const item = await Service.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Service not found.' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Failed to fetch service.', error: error.message });
  }
};

// GET single service by slug
exports.getBySlug = async (req, res) => {
  try {
    const item = await Service.findOne({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ message: 'Service not found.' });
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    res.status(500).json({ message: 'Failed to fetch service.', error: error.message });
  }
};

// POST create service
exports.create = async (req, res) => {
  try {
    const body = req.body;
    // Always generate unique slug
    body.slug = await generateUniqueSlug(body.title || body.service || body.slug);

    // Sync legacy fields
    if (!body.service) body.service = body.title;
    if (!body.estate)   body.estate  = body.category;

    const item = await Service.create(body);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service.', error: error.message });
  }
};

// PUT update service
exports.update = async (req, res) => {
  try {
    const item = await Service.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Service not found.' });

    const body = req.body;
    // Sync legacy fields
    if (body.title) {
      body.service = body.title;
      body.slug = await generateUniqueSlug(body.title, req.params.id);
    }
    if (body.category) body.estate  = body.category;

    await item.update(body);
    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Failed to update service.', error: error.message });
  }
};

// DELETE service
exports.remove = async (req, res) => {
  try {
    const item = await Service.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Service not found.' });
    await item.destroy();
    res.status(200).json({ message: 'Service deleted successfully.', id: req.params.id });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Failed to delete service.', error: error.message });
  }
};