import { Joi } from 'express-validation';

export default {
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      gender: Joi.string().required(),
      dayIn: Joi.string().required(),
      role: Joi.string().required(),
      confirmationCode: Joi.string().required(),
    }),
  },
};
