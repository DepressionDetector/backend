const { savePHQ9Answer } = require("../services/phq9Service");

const handleSavePHQ9Answer = async (req, res) => {
    const { sessionID, questionID, question, answer } = req.body;
    try {
        const saved = await savePHQ9Answer({  sessionID, questionID, question, answer });
        res.json({ success: true, saved });
    } catch (err) {
        console.error("Error saving PHQ9:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { handleSavePHQ9Answer };
