import React, { Component } from "react";
import "../../styles/Staff/chatBody.css";
import ChatList from "./ChatList";
import ChatContent from "../../components/Staff/ChatContent";
import { useState } from "react";

function ChatBody({ personnel }) {
  const [idRoom, setIdRoom] = useState();
  return (
    <div className="main__chatbody">
      <ChatList personnel={personnel} setIdRoom={setIdRoom} />
      {idRoom !== undefined ? <ChatContent idRoom={idRoom} /> : null}
    </div>
  );
}

export default ChatBody;
