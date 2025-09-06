
const mongoose = require("mongoose");

const sessionSummarySchema = new mongoose.Schema({
    sessionID: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("SessionSummary", sessionSummarySchema);
