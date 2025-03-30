import Joi from 'joi';

export const couponValidationSchema = Joi.object({
    code: Joi.string().trim().required(),
    expire: Joi.date(),
    discount: Joi.number().min(0)
});