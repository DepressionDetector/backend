const LevelResult = require("../models/classifierResultModel");

/**
 * Save PHQ-9 level result for a session.
 * @param {number} sessionID
 * @param {{ phq9_score:number, level:string }} result
 * @param {any} [raw]
 */
async function saveLevelResult(sessionID, result, raw = null) {
    const { phq9_score, level } = result || {};
    if (typeof sessionID !== "number") throw new Error("sessionID must be a number");
    if (typeof phq9_score !== "number") throw new Error("phq9_score must be a number");
    if (!level) throw new Error("level is required");

    const doc = new LevelResult({
        sessionID,
        phq9_score,
        level,
        raw_payload: raw ?? result,
    });
    await doc.save();
    return doc;
}

/** Get all saved results for a session (latest first). */
async function getLevelResultsBySession(sessionID) {
    return await LevelResult.find({ sessionID }).sort({ createdAt: -1 });
}

module.exports = {
    saveLevelResult,
    getLevelResultsBySession,
};
