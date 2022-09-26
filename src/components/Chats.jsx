import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { authContext } from "../store/auth-context";
import { chatContext } from "../store/chat-context";

const Chats = () => {
  const [chatUsers, setChatsUser] = useState([]);
  const { currentUser } = useContext(authContext);
  const { changeUser } = useContext(chatContext);
  useEffect(() => {
    const getData = async () => {
      onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const dataArray = Object.entries(doc.data());
        const dataFormat = dataArray.map((item) => {
          return {
            uid: item[0],
            date: item[1].date,
            ...item[1].userInfo,
            lastMessage: item[1].lastMessage?.content,
          };
        });

        const sortedData = dataFormat.sort(function (a, b) {
          return b.date.seconds - a.date.seconds;
        });
        setChatsUser(sortedData);
      });
    };
    getData();
  }, [currentUser.uid]);

  return (
    <ul className="chats">
      {chatUsers.length !== 0 &&
        chatUsers.map((chatUser) => {
          return (
            <li
              className="chatItem"
              key={chatUser.uid}
              onClick={() => changeUser(currentUser, chatUser)}
            >
              <img src={chatUser.photoURL} />
              <div className="user-info">
                <span className="userName">{chatUser.name}</span>
                <span className="lastMessage">
                  {chatUser.lastMessage ? chatUser.lastMessage : ""} 
                </span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Chats;
