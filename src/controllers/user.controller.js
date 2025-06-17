require("dotenv").config({ path: "./../config/.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userSignupSchema } = require("../schema");
const { response, AppError } = require("../utility");

exports.signup = async (req, res, next) => {
  const { error } = userSignupSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) return response(res, error.details[0].message, 400);
  const { firstName, email, password, _id } = req.body;
  //generated a jwt token
  const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  try {
    //check if the user never exist
    const user = await User.findOne({ email });
    if (user) return next(new AppError("User already exist", 400));

    const newUser = await User.create({ firstName, email, password });
    res
      .status(201)
      .json({ message: "User created successfully", token, data: newUser });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if there is email and password
    if (!(email && password))
      return next(new AppError("Provide email and password", 400)); //operational error
    //check if the user exist
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) return next(new AppError("Invalid email or password"), 400);
    //check if the password of the user match the hashed one using bcrypt compare
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(new AppError("Invalid email or password"), 400);
    //generate jwt token
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res.status(200).json({ message: "success", token });
  } catch (error) {
    next(error);
  }
};

exports.protected = async (req, res, next) => {
  try {
    //check if there is bearer token on the header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return next(new AppError("Access Denied: No Token Provided", 401));
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded) return next(new AppError("Invalid token", 401));

      //invalidate token when user has changed password
      const isChangedPassword = User.ChangedPasswordAfer(decoded.iat);
      if (isChangedPassword)
        return next(
          new AppError(
            "Token is invalid because password was changed, please login again."
          )
        );

      req.user = decoded;
      next();
    });
  } catch (err) {
    return next(new AppError("Something went wrong with authentication", 500));
  }
};

//Authorization: to give permission to a certain user on which resources/functionality they can have access to

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes[req.user.role])
      return next(
        new AppError("You do no have permission to do this action"),
        403
      );
    next();
  };
};

//admin
exports.adminStats = async (req, res, next) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          id: "$role",
          total: { $sum: 1 },
        },
      },
    ]);
    return response(res, "Stats fetched successfully", 200, data);
  } catch (error) {
    next(error);
  }
};
