const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Living Room'
  },
  ref: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ACTIVE'
  },
  image: {
    type: DataTypes.TEXT('long')
  },
  client: {
    type: DataTypes.STRING
  },
  architect: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  slug:
   { type: DataTypes.STRING, 
    allowNull: false
   },

  metaKeywords: {
    type: DataTypes.STRING
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;