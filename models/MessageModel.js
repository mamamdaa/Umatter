const mongoose = require("mongoose");

messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
});


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;