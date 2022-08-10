import { Joi } from 'express-validation';

export default {
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
