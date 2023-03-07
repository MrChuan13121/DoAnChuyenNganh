const { model } = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = (destination) =>
  multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      console.log(file.originalname);
      return cb(null, Date.now() + file.originalname);
    },
  });

const fileUpload = (destination) =>
  multer({
    storage: storage(destination),
    limits: {
      fieldSize: 2 * 1024 * 1024, //2MB
    },
    fileFilter: (req, file, cb) => {
      console.log(file);
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("File không đúng định dạng"));
      }
    },
    onError: function (err, next) {
      return console.log("error: " + err);
      next(err);
    },
  }).single("image");

module.exports = fileUpload;
