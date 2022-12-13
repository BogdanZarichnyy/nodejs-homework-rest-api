const Joi = require('joi');

module.exports = {
    registerUserSchemaValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(8)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            subscription: Joi.string(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },

    loginUserSchemaValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(8)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },

    updateUserSubscriptionSchemaValidation: (req, res, next) => {
        const schema = Joi.object({
            subscription: Joi.string()
                .valid('starter', 'pro', 'business')
                .required()
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },
}