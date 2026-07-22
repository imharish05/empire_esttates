const { Banner } = require('../models');

// Fetch all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['id', 'DESC']]
    });
    // Filter out invalid/blank banner entries
    const validBanners = banners.filter(b => b && (b.title || b.image));
    res.status(200).json(validBanners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Failed to retrieve banners.', error: error.message });
  }
};

// Create a new banner
exports.createBanner = async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required.' });
    }
    const bannerData = {
      ...req.body,
      active: req.body.active !== undefined ? req.body.active : true
    };
    const newBanner = await Banner.create(bannerData);
    res.status(201).json(newBanner);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ message: 'Failed to create banner.', error: error.message });
  }
};

// Update an existing banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }

    await banner.update(req.body);
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Failed to update banner.', error: error.message });
  }
};

// Delete a banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }

    await banner.destroy();
    res.status(200).json({ message: 'Banner deleted successfully.', id });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Failed to delete banner.', error: error.message });
  }
};
