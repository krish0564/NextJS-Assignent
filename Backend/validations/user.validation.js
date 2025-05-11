import Joi from "joi";

export const userValidationSchema = Joi.object({
  user: Joi.string().required(),
  interest: Joi.array().items(Joi.string()).optional(),
  age: Joi.number().integer().required(),
  mobile: Joi.number().required(),
  email: Joi.string().email().required()
});