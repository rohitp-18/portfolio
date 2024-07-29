const expressAsyncHandler = require("express-async-handler");
const About = require("./modals/aboutModel");
const Skill = require("./modals/skillsModal");
const Project = require("./modals/projecModal");

const meController = expressAsyncHandler(async (req, res, next) => {
  const about = await About.findOne({ show: true });
  const skills = await Skill.find();
  const project = await Project.find();

  res.status(200).json({
    success: true,
    about,
    skills,
    project,
  });
});

module.exports = { meController };
