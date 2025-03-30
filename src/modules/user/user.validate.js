import Joi from 'joi'

export const addValidation = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .required()
                .messages({
                            'string.pattern.base': `Password must be at least 8 characters long, include at least one uppercase letter,
                            one lowercase letter, one digit, and one special character.`,
                            'any.required': `Password is required.`,
    }),
    role: Joi.string(),
});
