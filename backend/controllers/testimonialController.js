const Testimonial = require('../models/Testimonial');

// Get all testimonials (Supports activeOnly query for public API)
exports.getAllTestimonials = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const where = {};
    if (activeOnly === 'true') {
      where.active = true;
    }

    const testimonials = await Testimonial.findAll({
      where,
      order: [
        ['order', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
};

// Get single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ message: 'Failed to fetch testimonial', error: error.message });
  }
};

// Create new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const {
      author,
      designation,
      avatar,
      rating,
      content,
      title,
      tags,
      date,
      order,
      active,
      slug,
      focusKeyphrase,
      seoTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
    } = req.body;

    if (!author || !content) {
      return res.status(400).json({ message: 'Author name and content/testimonial are required' });
    }

    const newTestimonial = await Testimonial.create({
      author: author.trim(),
      designation: designation ? designation.trim() : 'Valued Client',
      avatar: avatar || '',
      rating: rating !== undefined ? parseInt(rating, 10) : 5,
      content: content.trim(),
      title: title ? title.trim() : '',
      tags: Array.isArray(tags) ? tags.join(', ') : (tags || ''),
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      order: order !== undefined ? parseInt(order, 10) : 0,
      active: active !== undefined ? Boolean(active) : true,
      slug: slug || '',
      focusKeyphrase: focusKeyphrase || '',
      seoTitle: seoTitle || '',
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      canonicalUrl: canonicalUrl || '',
    });

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Failed to create testimonial', error: error.message });
  }
};

// Update existing testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    const {
      author,
      designation,
      avatar,
      rating,
      content,
      title,
      tags,
      date,
      order,
      active,
      slug,
      focusKeyphrase,
      seoTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
    } = req.body;

    if (author !== undefined) testimonial.author = author.trim();
    if (designation !== undefined) testimonial.designation = designation.trim();
    if (avatar !== undefined) testimonial.avatar = avatar;
    if (rating !== undefined) testimonial.rating = parseInt(rating, 10);
    if (content !== undefined) testimonial.content = content.trim();
    if (title !== undefined) testimonial.title = title.trim();
    if (tags !== undefined) testimonial.tags = Array.isArray(tags) ? tags.join(', ') : tags;
    if (date !== undefined) testimonial.date = date;
    if (order !== undefined) testimonial.order = parseInt(order, 10);
    if (active !== undefined) testimonial.active = Boolean(active);
    if (slug !== undefined) testimonial.slug = slug;
    if (focusKeyphrase !== undefined) testimonial.focusKeyphrase = focusKeyphrase;
    if (seoTitle !== undefined) testimonial.seoTitle = seoTitle;
    if (metaDescription !== undefined) testimonial.metaDescription = metaDescription;
    if (metaKeywords !== undefined) testimonial.metaKeywords = metaKeywords;
    if (canonicalUrl !== undefined) testimonial.canonicalUrl = canonicalUrl;

    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Failed to update testimonial', error: error.message });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.destroy();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
  }
};
