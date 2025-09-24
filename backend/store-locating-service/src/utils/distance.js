const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!isValidCoordinate(lat1, lon1) || !isValidCoordinate(lat2, lon2)) {
    throw new Error('Invalid coordinates provided');
  }

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

const isValidCoordinate = (lat, lon) => {
  return typeof lat === 'number' && typeof lon === 'number' &&
         lat >= -90 && lat <= 90 &&
         lon >= -180 && lon <= 180 &&
         !isNaN(lat) && !isNaN(lon);
};

module.exports = { calculateDistance, isValidCoordinate };
