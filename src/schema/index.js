const Joi = require("joi");

exports.userSignupSchema = Joi.object({
  firstName: Joi.string().required().max(40).min(4),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(4).max(16),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  photo: Joi.string(),
});
