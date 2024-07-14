const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const User = require("../modals/userModal");

const getUser = expressAsyncHandler(async (req, res, next) => {
  sendToken(req.user, res);
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Please enter Valid Email and Password", 401));
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Please enter Valid Eamil and Password", 401));
  }

  sendToken(user, res);
});

const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ email, password, name });

  if (!user) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  sendToken(user, res);
});

const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if ((!name, !email, !password)) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  let data = { name, email, password };
  if (avatar) {
    //upload imgage
    data = { ...data, avatar: { public_id: "id", url: "jsnf" } };
  }

  const user = await User.findByIdAndUpdate(req.user._id, data);

  if (!user) {
    return next(new ErrorHandler("Cannot update Profile", 500));
  }

  res.status(200).json({ success: true, user });
});

const logout = expressAsyncHandler(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token", { maxAge: 0 })
    .json({ success: true, user: req.user });
});

const allUser = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("User not found in query", 404));
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const adminUpdateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, avatar, email, role } = req.body;

  if ((!name, !email, !password || !role)) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  let data = { name, email, role };
  if (avatar) {
    //upload imgage
    data = { ...data, avatar: { public_id: "id", url: "jsnf" } };
  }

  const user = await User.findByIdAndUpdate(id, data);

  if (!user) {
    return next(new ErrorHandler("Cannot update user", 500));
  }

  res.status(200).json({ success: true, user });
});

module.exports = {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  logout,
  //admin
  allUser,
  deleteUser,
  adminUpdateUser,
};
