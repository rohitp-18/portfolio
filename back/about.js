const expressAsyncHandler = require("express-async-handler");
const About = require("./modals/aboutModel");
const Skill = require("./modals/skillsModal");
const Project = require("./modals/projecModal");
const View = require("./modals/viewModal");

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

const viewController = expressAsyncHandler(async (req, res, next) => {
  const view2 = await View.create({});

  res.status(200).json({
    success: true,
    view: view2,
    id: view2._id,
  });
});

const countViewController = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const view = await View.findById(id);

  if (!view) {
    const view2 = await View.create();

    return res.status(200).json({
      success: true,
      view: view2,
      id: view2._id,
    });
  }
  view.count = view.count + 1;
  await view.save();

  res.status(200).json({
    success: true,
    view,
  });
});

const countAdminView = expressAsyncHandler(async (req, res, next) => {
  const viewAdmin = await View.aggregate([
    {
      $group: {
        _id: "$month",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    viewAdmin,
  });
});

module.exports = {
  meController,
  viewController,
  countViewController,
  countAdminView,
};
