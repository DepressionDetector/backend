
const Chat = require("../models/chatModel");
const SessionSummary = require("../models/sessionSummaryModel");
const { decrypt, encrypt } = require("../utils/chatEncryption");
const axios = require("axios");

async function generateAndSaveSessionSummary(sessionID) {
    const chats = await Chat.find({ sessionID }).sort({ timestamp: 1 });

    const fullChat = chats.map(chat => {
        const decryptedMessage = decrypt(chat.message);
        return `${chat.sender}: ${decryptedMessage}`;
    }).join("\n");

    const response = await axios.post("http://127.0.0.1:8000/summarize", {
    history: fullChat,
});


    const summaryText = response.data.summary;
    const encryptedSummary = encrypt(summaryText);

    const sessionSummary = new SessionSummary({
        sessionID,
        summary: encryptedSummary,
    });

    await sessionSummary.save();
    return summaryText;
}

async function getSessionSummariesByUserID() {
    const summaries = await SessionSummary.find();
    return summaries.map(summary => decrypt(summary.summary));
}

module.exports = { generateAndSaveSessionSummary, getSessionSummariesByUserID };
