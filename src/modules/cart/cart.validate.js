import Joi from 'joi'

export const cartSchema = Joi.object({
    user: Joi.string().required(),
    cartItems: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().required().default(1),
            price: Joi.number().required(),
        })
    ).required(),
    totalPrice: Joi.number().default(0),
    discount: Joi.number().default(0),
    totalPriceAfterDiscount: Joi.number().default(0),
});