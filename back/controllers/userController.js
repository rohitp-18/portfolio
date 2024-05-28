const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

const getUser = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user,
  });
});

const user = expressAsyncHandler(async (req, res, next) => {
  // next({ message: "done" });
  return { message: "dome" };
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  // const { email, password } = req.body;

  // if ((!email, !password)) {
  //   return next(new ErrorHandler("Please provide email and password", 401));
  // }
  const est = await user(req, res, next);
  res.status(200).json({
    est,
  });
  // const user = await
});

module.exports = { getUser, loginUser };
