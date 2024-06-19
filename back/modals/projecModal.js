const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    skills: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
        },
      },
    ],
    updatedAt: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
        },
        date: {
          type: Date,
          default: new Date(Date.now()),
        },
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
