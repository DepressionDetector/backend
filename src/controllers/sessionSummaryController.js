const {
  generateAndSaveSessionSummary,
  getSessionSummariesByUserID,
} = require("../services/sessionSummaryService");

const handleGenerateSessionSummary = async (req, res) => {
  const { sessionID } = req.body;

  try {
    const summary = await generateAndSaveSessionSummary(sessionID);
    res.status(200).json({ success: true, summary });
  } catch (err) {
    console.error("Failed to generate session summary:", err);
    res
      .status(500)
      .json({ success: false, error: "Summary generation failed" });
  }
};

const handleGetSessionSummaries = async (req, res) => {
  try {
    const summaries = await getSessionSummariesByUserID();
    res.status(200).json({ summaries });
  } catch (err) {
    console.error("Failed to fetch session summaries:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch summaries" });
  }
};

module.exports = { handleGenerateSessionSummary, handleGetSessionSummaries };
