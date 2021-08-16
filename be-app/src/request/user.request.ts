import { Joi } from 'express-validation';

export default {
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().required(),
      gender: Joi.string().required(),
      dayIn: Joi.string().required(),
      role: Joi.string().required(),
      avatar: Joi.string().allow(''),
      dob: Joi.string().allow(''),
      phoneNumber: Joi.string().allow(''),
      senority: Joi.string().allow(''),
      address: Joi.string().allow(''),
      dayOfficial: Joi.string().allow(''),
      contractTerm: Joi.string().allow(''),
      vacationsDay: Joi.number().min(0).integer(),
      departmentId: Joi.number().min(0).integer().required(),
      status: Joi.string().valid('actived', 'pending'),
    }),
  },

  updateUser: {
    body: Joi.object({
      password: Joi.string().min(8),
      name: Joi.string(),
      gender: Joi.string(),
      dayIn: Joi.string(),
      role: Joi.string(),
      avatar: Joi.string().allow(''),
      dob: Joi.string().allow(''),
      phoneNumber: Joi.string().allow(''),
      senority: Joi.string().allow(''),
      address: Joi.string().allow(''),
      dayOfficial: Joi.string().allow(''),
      contractTerm: Joi.string().allow(''),
      vacationsDay: Joi.number().min(0).integer(),
      departmentId: Joi.number().min(0).integer(),
      status: Joi.string().valid('actived', 'pending'),
    }),
    query: Joi.object({ email: Joi.string().email().required() }),
  },

  queryRequest: {
    query: Joi.object({
      email: Joi.string().email(),
      date: Joi.string(),
      role: Joi.string().valid('admin', 'manager', 'user'),
    }).or('email', 'date', 'role'),
  },

  paramRequest: {
    params: Joi.object({ departmentId: Joi.number().min(1).integer().required() }),
  },
};
