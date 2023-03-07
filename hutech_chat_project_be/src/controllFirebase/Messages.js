const firebase = require("firebase-admin");
const { addPartcipationRoom } = require("../controllFirebase/PartcipationRoom");
const { addPartcipant } = require("../controllFirebase/Participants");

//Gửi tin nhắn
const createmessage = async (req) => {
  const ref = await firebase.database().ref("message/" + req.roomId);
  ref.once("value", async (data) => {
    const value = await firebase
      .database()
      .ref("message/" + req.roomId + "/" + (data.numChildren() + 1));
    var localeDateTime = new Date().toLocaleString();
    value.set({
      message: req.message,
      userId: req.user.id,
      createAt: localeDateTime,
    });
  });
};

//Lấy danh sách tin nhắn của người dùng
const getDataRoom = async (req, res) => {};

module.exports = {
  createmessage,
};
