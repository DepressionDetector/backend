const { savePHQ9Answer, getAllPHQ9Answers } = require("../services/phq9Service");

const handleSavePHQ9Answer = async (req, res) => {
    const { sessionID, questionID, question, answer } = req.body;
    try {
        const saved = await savePHQ9Answer({ sessionID, questionID, question, answer });
        res.json({ success: true, saved });
    } catch (err) {
        console.error("Error saving PHQ9:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

const handleGetAllPHQ9Answers = async (req, res) => {
    try {
        const answers = await getAllPHQ9Answers();
        res.json({ success: true, answers });
    } catch (err) {
        console.error("Error fetching PHQ9 answers:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { handleSavePHQ9Answer, handleGetAllPHQ9Answers };
