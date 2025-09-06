const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sessionID: { type: Number, required: true },
    sender: {
        type: String,
        enum: ["user", "bot"],
        required: true
    },
    message: {
        type: String,
        required: true
    }, // encrypted
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Chat", chatSchema);
