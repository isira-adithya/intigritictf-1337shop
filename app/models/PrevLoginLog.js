const mongoose = require("mongoose")

const PrevLoginLog = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("PrevLoginLog", PrevLoginLog)