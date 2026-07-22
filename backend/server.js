const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./models');
const projectRoutes = require('./routes/ProjectRoutes');
const bannerRoutes = require('./routes/BannerRoutes');
const metaRoutes = require('./routes/Metatagroutes');
const projectCategoryRoutes = require('./routes/Projectcategoryroutes');
const serviceRoutes = require('./routes/Serviceroutes');
const blogRoutes = require('./routes/BlogRoutes');
const authRoutes = require('./routes/AuthRoutes');
const layoutRoutes = require('./routes/layout.routes');
const elevationRoutes = require('./routes/elevation.routes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/projects', projectRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/project-categories', projectCategoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/layouts', layoutRoutes);
app.use('/api/elevations', elevationRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running.' });
});

async function startServer() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();