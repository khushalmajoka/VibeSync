const express = require("express");
const { createRoom, joinRoom, checkRoom } = require("../controllers/roomController");

const router = express.Router();

router.post("/create-room", createRoom);
router.post("/join-room", joinRoom);
router.post("/check-room", checkRoom);

module.exports = router;
