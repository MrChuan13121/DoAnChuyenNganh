const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: [true, "Please fill your userId"],
    },
    status: {
      type: Number,
      require: [true, "Please fill status"],
    },
    date: {
      type: String,
      require: [true, "Please fill date"],
    },
    time: {
      type: String,
      require: [true, "Please fill time"],
    },
    address: {
      type: String,
      require: [true, "Please fill address"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Books", bookSchema);
module.exports = Book;
