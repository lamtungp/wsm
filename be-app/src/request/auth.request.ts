import { Joi } from 'express-validation';

export default {
    customerLogin: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },
};
