import Joi from 'joi'

export const addValidation = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    img: Joi.object().required()
});

