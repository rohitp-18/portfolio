const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Skill Name is required"],
    unique: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  percentage: {
    type: Number,
    require: [true, "Percentage is required"],
  },
  project: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        require: true,
      },
    },
  ],
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
