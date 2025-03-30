import Joi from 'joi'

export const addressSchema = Joi.object({
    city: Joi.string().required(),
    phone: Joi.string().required(),
    street: Joi.string().required(),
});