const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Layout = sequelize.define('Layout', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  image2: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  }
}, {
  tableName: 'layouts',
  timestamps: true
});

module.exports = Layout;
