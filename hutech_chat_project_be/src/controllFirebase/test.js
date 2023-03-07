const firebase = require("firebase-admin");

async function test(req, res) {
  const ref = await firebase
    .database()
    .ref("chat/message/ABC")
    .orderByChild("message")
    .equalTo(" CHuan......2");
  ``;
  ref.on("value", (data) => {
    console.log(data.val());
    // const result = data.val();
    // result.array.forEach((element) => {
    //   console.log(element);
    // });
  });
}

module.exports = {
  test,
};
