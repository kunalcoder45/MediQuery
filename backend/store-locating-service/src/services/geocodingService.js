const fetch = require('node-fetch');
const { AppError } = require('../utils/errorHandler');
const { logger } = require('../middleware/logger');

const getCoordinates = async (location) => {
  if (!location || typeof location !== 'string' || location.trim() === '') {
    throw new AppError('Location name is required and must be a valid string', 400);
  }

  const cleanLocation = location.trim();
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanLocation)}&limit=1&addressdetails=1`;
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    logger.info(`🌍 Geocoding location: ${cleanLocation}`);
    
    const response = await fetch(url, {
      headers: { 
        'User-Agent': 'MediQuery/1.0 (Medical Store Finder)',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      if (response.status === 429) {
        throw new AppError('Too many location requests. Please wait a moment and try again.', 429);
      }
      throw new AppError('Unable to verify location. Please try again.', 503);
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new AppError(`Location "${cleanLocation}" not found. Please check spelling or try a nearby city name.`, 404);
    }
    
    const result = data[0];
    
    if (!result.lat || !result.lon) {
      throw new AppError('Invalid location coordinates received', 500);
    }
    
    logger.info(`✅ Successfully geocoded: ${result.display_name}`);
    
    return { 
      lat: parseFloat(result.lat), 
      lon: parseFloat(result.lon),
      display_name: result.display_name
    };

  } catch (error) {
    clearTimeout(timeout);
    
    if (error.name === 'AbortError') {
      throw new AppError('Location search timed out. Please check your internet connection.', 408);
    }
    
    if (error instanceof AppError) {
      throw error;
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new AppError('Unable to connect to location services. Please check your internet connection.', 503);
    }
    
    logger.error(`Geocoding error: ${error.message}`);
    throw new AppError('Failed to process location. Please try again.', 500);
  }
};

module.exports = { getCoordinates };
