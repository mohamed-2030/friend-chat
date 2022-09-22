import React from "react";

const Message = () => {
  return (
    <div className="message ">
      <div className="messageInfo">
        <img src="https://images.pexels.com/photos/13623424/pexels-photo-13623424.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="https://images.pexels.com/photos/13623424/pexels-photo-13623424.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
      </div>
    </div>
  );
};

export default Message;
