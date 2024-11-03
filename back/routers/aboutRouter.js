const express = require("express");
const {
  getDefault,
  createEducation,
  createAbout,
  sendEducation,
  updateEducation,
  deleteEducation,
  deleteAbout,
  changeDefault,
  updateAbout,
  getAllAbout,
} = require("../controllers/aboutcontroller");
const { auth, authorizeRole } = require("../middlewares/auth");
const upload = require("../config/multer");

const router = express.Router();

router.use(auth);

router.get("/", getAllAbout);
router.get("/default", getDefault);
router.post(
  "/new",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
  ]),
  createAbout
);
router.get("/change/:id", changeDefault);
router
  .route("/:id")
  .delete(deleteAbout)
  .put(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "aboutImage", maxCount: 1 },
    ]),
    updateAbout
  );

router.route("/edu/new/:id").post(createEducation);
router.route("/edu/:id").get(sendEducation);
router.route("/edu/:id").put(updateEducation).delete(deleteEducation);

module.exports = router;
