const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const About = require("../modals/aboutModel");
const cloudinary = require("cloudinary").v2;

const changeDefault = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const oldAbout = await About.findOneAndUpdate(
    { show: true },
    { show: false }
  );

  if (!oldAbout) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  const about = await About.findByIdAndUpdate(id, { show: true });

  if (!about) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({
    success: true,
    about,
  });
});

const getDefault = expressAsyncHandler(async (req, res, next) => {
  const about = await About.findOne({ show: true });

  if (!about) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({
    success: true,
    about,
  });
});

const getAllAbout = expressAsyncHandler(async (req, res, next) => {
  const abouts = await About.find();

  res.status(200).json({
    success: true,
    abouts,
  });
});

const createEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, college, cgpa, percentage, year, icon } = req.body;

  if (!name || !college || !percentage || !year) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 403));
  }

  about.education.unshift({ name, college, cgpa, percentage, year, icon });

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
  const { reqId } = req.query;
  const { name, college, cgpa, percentage, year, icon } = req.body;

  if (!name || !college || !percentage || !year) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 403));
  }

  about.education.forEach((val, i) => {
    if (val._id.toString() === reqId) {
      about.education[i] = {
        _id: reqId,
        college,
        cgpa,
        percentage,
        icon,
        year,
        name,
      };
    }
  });

  await about.save();

  res.status(200).json({ success: true, about });
});

const deleteEducation = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reqId } = req.query;

  const about = await About.findById(id);

  if (!about) {
    return next(new ErrorHandler("Information not found", 404));
  }

  about.education = about.education.filter(
    (val) => val._id.toString() !== reqId.toString()
  );

  await about.save();

  res.status(200).json({ success: true, about });
});

const createAbout = expressAsyncHandler(async (req, res, next) => {
  const { name, cvLink, hireLink, about, work, description, education } =
    req.body;

  if (!name || !cvLink || !hireLink || !work || !about || !description) {
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  //upload images

  let form = { name, cvLink, hireLink, work, about, description };

  // console.log(req.files);
  if (req.files) {
    let files = [req.files["aboutImage"][0], req.files["avatar"][0]];
    files.forEach(async (file, i) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      try {
        const data = await cloudinary.uploader.upload(dataURI, {
          folder: `vip/user/${name}`,
          height: 200,
          crop: "pad",
        });
        i == 0
          ? (form = {
              ...form,
              aboutImage: data.secure_url,
            })
          : (form = {
              ...form,
              avatar: data.secure_url,
            });
      } catch (error) {
        return next(new ErrorHandler(error, 501));
      }
    });
  }

  const aboutDoc = await About.create({
    name,
    cvLink,
    work,
    hireLink,
    about,
    description,
  });

  res.status(200).json({
    success: true,
    about: aboutDoc,
  });
});

const updateAbout = expressAsyncHandler(async (req, res, next) => {
  const { name, cvLink, hireLink, about, work, description } = req.body;

  if (!name || !cvLink || !hireLink || !work || !about || !description) {
    console.log(req.body);
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  let form = { name, cvLink, hireLink, work, about, description };

  if (req.files && req.files["aboutImage"]) {
    let file = req.files["aboutImage"][0];
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    try {
      const data = await cloudinary.uploader.upload(dataURI, {
        folder: `vip/user/${name}`,
        height: 200,
        crop: "pad",
      });
      form = {
        ...form,
        aboutImage: data.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("Internal Error", 501));
    }
  }

  if (req.files["avatar"]) {
    let file = req.files["avatar"][0];
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    try {
      const data = await cloudinary.uploader.upload(dataURI, {
        folder: `vip/user/${name}`,
        height: 200,
        crop: "pad",
      });
      form = {
        ...form,
        avatar: data.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("Internal Error", 501));
    }
  }

  const aboutDoc = await About.findByIdAndUpdate(req.params.id, form);

  res.status(200).json({
    success: true,
    about: aboutDoc,
  });
});

const deleteAbout = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const about = await About.findByIdAndDelete(id);

  if (!about) {
    return next(new ErrorHandler("Invalid Id", 403));
  }

  res.status(200).json({
    success: true,
    about,
  });
});

module.exports = {
  changeDefault,
  getDefault,
  getAllAbout,
  createAbout,
  deleteAbout,
  updateAbout,

  createEducation,
  sendEducation,
  updateEducation,
  deleteEducation,
};
