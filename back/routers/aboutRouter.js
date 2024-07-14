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
} = require("../controllers/aboutcontroller");

const router = express.Router();

router.get("/", getDefault);
router.post("/new", createAbout);
router.route("/:id").delete(deleteAbout).put(changeDefault);

router.route("/edu/").get(sendEducation);
router.route("/edu/new").post(createEducation);
router.route("/edu/:id").put(updateEducation).delete(deleteEducation);

module.exports = router;
