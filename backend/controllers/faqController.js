const Faq = require('../models/Faq');

// Get all FAQs (Admin gets all, public gets active ones by default unless specified)
exports.getAllFaqs = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    const where = {};
    if (activeOnly === 'true') {
      where.active = true;
    }

    const faqs = await Faq.findAll({
      where,
      order: [
        ['order', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
  }
};

// Get single FAQ by ID
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ message: 'Failed to fetch FAQ', error: error.message });
  }
};

// Create new FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer, category, order, active } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and Answer are required' });
    }

    const newFaq = await Faq.create({
      question,
      answer,
      category: category || 'General',
      order: order !== undefined ? parseInt(order, 10) : 0,
      active: active !== undefined ? Boolean(active) : true,
    });

    res.status(201).json(newFaq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Failed to create FAQ', error: error.message });
  }
};

// Update existing FAQ
exports.updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    const { question, answer, category, order, active } = req.body;

    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;
    if (category !== undefined) faq.category = category;
    if (order !== undefined) faq.order = parseInt(order, 10);
    if (active !== undefined) faq.active = Boolean(active);

    await faq.save();
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Failed to update FAQ', error: error.message });
  }
};

// Delete FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.destroy();
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Failed to delete FAQ', error: error.message });
  }
};
