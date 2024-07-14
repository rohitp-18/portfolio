const express = require("express");
const {
  createSkill,
  allSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillsController");
const { auth, authorizeRole } = require("../middlewares/auth");

const router = express.Router();

router.get("/", allSkills);
router.post("/new", auth, authorizeRole("admin"), createSkill);
router
  .route("/:id")
  .put(auth, authorizeRole("admin"), updateSkill)
  .delete(auth, authorizeRole("admin"), deleteSkill);

module.exports = router;
