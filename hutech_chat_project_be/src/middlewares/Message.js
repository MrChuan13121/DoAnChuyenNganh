const AppError = require("../utils/app-error");
const firebase = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

const checkUser = async (value, req, next) => {
  console.log(value);
  var flag = 0;
  console.log(flag);
  const check = await firebase
    .database()
    .ref("chat/room-" + req.body.room + "/members");
  check.once("value", async (findUser) => {
    var quantity = findUser.numChildren();
    for (var i = 1; i <= quantity; i++) {
      const checkUser = await firebase
        .database()
        .ref("chat/room-" + req.body.room + "/members/user-" + i);
      checkUser.once("value", (result) => {
        if (result.child(id).val() === value) {
          flag = 1;
        }
      });
    }
    if (flag === 0) {
      return next(new AppError(403, "fail", "Can't send message!"));
    }
    next();
  });
};

module.exports = {
  checkUser,
};
