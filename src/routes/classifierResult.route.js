const express = require("express");
const {
    handleSaveLevelResult,
    handleGetLevelResultsBySession,
} = require("../controllers/classifierResultController");

// If you want this open (no userID), do NOT require authenticateToken here.
const router = express.Router();

router.post("/level/save", handleSaveLevelResult);
router.get("/level/session/:sessionID", handleGetLevelResultsBySession);

module.exports = router;
