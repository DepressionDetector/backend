const express = require("express");
const { handleCreateSession, handleEndSession } = require("../controllers/sessionController");

const router = express.Router();

// Route to create new session per user
router.post("/start", handleCreateSession);
router.post("/end",  handleEndSession);

module.exports = router;
