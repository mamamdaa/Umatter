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
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
