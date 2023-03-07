import React, { Component } from "react";
import Avatar from "./Avatar";

function ChatListItems({
  idRoom,
  name,
  animationDelay,
  active,
  image,
  timed,
  lastMessage,
  index,
  setIdRoom,
}) {
  const chooseRoom = async () => {
    setIdRoom(idRoom);
  };
  const selectChat = () => {
    const element = document.getElementsByClassName("chatlist__item");
    for (let index = 0; index < element.length; index++) {
      element[index].classList.remove("active");
    }
    element[index].classList.add("active");
  };
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={() => {
        selectChat();
        chooseRoom();
      }}
      className={`chatlist__item ${active ? active : ""} `}
    >
      <Avatar image={"avatars/" + image} />

      <div className="userMeta">
        <p>{name}</p>
        <text className="lastMessage">{lastMessage}</text>
        <span className="activeTime">{timed} </span>
      </div>
    </div>
  );
}

export default ChatListItems;
