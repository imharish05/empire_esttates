const sequelize = require('./config/db');

async function fixDb() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    
    try {
      await sequelize.query('ALTER TABLE layouts ADD COLUMN image2 LONGTEXT;');
      console.log('Added image2 to layouts');
    } catch(e) { console.log('image2 already exists or error:', e.message); }

    try {
      await sequelize.query('CREATE TABLE IF NOT EXISTS elevations (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, description TEXT, image LONGTEXT, createdAt DATETIME, updatedAt DATETIME)');
      console.log('Created elevations table');
    } catch(e) { console.log('Error creating elevations:', e.message); }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixDb();
