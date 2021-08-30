import { Joi } from 'express-validation';

export default {
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      gender: Joi.string().required(),
      dayIn: Joi.date().required(),
      role: Joi.string().required(),
      avatar: Joi.string().allow(''),
      dob: Joi.date().allow(''),
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

  updateUserRoleAdmin: {
    body: Joi.object({
      name: Joi.string(),
      gender: Joi.string(),
      dayIn: Joi.date(),
      role: Joi.string(),
      avatar: Joi.string().allow(''),
      dob: Joi.date().allow(''),
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

  updateUserRoleUser: {
    body: Joi.object({
      name: Joi.string(),
      gender: Joi.string(),
      dayIn: Joi.date(),
      role: Joi.string(),
      avatar: Joi.string().allow(''),
      dob: Joi.date().allow(''),
      phoneNumber: Joi.string().allow(''),
      senority: Joi.string().allow(''),
      address: Joi.string().allow(''),
      dayOfficial: Joi.string().allow(''),
      contractTerm: Joi.string().allow(''),
      vacationsDay: Joi.number().min(0).integer(),
      departmentId: Joi.number().min(0).integer(),
      status: Joi.string().valid('actived', 'pending'),
    }),
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
