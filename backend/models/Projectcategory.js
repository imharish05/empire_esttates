const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProjectCategory = sequelize.define('ProjectCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'projectcategories',
  timestamps: true
});

module.exports = ProjectCategory;