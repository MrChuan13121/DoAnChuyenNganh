const firebase = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { addRoom } = require("../controllFirebase/Room");

async function createRoom(req, res, next) {
  const user = req.user;
  try {
    addRoom([user, req.body.nameRoom]);
    res.status(200).json(true);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRoom,
};
