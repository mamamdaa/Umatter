const mongoose = require("mongoose");

messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
});


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;