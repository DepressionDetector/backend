const express = require("express");
const { handleGenerateSessionSummary, handleGetSessionSummaries } = require("../controllers/sessionSummaryController");

const router = express.Router();

router.post("/generate-summary", handleGenerateSessionSummary);
router.get("/session-summaries",handleGetSessionSummaries);

module.exports = router;