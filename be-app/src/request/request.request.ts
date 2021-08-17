import { Joi } from 'express-validation';

export default {
  createRequest: {
    body: Joi.object({
      nameRequest: Joi.string().required(),
      state: Joi.string().required(),
      startDay: Joi.string().required(),
      endDay: Joi.string().required(),
      timeout: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      project: Joi.string().required(),
      reason: Joi.string().required(),
      userId: Joi.number().min(1).integer().required(),
    }),
  },

  updateRequest: {
    body: Joi.object({
      nameRequest: Joi.string(),
      state: Joi.string(),
      startDay: Joi.string(),
      endDay: Joi.string(),
      timeout: Joi.string(),
      phoneNumber: Joi.string(),
      project: Joi.string(),
      reason: Joi.string(),
      handler: Joi.string().email(),
    }),
    params: Joi.object({
      requestId: Joi.number().min(1).integer().required(),
    }),
  },

  paramsRequest: {
    params: Joi.object({
      requestId: Joi.number().min(1).integer(),
      userId: Joi.number().min(1).integer(),
    }).or('requestId', 'userId'),
  },

  queryRequest: {
    query: Joi.object({
      emailManager: Joi.string().email(),
      state: Joi.string().valid('pending', 'confirmed', 'declined'),
    }).or('emailManager', 'state'),
  },
};