const express = require("express");
const {
  createMessage,
  allMessage,
  readMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("", allMessage);
router.get("/user", readMessage);
router.post("/new", createMessage);

module.exports = router;
