import Joi from 'joi'

export const addValidation = Joi.object({
    name: Joi.string().trim().min(3).required(),
    slug: Joi.string().required(),
    img: Joi.object()
});
