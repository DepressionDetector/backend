const ChatSession = require("../models/chatSessionModel");

// Global in-memory counter for anonymous sessions
let globalSessionCounter = 0;

/**
 * Create a new session (anonymous, no userID required)
 * @returns {Promise<number>} The sessionID of the newly created session
 */
async function createSession() {
    // Get latest session from DB if counter is 0
    if (globalSessionCounter === 0) {
        const latestSession = await ChatSession.findOne().sort({ sessionID: -1 });
        globalSessionCounter = latestSession ? latestSession.sessionID : 0;
    }

    // Increment the counter
    globalSessionCounter++;

    // Create and save new session
    const session = new ChatSession({ sessionID: globalSessionCounter });
    await session.save();

    return session.sessionID;
}

module.exports = { createSession };
