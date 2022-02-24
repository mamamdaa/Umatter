const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
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
    channels:[{//implementation of groupchats? privatechats?
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    }],
    channel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    is_in_queue: {
      type: Boolean,
      default: false,
    },
    assigned_to: { //remove this
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facilitator",
    },
    is_assigned: {
      type: Boolean,
      default: false,
    }

  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next();
  }
  //Encrypt password
  const salt = await bcrypt.genSaltSync(10);
  this.password=await bcrypt.hash(this.password, salt);
});

userSchema.methods.isMatchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;
