const { query } = require("express");
const firebase = require("firebase-admin");
const { get } = require("mongoose");
const { addPartcipationRoom } = require("../controllFirebase/PartcipationRoom");
const { addPartcipant } = require("../controllFirebase/Participants");

//Tạo phòng chat mới
const addRoom = async (permission, res) => {
  const user = permission.user;
  const date = new Date();
  let ramdom = await Math.floor(Math.random() * 100000);
  let idRoom =
    "room-" +
    date.getMinutes() +
    date.getDay() +
    date.getMonth() +
    date.getFullYear() +
    ramdom;
  const ref = await firebase.database().ref("room/" + idRoom);
  var nameR = "";
  if (permission.body.nameRoom == "") {
    nameR = user.name;
  } else {
    nameR = permission.body.nameRoom;
  }
  var localeDateTime = new Date().toLocaleString();
  ref.set({
    name: nameR,
    createAt: localeDateTime,
    disable: true,
  });
  addPartcipationRoom({ idRoom: idRoom, user: user.id });
  addPartcipant({ idRoom: idRoom, idUser: user.id });
};

//Kiểm tra phòng đã tạo chưa
const checkRoom = async (req) => {
  // const userId = req.userId
  // const personnelId = req.personnelId
  // const arr1 = [];
  // const arr2 = [];
  const ref = await firebase
    .database()
    .ref("chat/participationRoom")
    .orderByValue()
    .orderByValue()
    .equalTo("635d77ba93d7694ea70c477d");
  ref.on("value", (data) => {
    console.log(data.val());
  });
  // const ref1 = await firebase.database().ref("chat/participants/"+userId);
  // ref1.on("value", (data)=>{
  //   arr1.push(data.val());
  // });
  // const ref2 = await firebase.database().ref("chat/participants/"+personnelId) ;
  // ref2.on("value", (data)=>{
  //   arr1.push(data.val());
  // });
};

//Lấy các phòng chat của user
const getAllRoomOfUser = async (req, res) => {
  const user = req.user;
  const list = [];
  const ref = await firebase.database().ref("participants/" + user.id);
  ref.on("value", (data) => {
    const value = data.val();
    Object.keys(value).map((item) => {
      list.push(item);
    });
  });
  return list;
};

module.exports = {
  addRoom,
  checkRoom,
  getAllRoomOfUser,
};
