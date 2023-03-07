import React, { Component, useState, useEffect } from "react";
import "../../styles/Staff/chatList.css";
import ChatListItems from "./ChatListItems";
import { ADDRESS, URLIMG } from "../../dotenv";
import {
  getDatabase,
  onValue,
  ref,
  query,
  get,
  child,
} from "firebase/database";

function ChatList({ personnel, setIdRoom }) {
  // console.log("Day la chat list");
  // console.log(personnel);
  // const allChatUsers = [
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
  //     id: 1,
  //     name: "Phù Nhựt Huỳnh",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
  //     id: 4,
  //     name: "Dương Quốc An",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
  //     id: 5,
  //     name: "Nguyễn Thành An",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
  //     id: 9,
  //     name: "Dương Thị Thu Nga",
  //     active: false,
  //     isOnline: true,
  //   },
  // ];

  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    getAllRoom();
  }, []);

  async function convertTime(miliseconds) {
    var res = "";
    const time = new Date().getTime();
    var timed = Number(time) - miliseconds;
    var secondsFloat = Number(timed) / 1000;
    var seconds = Math.floor(secondsFloat);
    if (seconds < 60) {
      res = seconds + " giây trước";
    } else if (seconds < 3600) {
      var m = Number(seconds) / 60;
      var min = Math.floor(m);
      res = min + " phút trước";
    } else if (seconds < 86400) {
      var h = seconds / 3600;
      var hour = Math.floor(h);
      res = hour + " giờ trước";
    } else if (seconds < 259200) {
      var d = seconds / 86400;
      var day = Math.floor(d);
      res = day + " ngày trước";
    } else {
      var dateTime = new Date(miliseconds);
      res =
        dateTime.getDate() +
        "/" +
        dateTime.getMonth() +
        "/" +
        dateTime.getFullYear();
    }

    return res;
  }

  async function getProfile(req) {
    const response = await fetch(ADDRESS + "user/" + req, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
    });
    const userProfile = await response.json();
    return userProfile;
  }

  async function getAllRoom() {
    try {
      const userId = personnel._id;
      const db = getDatabase();
      const countRef = query(ref(db, "users/" + userId));
      onValue(countRef, async (snapshot) => {
        const val = await snapshot.val();
        if (val != null) {
          const listTitleRoom = Object.values(val);
          var list = [];
          listTitleRoom.map((element) => {
            const refConversation = query(ref(db, "conversations/" + element));
            onValue(refConversation, async (snap) => {
              const i = snap.val().idRoom;
              var flag = 0;
              for (var j = 0; j < list.length; j++) {
                if (list[j] == i && flag == 0) {
                  list.splice(j, 1);
                  flag = 1;
                }
              }
              list.push(i);
              var listCurren = [];
              if (list.length == listTitleRoom.length) {
                for (var j = 0; j < list.length; j++) {
                  const abcf = query(ref(db, "conversations"));
                  const value = await get(child(abcf, "/" + list[j]));
                  const timedcurren = await convertTime(value.val().lastTime);
                  const nameRoomCurren = await (
                    await get(child(abcf, "/" + list[j] + "/people"))
                  ).val();

                  const listIdUser = Object.values(nameRoomCurren);
                  var idReceiver = listIdUser.filter((item) => {
                    if (item != userId) {
                      return true;
                    }
                  });
                  if (idReceiver[0] != undefined) {
                    const receiver = await getProfile(idReceiver[0]);
                    const m = {
                      idRoom: value.val().idRoom,
                      lastMessage: value.val().lastMessage,
                      timed: timedcurren,
                      lastTime: value.val().lastTime,
                      nameRoom: receiver.name,
                      avatar: receiver.img,
                    };
                    listCurren.push(m);
                  }
                }
                if (listCurren.length != 0) {
                  const listSort = listCurren.sort(
                    (a, b) => parseFloat(b.lastTime) - parseFloat(a.lastTime)
                  );
                  setListRoom(listSort);
                }
              }
            });
          });
        }
      });
    } catch (error) {}
  }

  return (
    <div className="main__chatlist">
      {/* <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button> */}
      <div className="chatlist__heading">
        <h2>Tin nhắn</h2>
      </div>
      {/* <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div> */}
      <div className="chatlist__items">
        {listRoom.map((item, index) => {
          return (
            <ChatListItems
              idRoom={item.idRoom}
              name={item.nameRoom}
              key={item.idRoom}
              index={index}
              animationDelay={index + 1}
              active={false ? "active" : ""}
              image={item.avatar}
              timed={item.timed}
              lastMessage={item.lastMessage}
              setIdRoom={setIdRoom}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
