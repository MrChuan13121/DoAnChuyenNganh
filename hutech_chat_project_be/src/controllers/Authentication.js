// const programmingLanguages = require('../services/programmingLanguages.service');
const Users = require("../models/Users");
const Auth = require("../controllers/Auth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
async function signup(req, res) {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const users = await Users.create([req?.body], { session: session });
    const user = users[0];
    const auths = await Auth.createToken(user, { session: session });

    await session.commitTransaction();

    const auth = auths[0];
    res.status(200).json({ auth: auth, status: 200 });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();

    let errors = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      console.log(errors);
      return res.status(400).json(errors);
    }

    if (error.code === 11000) {
      Object.keys(error.keyPattern).forEach((key) => {
        errors[key] = key + " is existed";
      });
      return res.status(400).send(errors);
    }

    console.error("Error: ", error);
    res.status(500).send("Something went wrong");
  }
  session.endSession();
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      await bcrypt.compare(password, user.password, async (err, result) => {
        if (!result) {
          res.status(400).send({
            status: 2,
          });
        } else {
          const auth = await Auth.createToken(user);
          res.status(200).json({ auth: auth, status: 1, role: user.role });
        }
      });
    } else {
      res.status(400).send({
        status: 3,
      });
    }
  } catch (error) {}
}

async function logout(req, res) {
  try {
    req.headers.authorization = null;
    res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  signup,
  signin,
  logout,
};
