const express = require("express");
const { handleSaveMessage, handleGetChatHistory, } = require("../controllers/chatController");

const router = express.Router();


router.post("/save", handleSaveMessage);
router.get("/history/:sessionID", handleGetChatHistory);

module.exports = router;
