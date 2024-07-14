const express = require("express");
const { auth, authorizeRole } = require("../middlewares/auth");
const {
  getUser,
  loginUser,
  registerUser,
  logout,
  updateUser,
  allUser,
  adminUpdateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", auth, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", auth, logout);
router.put("/update", auth, updateUser);

router.get("/admin", allUser);
router
  .route("/admin/:id")
  .put(auth, authorizeRole("admin"), adminUpdateUser)
  .delete(auth, authorizeRole("admin"), deleteUser);

module.exports = router;
