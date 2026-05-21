const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Route Imports
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Mount Endpoint Handlers
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Basic Route
app.get('/health', (req, res) => res.json({ status: 'ok', name: 'CVInsight AI Backend API', mode: 'Production-Ready Sandbox' }));

// Error Handling
app.use((err, req, res, next) => {
  console.error('Express App Error Boundary Captured:', err.stack);
  res.status(500).json({ message: 'Something went wrong inside the server API layer!' });
});

module.exports = app;

