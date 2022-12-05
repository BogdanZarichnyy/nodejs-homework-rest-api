const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .pattern(/^[a-zA-Z- ]+$/)
                .min(3)
                .max(40)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            phone: Joi.string()
                .pattern(/^[0-9-() +]+$/)
                .min(10)
                .max(30)
                .required(),
            favorite: Joi.boolean(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },

    putContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .pattern(/^[a-zA-Z- ]+$/)
                .min(3)
                .max(40)
                .optional(),
            email: Joi.string()
                .email()
                .optional(),
            phone: Joi.string()
                .pattern(/^[0-9-() +]+$/)
                .min(10)
                .max(30)
                .optional(),
            favorite: Joi.boolean()
                .optional(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },
}