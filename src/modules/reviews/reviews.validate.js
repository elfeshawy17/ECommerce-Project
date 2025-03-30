import Joi from 'joi'

export const addValidation = Joi.object({
    comment: Joi.string().trim().min(3),
    rate: Joi.number().required(),
});

