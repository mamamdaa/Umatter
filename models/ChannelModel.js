const mongoose = require("mongoose");

channelSchema = new mongoose.Schema({
    channel_name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;

