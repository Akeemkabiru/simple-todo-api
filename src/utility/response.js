exports.response = (res, message, status, data, result) => {
  res.status(status).send({ message, data, result });
};
