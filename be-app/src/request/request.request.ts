import { Joi } from 'express-validation';

export default {
  createRequest: {
    body: Joi.object({
      nameRequest: Joi.string().required(),
      state: Joi.string().required(),
      startDay: Joi.date().required(),
      endDay: Joi.date().required(),
      timeout: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      project: Joi.string().required(),
      reason: Joi.string().required(),
    }),
  },

  updateFormRequest: {
    body: Joi.object({
      nameRequest: Joi.string(),
      state: Joi.string(),
      startDay: Joi.date(),
      endDay: Joi.date(),
      timeout: Joi.string(),
      phoneNumber: Joi.string(),
      project: Joi.string(),
      reason: Joi.string(),
    }),
    params: Joi.object({
      requestId: Joi.number().min(1).integer().required(),
    }),
  },

  updateHandlerRequest: {
    body: Joi.object({
      state: Joi.string().required(),
      handler: Joi.string().email().required(),
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
      state: Joi.string().valid('pending', 'confirmed', 'declined').required(),
    }),
  },
};
