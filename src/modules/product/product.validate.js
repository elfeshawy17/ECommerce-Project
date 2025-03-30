import Joi from 'joi'

export const addValidation = Joi.object({
    title: Joi.string().trim().min(3).required(),
    slug: Joi.string().required(),
    description: Joi.string().min(3).max(1000).required(),
    imgCover: Joi.object(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0),
    sold: Joi.number().min(0),
    stock: Joi.number().min(0),
    rateAvg: Joi.number().min(0).max(5),
    rateCount: Joi.number().min(0)
});
