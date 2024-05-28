const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

const auth = expressAsyncHandler((req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login first", 403));
  }
});

const authorizeRole = (...roles) => {
  console.log("hello");
};

module.exports = { auth, authorizeRole };
