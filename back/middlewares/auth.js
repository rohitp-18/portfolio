const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../modals/userModal");

const auth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login first", 403));
  }

  const { _id } = await jwt.verify(token, process.env.JWT_SECRET);

  if (!_id) {
    return next(new ErrorHandler("Please Login first", 4003));
  }

  const user = await User.findById(_id);

  if (!user) {
    return next(new ErrorHandler("Please Login first", 4003));
  }

  req.user = user;

  next();
});

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Unothorized user", 404));
    }
    next();
  };
};

module.exports = { auth, authorizeRole };
