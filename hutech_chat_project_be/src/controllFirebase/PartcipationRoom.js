const firebase = require("firebase-admin");

const addPartcipationRoom = (req) => {
  firebase
    .database()
    .ref("participationRoom/" + req.idRoom + "/" + req.user)
    .set("true");
};

module.exports = {
  addPartcipationRoom,
};
