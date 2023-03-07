const firebase = require("firebase-admin");

const getNumChild = async (req, value) => {
  const ref = await firebase.database().ref(req);
  await ref.on("value", async (data) => {
    value = await data.numChildren();
    console.log(value);
  });
  console.log(value);
};

module.exports = {
  getNumChild,
};
