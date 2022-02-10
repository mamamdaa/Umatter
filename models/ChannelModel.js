const mongoose = require("mongoose");

channelSchema = new mongoose.Schema({
    channel_name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facilitator",
        required: true,
    },
    users: [    //clean this, deprecated
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;

