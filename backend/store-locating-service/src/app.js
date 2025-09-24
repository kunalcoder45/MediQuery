require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const storeRoutes = require('./routes/storeRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const { logger, requestLogger } = require('./middleware/logger');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:9002', 'https://mediquery.vercel.app'] 
    : true,
  credentials: true
}));

// Rate limiting
app.use(rateLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: "🏥 MediQuery API - Medical Store Finder",
    status: "healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      stores: "/api/medical-stores",
      health: "/health"
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', storeRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: ['/api/medical-stores', '/health']
  });
});

// Global error handler
app.use(errorMiddleware);

module.exports = app;
