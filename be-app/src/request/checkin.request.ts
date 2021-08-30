import { Joi } from 'express-validation';

export default {
  createCheckin: {
    body: Joi.object({
      checkin: Joi.string(),
      checkout: Joi.string(),
      date: Joi.date().required(),
    }).or('checkin', 'checkout'),
  },

  paramsRequest: {
    params: Joi.object({
      userId: Joi.number().min(1).integer().required(),
    }),
  },

  queryRequest: {
    query: Joi.object({
      date: Joi.string().required(),
    }),
  },
};
