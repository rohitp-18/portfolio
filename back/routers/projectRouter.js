const express = require("express");
const {
  createProject,
  allProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { auth, authorizeRole } = require("../middlewares/auth");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", allProject);
router.post(
  "/new",
  auth,
  authorizeRole("admin"),
  upload.array("images"),
  createProject
);
router
  .route("/:id")
  .get(getProject)
  .put(auth, upload.array("newImages"), authorizeRole("admin"), updateProject)
  .delete(auth, authorizeRole("admin"), deleteProject);

module.exports = router;
