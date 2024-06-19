const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  work: [
    {
      type: String,
      require: true,
    },
  ],
  description: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  cvLink: {
    type: String,
  },
  hireLink: {
    type: String,
  },
  about: {
    type: String,
  },
  aboutImage: {
    type: String,
  },
  education: [
    {
      name: {
        type: String,
        require: true,
      },
      college: {
        type: String,
        require: true,
      },
      marks: {
        type: Number,
        require: true,
      },
      year: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
  ],
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
