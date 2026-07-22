const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Elevation = sequelize.define('Elevation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  }
}, {
  tableName: 'elevations',
  timestamps: true
});

module.exports = Elevation;
