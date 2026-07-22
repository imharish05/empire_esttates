const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.STRING,
  },
  estate: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  consultationRequirement: {
    type: DataTypes.TEXT,
  },
  propertySelection: {
    type: DataTypes.TEXT,
  },
  bookingDocumentation: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  servicesIncluded: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  tableName: 'services',
  timestamps: true,
});

module.exports = Service;