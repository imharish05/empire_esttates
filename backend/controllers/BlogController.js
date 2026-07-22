const { Blog } = require('../models');

// Fetch all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const list = await Blog.findAll({ order: [['id', 'DESC']] });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to retrieve blogs.', error: error.message });
  }
};

// Fetch blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ where: { slug } });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({ message: 'Failed to retrieve blog.', error: error.message });
  }
};

const cleanDescription = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&#8203;/g, '')
    .replace(/\u200b/g, '');
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.id;
    if (data.description) {
      data.description = cleanDescription(data.description);
    }
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog.', error: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    const data = { ...req.body };
    delete data.id;
    if (data.description) {
      data.description = cleanDescription(data.description);
    }
    await blog.update(data);
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog.', error: error.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully.', id });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog.', error: error.message });
  }
};
