import Joi from 'joi'

export const wishListSchema = Joi.object({
    wishList: Joi.array()
        .items(
            Joi.string()
        )
        .optional()
});