import { Joi } from 'express-validation';

export default {
  createDepartment: {
    body: Joi.object({
      nameDepartment: Joi.string().required(),
      description: Joi.string(),
    }),
  },

  updateDepartment: {
    body: Joi.object({
      nameDepartment: Joi.string(),
      description: Joi.string(),
    }),
    params: Joi.object({
      departmentId: Joi.number().min(1).integer(),
    }),
  },

  paramRequest: {
    params: Joi.object({
      departmentId: Joi.number().min(1).integer(),
    }),
  },
};
