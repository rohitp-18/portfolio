const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const About = require("../modals/aboutModel");

const createEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, college, marks, year, icon } = req.body;

  if (!name || !college || !marks || !year || !icon) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 403));
  }

  about.education.unshift({ name, college, marks, year, icon });

  await about.save();

  res.status(200).json({ success: true, about });
});

const sendEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 404));
  }

  res.status(200).json({ success: true, education: about.education });
});

const updateEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { req } = req.query;
  const { name, college, marks, year, icon } = req.body;

  if (!name || !college || !marks || !year || !icon) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 403));
  }

  about.education.forEach((val) => {
    if (val._id === req) {
      return req;
    }
    return val;
  });

  await about.save();

  res.status(200).json({ success: true, about });
});

const deleteEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { req } = req.query;

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 404));
  }

  about.education.filter((val) => val._id !== req);

  res.status(200).json({ success: true, about });
});

const createAbout = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    avatar,
    cvLink,
    hireLink,
    about,
    aboutImage,
    work,
    description,
    education,
  } = req.body;

  if (
    !name ||
    !avatar ||
    !cvLink ||
    !hireLink ||
    !work ||
    !about ||
    !aboutImage ||
    !description ||
    !education
  ) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  //upload images

  const aboutDoc = await About.create({
    name,
    avatar,
    cvLink,
    work,
    hireLink,
    about,
    aboutImage,
    description,
    education,
  });

  res.status(200).json({
    success: true,
    about: aboutDoc,
  });
});

module.exports = {
  createEducation,
  sendEducation,
  updateEducation,
  deleteEducation,
};
