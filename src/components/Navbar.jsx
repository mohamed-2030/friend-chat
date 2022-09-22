import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Freind Chat</span>
      <div className="userInfo">
        <img src="https://images.pexels.com/photos/13623557/pexels-photo-13623557.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        <span className="userName">Jad</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
