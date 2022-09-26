import { async } from "@firebase/util";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { chatContext } from "../store/chat-context";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId, user } = useContext(chatContext);
  useEffect(() => {
    if (chatId) {
      const getMessages = async () => {
        const chatsRef = doc(db, "chats", chatId);
        onSnapshot(chatsRef, (doc) => {
          if (doc.exists()) {
            setMessages(
              doc.data().messages.sort(function (a, b) {
                return b.date.seconds - a.date.seconds;
              })
            );
          }
        });
      };
      getMessages();
    }
   
  }, [chatId]);
  return (
    <div className="messages">
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
};

export default Messages;
