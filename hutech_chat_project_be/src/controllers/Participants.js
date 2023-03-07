const firebase = require("firebase-admin");

async function creatPartipant(req, res, next) {
  const user = req.user;
  const ref = await firebase.database().ref("chat/participants/" + user.id);
  ref.on("value", async (data) => {
    var v = (await data.numChildren()) + 1;
    ref.push({ v: req.body.roomId });
  });
}
