const mongoose = require("mongoose");

const levelResultSchema = new mongoose.Schema(
    {
        sessionID: { type: Number, required: true },
        phq9_score: { type: Number, required: true, min: 0, max: 27 },
        level: {
            type: String,
            required: true,
            enum: ["Minimal", "Mild", "Moderate", "Moderately Severe", "Severe"],
        },
        // Optional trace/debug
        raw_payload: { type: mongoose.Schema.Types.Mixed },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("LevelResult", levelResultSchema, "levelResults");
