const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Project = require("../modals/projecModal");

const createProject = expressAsyncHandler(async (req, res, next) => {
  const { name, description, images, skills } = req.body;
  console.log(req.body);

  if (!name || !description || !images || !skills) {
    return next(new ErrorHandler("Please fill all required fieald", 403));
  }

  const project = await Project.create({ name, description, images, skills });

  if (!project) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

const allProject = expressAsyncHandler(async (req, res, next) => {
  const project = await Project.find();

  res.status(200).json({ success: true, project });
});

const updateProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, images, skills } = req.body;

  if (id) {
    return next(new ErrorHandler("Cannot find id", 403));
  }

  if (!name || !description || !skills) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  let data = { name, description, skills };

  if (images) {
    // upload images
    data = { ...data, images };
  }

  const project = await Project.findByIdAndUpdate(id, data);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({ success: true, project });
});

const deleteProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Connot find Id", 403));
  }

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({ success: true, project });
});

module.exports = {
  createProject,
  allProject,
  updateProject,
  deleteProject,
};
