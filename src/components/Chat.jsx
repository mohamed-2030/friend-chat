import add from "../img/add.png";
import cam from "../img/cam.png";
import more from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="userName">Jad</span>
        <div className="chatIcons">
          <img src={add} />
          <img src={cam} />
          <img src={more} />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
