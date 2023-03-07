const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { createmessage } = require("../controllFirebase/Messages");

async function createMessageItem(req, res, next) {
  try {
    createmessage({
      user: req.user,
      roomId: req.body.roomId,
      message: req.body.message,
    });
    res.status(200).send(true);
  } catch (error) {
    next(err);
  }
}

module.exports = {
  createMessageItem,
};
