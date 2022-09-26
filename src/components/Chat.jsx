import add from "../img/add.png";
import cam from "../img/cam.png";
import more from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { chatContext } from "../store/chat-context";
const Chat = () => {
  const { chatId, user } = useContext(chatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="userName">{user ? user.name : ""}</span>
        <div className="chatIcons">
          <img src={add} />
          <img src={cam} />
          <img src={more} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
