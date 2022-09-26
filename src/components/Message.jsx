import React, { useContext } from "react";
import { authContext } from "../store/auth-context";
import { chatContext } from "../store/chat-context";

const Message = ({ message }) => {
  const { currentUser } = useContext(authContext);
  const { chatId, user } = useContext(chatContext);

  return (
    <div
      className={`message ${
        message.sender.id === currentUser.uid ? "owner" : ""
      }`}
    >
      <div className="messageInfo">
        <img src={message.sender.photoURL} />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text.trim() !== "" && <p>{message.text}</p>}
        {message.image && <img src={message.image} />}
      </div>
    </div>
  );
};

export default Message;
