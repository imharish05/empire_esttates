const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Valued Client',
  },
  avatar: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  focusKeyphrase: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  seoTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metaKeywords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  canonicalUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'testimonials',
  timestamps: true,
});

module.exports = Testimonial;
