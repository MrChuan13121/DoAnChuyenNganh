import React, { Component, useState, createRef, useEffect } from "react";

import "../../styles/Staff/chatContent.css";
import Avatar from "../Staff/Avatar.js";
import { ADDRESS, URLIMG } from "../../dotenv";
import ChatItem from "../Staff/ChatItem";
import {
  getDatabase,
  ref,
  onValue,
  query,
  limitToLast,
  get,
  child,
  set,
  update,
} from "firebase/database";

function ChatContent({ idRoom }) {
  console.log("đa vao chat content");
  console.log(idRoom);
  const messagesEndRef = createRef(null);
  const [messages, setMessages] = useState([]);
  const [userCurren, setUser] = useState({});
  const [content, setContent] = useState("");
  console.log("user");
  console.log(userCurren.img);

  useEffect(() => {
    getMessage();
  }, [idRoom]);

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

  const convertTime = async (t) => {
    var res = "";
    const miliseconds = new Date(t).getTime();
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
  };

  async function getMessage(limit) {
    try {
      if (limit == null) {
        var quantity = 10;
      } else {
        var quantity = limit * 10;
      }
      const db = getDatabase();
      const dbRef = query(
        ref(db, "conversations/" + idRoom + "/message")
        // ,
        // limitToLast(quantity)
      );
      onValue(dbRef, (snapshot) => {
        const value = snapshot.val();
        const listMessObject = [];
        if (value != null) {
          const listMess = Object.values(value);
          listMess.reverse();
          console.log("listMess");
          console.log(listMess);
          listMess.map(async (element, index) => {
            const userId = localStorage.getItem("userId");
            const timed = await convertTime(element.time);
            if (element.userId != userId) {
              var id = 2;
            } else {
              var id = 1;
            }
            const item = {
              _id: index + 1,
              text: element.content,
              createAt: timed,
              user: {
                _id: id,
                avatar: null,
              },
            };

            listMessObject.push(item);

            if (listMessObject.length == listMess.length) {
              setMessages(listMessObject);
            }
          });
        }
      });
      const dbRefName = query(ref(db, "conversations/" + idRoom + "/people"));
      onValue(dbRefName, (snapshot) => {
        const value = snapshot.val();
        const idUser = Object.values(value);
        console.log("listIdUsser");
        console.log(idUser);
        idUser.map(async (item) => {
          if (item != localStorage.getItem("userId")) {
            const user = await getProfile(item);
            console.log("user");
            console.log(user);
            setUser(user);
          }
        });
      });
    } catch (error) {}
  }

  const sendMessage = async (content) => {
    const dt = new Date();
    const dateTime = dt.getTime();
    const userId = localStorage.getItem("userId");
    const db = getDatabase();
    const refMess = ref(db, "conversations/" + idRoom);
    const a = await get(child(refMess, "/message"));
    await set(ref(db, "conversations/" + idRoom + "/message/" + (a.size + 1)), {
      content: content,
      time: dateTime,
      type: "text",
      userId: userId,
    })
      .then(console.log("Đã gửi"))
      .catch("Thất bại");
    console.log(content);
    console.log(dateTime);

    await update(refMess, {
      lastMessage: content,
      lastTime: dateTime,
    });
  };


  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar image={"avatars/" + userCurren.img} />
            <p>{userCurren.name}</p>
          </div>
        </div>

        <div className="blocks"></div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {messages.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm._id}
                user={itm.user._id == 2 ? "other" : "me"}
                msg={itm.text}
                image={itm.user.avatar}
                createAt={itm.createAt}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage" id="sendNewMessage">
          <input
            id="inputText"
            type="text"
            placeholder="Hãy để lại lời nhắn "
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />
          <button
            className="btnSendMsg"
            id="sendMsgBtn"
            type="submit"
            onClick={() => {
              if (content !== "") {
                sendMessage(content);
                setContent("");
              }
            }}
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
