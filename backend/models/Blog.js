const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  heading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.TEXT('long'),
  },
  metaTitle: {
    type: DataTypes.STRING,
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
  metaKeyword: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
}, {
  tableName: 'blogs',
  timestamps: true,
});

// Auto-generate URL slug from heading before validation/save with duplicate avoidance
Blog.beforeValidate(async (blogInstance) => {
  if (blogInstance.heading && !blogInstance.slug) {
    const baseSlug = blogInstance.heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    let currentSlug = baseSlug;
    let count = 1;
    const { Op } = require('sequelize');

    while (true) {
      const query = { slug: currentSlug };
      if (blogInstance.id) {
        query.id = { [Op.ne]: blogInstance.id };
      }
      const existing = await Blog.findOne({ where: query });
      if (!existing) {
        break;
      }
      currentSlug = `${baseSlug}-${count}`;
      count++;
    }
    blogInstance.slug = currentSlug;
  }
});

module.exports = Blog;
