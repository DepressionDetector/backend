
const { saveMessage, getSessionMessages } = require("../services/chatService");

const handleSaveMessage = async (req, res) => {
    try {
        const { message, sessionID } = req.body;
        const sender = req.body.sender || "user";

        await saveMessage({ sessionID, sender, message });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to save chat message" });
    }
};

const handleGetChatHistory = async (req, res) => {
    try {
        const { sessionID } = req.params;

        const history = await getSessionMessages(sessionID, 20);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
};


module.exports = {
    handleSaveMessage,
    handleGetChatHistory,
};
