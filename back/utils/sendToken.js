const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const sendToken = expressAsyncHandler(async (user, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE + "d",
  });

  res
    .status(200)
    .cookie("token", token, {
      maxAge: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .json({
      success: true,
      user,
    });
});

module.exports = sendToken;
