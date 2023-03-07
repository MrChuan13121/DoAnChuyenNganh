const firebase = require("firebase-admin");

const addPartcipant = (req) => {
  firebase
    .database()
    .ref("participants/" + req.idUser + "/" + req.idRoom)
    .set("true");
};

module.exports = {
  addPartcipant,
};
