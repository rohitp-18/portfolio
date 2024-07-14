const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Skill = require("../modals/skillsModal");

const createSkill = expressAsyncHandler(async (req, res, next) => {
  const { name, percentage, icon } = req.body;

  if (!name || !percentage || !icon) {
    return next(new ErrorHandler("Please fill all required fields"), 403);
  }

  const skill = await Skill.create({ name, percentage, icon });

  if (!skill) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({
    success: true,
    message: `${skill.name} skill created successfully`,
    skill,
  });
});

const allSkills = expressAsyncHandler(async (req, res, next) => {
  const skills = await Skill.find();

  res.status(200).json({
    success: true,
    skills,
  });
});

const deleteSkill = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Cannot find Id", 403));
  }

  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${skill.name} skill deleted successfully`,
    skill,
  });
});

const updateSkill = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, percentage, icon } = req.body;

  if (!name || !percentage || !icon) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  if (!id) {
    return next(new ErrorHandler("cannot find id", 403));
  }

  const skill = await Skill.findByIdAndUpdate(id, {
    name,
    percentage,
    icon,
  });

  if (!skill) {
    return next(new ErrorHandler("Skill not found", 404));
  }

  res.status(200).json({
    success: true,
    message: `${skill.name} skill updated successfully`,
    skill,
  });
});

module.exports = { createSkill, allSkills, deleteSkill, updateSkill };
