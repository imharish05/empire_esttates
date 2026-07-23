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

const cleanLiLeadingMarkers = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/&#8203;/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\u200b/g, '');

  for (let i = 0; i < 8; i++) {
    const prev = str;
    str = str.replace(/(<li\b[^>]*>(?:\s*<[^>]+>)*)\s*([•\-\*\.]|&bull;|\u2022|\d+[\.\)]|\b\d+\b)\s*/gi, '$1');
    if (str === prev) break;
  }

  return str
    .replace(/<b>\s*<\/b>/gi, '')
    .replace(/<strong>\s*<\/strong>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '');
};

const fixOrderedListSequentialNumbering = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html;

  // Strip value="..." attributes from <li> elements so list counters are not overridden
  str = str.replace(/(<li\b[^>]*)\s+value=["']?\d+["']?/gi, '$1');

  // Merge adjacent lists (ol/ul) to preserve sequential numbering
  str = str
    .replace(/<\/ol>\s*<ol\b[^>]*>/gi, '')
    .replace(/<\/ul>\s*<ul\b[^>]*>/gi, '');

  // Calculate running count across multiple <ol> elements in the article
  let runningCount = 1;
  return str.replace(/<ol\b([^>]*)>([\s\S]*?)<\/ol>/gi, (match, attrs, content) => {
    const cleanContent = content.replace(/(<li\b[^>]*)\s+value=["']?\d+["']?/gi, '$1');
    const liMatches = cleanContent.match(/<li\b/gi);
    const count = liMatches ? liMatches.length : 0;
    let startAttr = '';
    if (runningCount > 1) {
      startAttr = ` start="${runningCount}"`;
    }
    runningCount += count;
    const cleanAttrs = (attrs || '').replace(/\s*start=["']?\d+["']?/gi, '');
    return `<ol${cleanAttrs}${startAttr}>${cleanContent}</ol>`;
  });
};

const normalizeRichTextHtml = (html) => {
  if (typeof html !== 'string') return html;
  const sizeMap = {
    '1': '12px',
    '2': '13px',
    '3': '14px',
    '4': '18px',
    '5': '24px',
    '6': '32px',
    '7': '48px',
  };

  let str = cleanLiLeadingMarkers(html);
  str = fixOrderedListSequentialNumbering(str);

  return str.replace(/<font\b([^>]*)>([\s\S]*?)<\/font>/gi, (match, attrs, content) => {
    let styles = [];
    const sizeMatch = attrs.match(/size=["']?(\d+)["']?/i);
    if (sizeMatch && sizeMap[sizeMatch[1]]) styles.push(`font-size: ${sizeMap[sizeMatch[1]]}`);
    const colorMatch = attrs.match(/color=["']?([^"'\s>]+)["']?/i);
    if (colorMatch) styles.push(`color: ${colorMatch[1]}`);
    const faceMatch = attrs.match(/face=["']?([^"'\s>]+)["']?/i);
    if (faceMatch) styles.push(`font-family: ${faceMatch[1]}`);
    const styleAttrMatch = attrs.match(/style=["']([^"']+)["']/i);
    if (styleAttrMatch) styles.push(styleAttrMatch[1]);
    if (styles.length > 0) return `<span style="${styles.join('; ')}">${content}</span>`;
    return content;
  });
};

const removeQuotes = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html.replace(/<\/?blockquote\b[^>]*>/gi, '');
  return str.replace(/(^|>)([^<]*)(<|$)/g, (match, open, text, close) => {
    const cleanText = text.replace(/["'“”‘’`]/g, '');
    return `${open}${cleanText}${close}`;
  });
};

const cleanJunkMetadata = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str
    .replace(/\*\]:[^>]*data-turn=[^>]*>/gi, '')
    .replace(/data-turn-id\b[^>]*>/gi, '')
    .replace(/R6Vx5W_[^\s<>]*/gi, '')
    .replace(/scroll-mb-calc[^\s<>]*/gi, '')
    .replace(/scroll-mt-calc[^\s<>]*/gi, '')
    .replace(/style=["'][^"']*(display\s*:\s*flex|columns\s*:|grid-template|float\s*:)[^"']*["']/gi, '');
};

const sanitizeDescription = (str) => {
  if (typeof str !== 'string') return str;
  const noJunk = cleanJunkMetadata(str);
  const noQuotes = removeQuotes(noJunk);
  const normalized = normalizeRichTextHtml(noQuotes);
  return normalized
    .replace(/[\^%\$~\\\|\{\}\[`]/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&#8203;/g, '')
    .replace(/\u200b/g, '');
};

const sanitizeText = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/[\^%\$#\*~\\\|\{\}\[`]/g, '').trim();
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.id;
    if (data.description) {
      data.description = sanitizeDescription(data.description);
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
      data.description = sanitizeDescription(data.description);
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
