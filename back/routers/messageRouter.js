const express = require("express");
const { createMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/new", createMessage);

module.exports = router;
