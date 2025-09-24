const express = require('express');
const { findMedicalStores } = require('../controllers/storeController');
const { validateStoreRequest } = require('../utils/validators');

const router = express.Router();

router.post('/medical-stores', validateStoreRequest, findMedicalStores);

// Debug endpoint to test Overpass queries
router.get('/debug/overpass/:lat/:lon/:radius?', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }
  
  try {
    const { lat, lon, radius = 5 } = req.params;
    const radiusMeters = radius * 1000;
    
    const query = `
      [out:json][timeout:30];
      (
        node["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
        node["healthcare"="pharmacy"](around:${radiusMeters},${lat},${lon});
        node["shop"="pharmacy"](around:${radiusMeters},${lat},${lon});
        node["shop"="medical"](around:${radiusMeters},${lat},${lon});
        node["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
      );
      out center tags;
    `;
    
    res.json({
      query: query.trim(),
      coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
      radius_km: radius,
      radius_meters: radiusMeters,
      overpass_url: 'https://overpass.kumi.systems/api/interpreter'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
