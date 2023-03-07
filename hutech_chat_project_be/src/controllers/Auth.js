const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { generateAccessToken, expireTime } = require("../utils/token");
const Users = require("../models/Users");
const Auth = require("../models/Auth");
const AppError = require("../utils/app-error");

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(token);
    if (!token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue"
        ),
        req,
        res,
        next
      );
    }

    // 2) Verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) check if the user is exist (not deleted)
    const user = await Users.findById(decode.id);
    console.log(user);
    if (!user) {
      return next(
        new AppError(401, "fail", "This user is no longer exist"),
        req,
        res,
        next
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.createToken = async (user, opts = {}) => {
  try {
    const userId = user._id;
    return Auth.create(
      [
        {
          userId: userId,
          token: generateAccessToken(userId),
          expireTime: expireTime(),
        },
      ],
      opts
    );
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
