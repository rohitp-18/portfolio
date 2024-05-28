const mongoose = require("mongoose");

const mongod = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = mongod;
