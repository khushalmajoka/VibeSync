const express = require("express");
const { createRoom, joinRoom } = require("../controllers/roomController");

const router = express.Router();

router.get("/create-room", createRoom);

module.exports = router;
