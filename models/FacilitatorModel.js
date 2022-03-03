const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const facilitatorSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    assigned_to: {
      //remove this
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_assigned: {
      type: Boolean,
      default: false,
    },
    is_available: {
      type: Boolean,
      default: false,
    },
    channel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    role: {
      type: String,
      default: "facilitator",
    },
    is_verified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

facilitatorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //Encrypt password
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

facilitatorSchema.methods.isMatchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Facilitator = mongoose.model("Facilitator", facilitatorSchema);
module.exports = Facilitator;
