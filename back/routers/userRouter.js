const express = require("express");

const { auth } = require("../middlewares/auth");
const { getUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", loginUser);

module.exports = router;
