const sequelize = require('../config/db');

const Banner = require('./Banner');
const Project = require('./Project');
const MetaTag = require('./MetaTag');
const ProjectCategory = require('./Projectcategory');
const Service = require('./Service');
const Blog = require('./Blog');
const Admin = require('./Admin');
const Layout = require('./Layout');
const Elevation = require('./Elevation');
const Contact = require('./Contact');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
    await sequelize.sync(); // Creates missing tables on restart without altering existing ones
    console.log('Database models synchronized.');

    try {
      await sequelize.query('SET GLOBAL max_allowed_packet=1073741824;');
      console.log('Increased max_allowed_packet size.');
    } catch (e) {
      console.log('Could not set max_allowed_packet (might need root privileges), continuing...');
    }

    try {
      await sequelize.query('ALTER TABLE banners MODIFY COLUMN image LONGTEXT;');
      console.log('Altered banners table image column to LONGTEXT.');
    } catch (e) {}

    try {
      await sequelize.query("UPDATE metatags SET pageUrl = REPLACE(pageUrl, 'http://localhost:3000', 'https://empireesttates.freshmindz.in') WHERE pageUrl LIKE '%localhost%';");
      console.log('Updated metatags table pageUrl localhost references.');
    } catch (e) {}



    // Seed admins
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await Admin.create({ email: 'admin@empireesttates.com', password: 'admin@2026' });
      console.log('Database seeded with default admin.');
    }

  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

module.exports = { sequelize, Banner, Project, MetaTag, ProjectCategory, Service, Blog, Admin, Layout, Elevation, Contact, initDB };