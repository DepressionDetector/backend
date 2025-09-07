const {
    saveLevelResult,
    getLevelResultsBySession,
} = require("../services/classifierResultService");

const handleSaveLevelResult = async (req, res) => {
    try {
        // Accept either flattened body or nested {result}
        const { sessionID, phq9_score, level, result } = req.body || {};
        const payload = result ?? { phq9_score, level };

        if (typeof sessionID !== "number" || !payload) {
            return res
                .status(400)
                .json({ success: false, error: "sessionID and (phq9_score, level) are required" });
        }

        const saved = await saveLevelResult(sessionID, payload);
        return res.status(201).json({ success: true, id: saved._id });
    } catch (err) {
        console.error("Failed to save level result:", err);
        return res.status(500).json({ success: false, error: "Failed to save level result" });
    }
};

const handleGetLevelResultsBySession = async (req, res) => {
    try {
        const sessionID = Number(req.params.sessionID);
        if (!Number.isFinite(sessionID)) {
            return res.status(400).json({ success: false, error: "Invalid sessionID" });
        }
        const data = await getLevelResultsBySession(sessionID);
        return res.status(200).json({ results: data });
    } catch (err) {
        console.error("Failed to fetch level results:", err);
        return res.status(500).json({ success: false, error: "Failed to fetch level results" });
    }
};

module.exports = {
    handleSaveLevelResult,
    handleGetLevelResultsBySession,
};
