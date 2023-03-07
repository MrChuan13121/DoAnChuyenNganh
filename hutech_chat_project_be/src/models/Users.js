const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập họ và tên"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Vui lòng nhập email hợp lệ"],
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: [true, "Vui lòng nhập số điện thoại"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      minLength: 6,
      select: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Vui lòng xác thực mật khẩu"],
      validate: {
        validator: function (el) {
          // "this" works only on create and save
          return el === this.password;
        },
        message: "Mật khẩu và mật khẩu xác thực không giống nhau",
      },
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "personnel", "user"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt the password using 'bcrypt'
// Mongoose -> Document Middleware
userSchema.pre("save", async function (next) {
  // check the password if it is modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

userSchema.post("save", async function (doc) {
  console.log("POst save");
  return {};
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
