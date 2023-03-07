const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please fill your userId"],
    },
    token: {
      type: String,
      required: [true, "Please fill your token"],
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    expireTime: {
      type: Date,
      required: [true, "Please fill expire time"],
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", userSchema);
module.exports = Auth;
