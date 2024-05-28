const error = (err, req, res, next) => {
  let message = err.message || "Internal error";
  let status = err.status || 500;

  if (err.code === 1100) {
    message = "This email is already exist";
    status = 500;
  }

  res.status(status).json({
    success: false,
    message,
    stack: err.stack,
  });
};

module.exports = error;
