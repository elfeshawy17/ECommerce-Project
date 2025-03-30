import Joi from 'joi'

export const orderSchema = Joi.object({
    user: Joi.string(),
    orderItems: Joi.array().items(
        Joi.object({
            product: Joi.string(),
            quantity: Joi.number(),
            price: Joi.number(),
        })
    ),
    totalOrderPrice: Joi.number().default(0),
    shippingAddress: Joi.object({
        city: Joi.string(),
        street: Joi.string(),
        phone: Joi.string(),
    }),
    paymentMethod: Joi.string().valid('cash', 'card').default('cash'),
    isPaid: Joi.boolean().default(false),
});