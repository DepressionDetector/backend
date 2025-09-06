const PHQ9Response = require("../models/phq9Model");
const questions = require("../utils/phq9Questions");

function getScoreFromAnswer(answer) {
    const norm = answer.toLowerCase();
    if (norm.includes("not at all")) return 0;
    if (norm.includes("several")) return 1;
    if (norm.includes("more than")) return 2;
    if (norm.includes("nearly every")) return 3;
    return -1; // unknown
}

async function savePHQ9Answer({ sessionID, questionID, question, answer }) {
    const score = getScoreFromAnswer(answer);
    const entry = new PHQ9Response({ sessionID, questionID, question, answer, score });
    await entry.save();
    return entry;
}

async function getAskedPHQ9IDs(sessionID) {
    const entries = await PHQ9Response.find({ sessionID });
    return entries.map(e => e.questionID);
}

function getNextPHQ9Question(askedIDs) {
    return questions.find(q => !askedIDs.includes(q.id)) || null;
}

module.exports = { getScoreFromAnswer, savePHQ9Answer, getAskedPHQ9IDs, getNextPHQ9Question };