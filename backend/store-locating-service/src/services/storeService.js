const geocodingService = require('./geocodingService');
const { calculateDistance } = require('../utils/distance');
const { AppError } = require('../utils/errorHandler');
const { logger } = require('../middleware/logger');

const OVERPASS_ENDPOINTS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

const getMedicalStoresQuery = (lat, lon, radiusMeters) => `
  [out:json][timeout:30];
  (
    node["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
    node["healthcare"="pharmacy"](around:${radiusMeters},${lat},${lon});
    node["shop"="pharmacy"](around:${radiusMeters},${lat},${lon});
    node["shop"="medical"](around:${radiusMeters},${lat},${lon});
    node["shop"="chemist"](around:${radiusMeters},${lat},${lon});
    node["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
    node["healthcare"="clinic"](around:${radiusMeters},${lat},${lon});
    node["name"~"medical"](around:${radiusMeters},${lat},${lon});
    node["name"~"pharmacy"](around:${radiusMeters},${lat},${lon});
    node["name"~"chemist"](around:${radiusMeters},${lat},${lon});
    node["name"~"medicine"](around:${radiusMeters},${lat},${lon});
    node["name"~"drug"](around:${radiusMeters},${lat},${lon});
    way["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
    way["healthcare"="pharmacy"](around:${radiusMeters},${lat},${lon});
    way["shop"="pharmacy"](around:${radiusMeters},${lat},${lon});
    way["shop"="medical"](around:${radiusMeters},${lat},${lon});
    way["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
    relation["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
    relation["healthcare"="pharmacy"](around:${radiusMeters},${lat},${lon});
  );
  out center tags;
`;

const fetchFromOverpass = async (query, endpoint) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35000); // Increased timeout

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: query,
      headers: { 
        'Content-Type': 'text/plain',
        'User-Agent': 'MediQuery/1.0 (Medical Store Finder India)',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response from server');
    }

    return JSON.parse(text);

  } catch (error) {
    clearTimeout(timeout);
    
    if (error.name === 'AbortError') {
      throw new AppError('Request timeout - Server took too long to respond', 408);
    }
    
    if (error.message.includes('fetch')) {
      throw new AppError('Unable to connect to map servers. Please check your internet connection.', 503);
    }
    
    throw error;
  }
};

const getMedicalStores = async (lat, lon, radiusKm = 5) => {
  const radiusMeters = radiusKm * 1000;
  const query = getMedicalStoresQuery(lat, lon, radiusMeters);
  
  let allStores = [];
  let lastError;
  
  // Try multiple endpoints and combine results
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      logger.info(`🌐 Trying endpoint: ${endpoint}`);
      
      const data = await fetchFromOverpass(query, endpoint);

      if (!data.elements || !Array.isArray(data.elements)) {
        continue;
      }

      if (data.elements.length === 0) {
        logger.warn(`No elements found at ${endpoint}`);
        continue;
      }

      const stores = data.elements
        .map(processStoreElement(lat, lon, radiusKm))
        .filter(Boolean);

      logger.info(`✅ Found ${stores.length} stores from ${endpoint}`);
      
      // Add to combined results
      allStores.push(...stores);
      
      // If we got good results, break early
      if (stores.length > 0) {
        break;
      }

    } catch (error) {
      logger.warn(`❌ Failed ${endpoint}: ${error.message}`);
      lastError = error;
      continue;
    }
  }

  // Remove duplicates based on coordinates and name
  const uniqueStores = [];
  const seen = new Set();
  
  for (const store of allStores) {
    const key = `${store.coordinates.lat.toFixed(6)}-${store.coordinates.lon.toFixed(6)}-${store.name}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueStores.push(store);
    }
  }

  // Sort by distance and limit results
  const finalStores = uniqueStores
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 1000);

  if (finalStores.length === 0 && lastError) {
    if (lastError?.status === 408) {
      throw new AppError('All map servers are responding slowly. Please try again in a moment.', 408);
    }

    if (lastError?.status === 503) {
      throw lastError;
    }

    // For Indian locations, provide helpful message
    throw new AppError(
      `No medical stores found in OpenStreetMap data for this area. This might be because:\n` +
      `• Local pharmacies are not yet mapped in detail\n` +
      `• Try searching for a nearby major landmark or area\n` +
      `• Consider increasing the search radius`, 
      404
    );
  }

  logger.info(`🎯 Returning ${finalStores.length} unique stores`);
  return finalStores;
};

const processStoreElement = (userLat, userLon, radiusKm) => (element) => {
  const storeLatitude = element.lat || element.center?.lat;
  const storeLongitude = element.lon || element.center?.lon;
  
  if (!storeLatitude || !storeLongitude) {
    return null;
  }
  
  const distance = calculateDistance(userLat, userLon, storeLatitude, storeLongitude);
  
  if (distance > radiusKm) {
    return null;
  }

  // Better name detection for Indian stores
  const getName = (tags) => {
    if (tags?.name) return tags.name;
    if (tags?.brand) return tags.brand;
    if (tags?.['name:en']) return tags['name:en'];
    if (tags?.['name:hi']) return tags['name:hi'];
    
    // Check for medical-related words in any tag
    const allTags = Object.values(tags || {}).join(' ').toLowerCase();
    if (allTags.includes('pharmacy')) return 'Pharmacy';
    if (allTags.includes('medical')) return 'Medical Store';
    if (allTags.includes('chemist')) return 'Chemist';
    if (allTags.includes('clinic')) return 'Clinic';
    if (allTags.includes('hospital')) return 'Hospital';
    if (allTags.includes('drug')) return 'Drug Store';
    
    return 'Medical Store';
  };

  // Enhanced contact info
  const getContact = (tags) => {
    return tags?.phone || 
           tags?.['contact:phone'] || 
           tags?.['phone:mobile'] ||
           tags?.mobile ||
           'Not available';
  };
  
  return {
    id: element.id,
    name: getName(element.tags),
    phone: getContact(element.tags),
    address: buildAddress(element.tags),
    opening_hours: element.tags?.opening_hours || 'Not available',
    website: element.tags?.website || element.tags?.['contact:website'] || null,
    type: element.tags?.amenity || element.tags?.healthcare || element.tags?.shop || 'medical',
    // Frontend expects these fields
    lat: parseFloat(storeLatitude),
    lon: parseFloat(storeLongitude),
    coordinates: {
      lat: parseFloat(storeLatitude),
      lon: parseFloat(storeLongitude)
    },
    distance: Math.round(distance * 100) / 100,
    // Additional fields for better display
    category: element.tags?.amenity === 'pharmacy' ? 'Pharmacy' : 
              element.tags?.healthcare === 'pharmacy' ? 'Pharmacy' :
              element.tags?.shop === 'medical' ? 'Medical Store' :
              element.tags?.amenity === 'clinic' ? 'Clinic' : 'Medical Store'
  };
};

const buildAddress = (tags) => {
  if (tags?.['addr:full']) return tags['addr:full'];
  
  const parts = [
    tags?.['addr:housenumber'],
    tags?.['addr:street'],
    tags?.['addr:city'],
    tags?.['addr:state']
  ].filter(Boolean);
  
  return parts.length > 0 ? parts.join(', ') : 'Address not available';
};

const findNearbyStores = async (location, radius) => {
  try {
    const coordinates = await geocodingService.getCoordinates(location);
    
    const searchRadius = Math.min(
      Math.max(radius || process.env.DEFAULT_RADIUS || 5, 1), 
      process.env.MAX_RADIUS || 25
    );
    
    const stores = await getMedicalStores(coordinates.lat, coordinates.lon, searchRadius);
    
    if (stores.length === 0) {
      logger.warn(`No medical stores found within ${searchRadius}km of ${location}`);
      
      // Return helpful response even when no stores found
      return {
        stores: [],
        location: {
          name: coordinates.display_name,
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lon
          }
        },
        searchParams: {
          radius: searchRadius,
          total: 0
        },
        message: {
          type: 'no_results',
          text: `No medical stores found in our database for ${searchRadius}km around ${location}. This area might not be fully mapped yet.`,
          suggestions: [
            'Try searching for a nearby main market or landmark',
            'Increase search radius if possible',
            'Search for nearby towns or city centers'
          ]
        }
      };
    }
    
    return {
      stores,
      location: {
        name: coordinates.display_name,
        coordinates: {
          lat: coordinates.lat,
          lon: coordinates.lon
        }
      },
      searchParams: {
        radius: searchRadius,
        total: stores.length
      }
    };

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error(`Service error: ${error.message}`);
    throw new AppError('Failed to process store search request', 500);
  }
};

module.exports = { findNearbyStores };
