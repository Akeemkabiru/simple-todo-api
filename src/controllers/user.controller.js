exports.signup = async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) return response(res, error.details[0].message, 400);
  try {
    await User.create(req.body);
    response(res, "User created successfully", 201);
  } catch (error) {
    next(error);
  }
};
