const express = require("express");
const {
  createMessage,
  allMessage,
  deleteMessage,
  readMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", allMessage);
router.route("/:id").get(readMessage).delete(deleteMessage);
router.post("/new", createMessage);

module.exports = router;
