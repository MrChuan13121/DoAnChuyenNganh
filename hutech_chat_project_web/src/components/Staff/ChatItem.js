import React, { Component } from "react";
import { useState } from "react";
import Avatar from "./Avatar";

function ChatItem({ animationDelay, user, msg, image, createAt }) {
  return (
    <div
      style={{ animationDelay: `0s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{msg}</div>
        <div className="chat__meta">
          <span>{createAt}</span>
        </div>
      </div>
      {/* {user !== "me" ? <Avatar isOnline="active" image={image} /> : null} */}
    </div>
  );
}

export default ChatItem;
