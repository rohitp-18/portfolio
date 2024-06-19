const express = require("express");
const {
  createSkill,
  allSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillsController");

const router = express.Router();

router.get("/", allSkills);
router.post("/new", createSkill);
router.route("/:id").put(updateSkill).delete(deleteSkill);

module.exports = router;
