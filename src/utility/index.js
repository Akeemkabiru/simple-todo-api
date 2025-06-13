class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    Error.captureStackTrace(this, this.constructor);
  }
}

operationalError = (req, res, next) => {
  next(new AppError("route not found", 404));
};

programError = (err, req, res, next) => {
  response(res, err.message, 400);
};

response = (res, message, status, data, result) => {
  res.status(status).send({ message, data, result });
};

module.exports = { AppError, programError, operationalError, response };
