const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Stat = sequelize.define('Stat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  suffix: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '+',
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'FaAward',
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
}, {
  tableName: 'stats',
  timestamps: true,
});

module.exports = Stat;
