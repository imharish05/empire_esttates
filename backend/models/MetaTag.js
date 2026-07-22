const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MetaTag = sequelize.define('MetaTag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  page: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  metaKeywords: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'metatags',
  timestamps: true
});

module.exports = MetaTag;