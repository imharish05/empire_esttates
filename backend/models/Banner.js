const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING
  },
  placement: {
    type: DataTypes.STRING
  },
  ctaText: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  ctaLink: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.TEXT('long')
  }
}, {
  tableName: 'banners',
  timestamps: true
});

module.exports = Banner;
