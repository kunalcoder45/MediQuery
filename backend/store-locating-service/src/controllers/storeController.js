const storeService = require('../services/storeService');
const { logger } = require('../middleware/logger');
const { AppError } = require('../utils/errorHandler');

const findMedicalStores = async (req, res, next) => {
  try {
    const { location, radius } = req.body;

    logger.info(`🔍 Searching stores for location: ${location}`);

    const result = await storeService.findNearbyStores(location, radius);

    logger.info(`✅ Found ${result.stores.length} stores for ${location}`);

    result.stores.forEach((store, index) => {
      logger.info(`🏪 Store ${index + 1}: ${store.name} - ${store.address} (${store.distance}km)`);
    });

    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    });

  } catch (error) {
    logger.error(`❌ Error finding stores: ${error.message}`);

    if (error instanceof AppError) {
      return next(error);
    }

    next(new AppError('Failed to find medical stores', 500));
  }
};

module.exports = { findMedicalStores };
