const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Message = require("../modals/messageModal");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

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

const allMessage = expressAsyncHandler(async (req, res, next) => {
  const messages = await Message.find().sort({ createdAt: -1 });

  res.status(200).json({ success: true, messages });
});

const readMessage = expressAsyncHandler(async (req, res, next) => {
  const client = await MongoClient.connect("mongodb://localhost:27017/");

  // const coll = client.collection("users");
  const coll = client.db("E-Commerce").collection("users");
  const cursor = coll.watch();
  // console.log("cursor", cursor);
  const messages = await cursor.toArray();
  // console.log(messages);
  await client.close();

  // const messages = await Message.find().sort({ createdAt: -1 });

  res.status(200).json({ success: true, messages });
});

const deleteMessage = expressAsyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "deleted message successfully",
  });
});

module.exports = { createMessage, allMessage, deleteMessage, readMessage };
