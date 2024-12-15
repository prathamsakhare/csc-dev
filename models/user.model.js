const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    phoneNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);

module.exports = User;