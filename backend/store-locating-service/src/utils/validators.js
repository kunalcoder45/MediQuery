const Joi = require('joi');
const { AppError } = require('./errorHandler');

const storeRequestSchema = Joi.object({
  location: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Location cannot be empty',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 100 characters',
      'any.required': 'Location is required'
    }),
  
  radius: Joi.number()
    .min(1)
    .max(25)
    .optional()
    .messages({
      'number.min': 'Radius must be at least 1 km',
      'number.max': 'Radius cannot exceed 25 km'
    })
});

const validateStoreRequest = (req, res, next) => {
  const { error, value } = storeRequestSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return next(new AppError('Invalid request data', 400, errors));
  }

  req.body = value;
  next();
};

module.exports = { validateStoreRequest };
