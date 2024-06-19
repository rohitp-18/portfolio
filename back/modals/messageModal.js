const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    message: {
      type: String,
      require: [true, "message is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
