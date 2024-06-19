const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Message = require("../modals/messageModal");

const createMessage = expressAsyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  const mmessage = await Message.create({ name, email, message });

  if (!mmessage) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({ success: true, message: mmessage });
});

module.exports = { createMessage };
