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
    category: {
      type: String,
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
    links: {
      linkedin: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
      host: {
        type: String,
      },
    },
    skills: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Skill",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    updatedAt: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "user",
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
