const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Project = require("../modals/projecModal");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const uploadImage = async (error, next) => {
  await fs.readdir(
    path.resolve(path.join(__dirname, "../uploads")),
    async (err, files) => {
      if (err) {
        console.log(err);
        throw err;
      }

      Promise.all(
        await files.map(async (file) => {
          await fs.unlink(path.join(__dirname, "../uploads", file), (err) => {
            if (err) {
              console.log(err);
              throw err;
            }
          });
        })
      );
    }
  );
  if (error) {
    return next(new ErrorHandler("internal Error", 500));
  }
};

const createProject = expressAsyncHandler(async (req, res, next) => {
  const { name, description, category, skills, links } = req.body;
  // console.log(req.files);

  if (!name || !description || !req.files || !skills) {
    await uploadImage();
    return next(new ErrorHandler("Please fill all required fieald", 403));
  }

  let avatar = [];

  try {
    await Promise.all(
      req.files.map(async (image, i) => {
        const data = await cloudinary.uploader.upload(image.path, {
          folder: `portfolio/project/${name}`,
          height: 200,
          crop: "pad",
        });
        avatar[i] = { public_id: data.public_id, url: data.secure_url };
      })
    );
  } catch (error) {
    let dir = path.resolve(path.join(__dirname, "../uploads"));
    await fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`));
    return next(new ErrorHandler("Internal Error", 500));
  }
  await uploadImage();

  const project = await Project.create({
    name,
    description,
    images: avatar,
    skills,
    category,
    user: req.user._id,
    links: JSON.parse(links),
  });

  if (!project) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  res.status(200).json({
    success: true,
    project,
    message: "Project created successfully",
  });
});

const allProject = expressAsyncHandler(async (req, res, next) => {
  const projects = await Project.find().populate("skills");

  res.status(200).json({ success: true, projects });
});

const getProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    return next(new ErrorHandler("Cannot find id", 403));
  }

  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  res.status(200).json({ success: true, project });
});

const updateProject = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let { name, description, images, skills, links, imageL } = req.body;

  if (!id) {
    await uploadImage();
    return next(new ErrorHandler("Cannot find id", 403));
  }

  if (!name || !description || !skills) {
    await uploadImage();
    return next(new ErrorHandler("Please fill all required fields", 403));
  }

  let info = {
    name,
    description,
    images: [],
    skills,
    links: JSON.parse(links),
  };

  if (imageL > 1) {
    info.images = images.map((im) => JSON.parse(im));
  }
  if (imageL === "1") {
    info.images[0] = JSON.parse(images);
  }

  try {
    await Promise.all(
      req.files.map(async (image, i) => {
        const data = await cloudinary.uploader.upload(image.path, {
          folder: `portfolio/project/${name}`,
          height: 200,
          crop: "pad",
        });

        info.images[i + info.images.length] = {
          public_id: data.public_id,
          url: data.secure_url,
        };
      })
    );
  } catch (error) {
    let dir = path.resolve(path.join(__dirname, "../uploads"));
    await fs.readdirSync(dir).forEach((f) => fs.rmSync(`${dir}/${f}`));
    return next(new ErrorHandler("internal Error", 500));
  }
  await uploadImage();
  const project = await Project.findByIdAndUpdate(id, info);

  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "project updated successfully",
    project,
  });
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
  getProject,
  updateProject,
  deleteProject,
};
