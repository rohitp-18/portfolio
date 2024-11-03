const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 1,
    },
    month: {
      type: String,
      default: `${new Date(Date.now()).getMonth()}-${new Date(
        Date.now()
      ).getFullYear()}`,
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const View = mongoose.model("View", viewSchema);

module.exports = View;
