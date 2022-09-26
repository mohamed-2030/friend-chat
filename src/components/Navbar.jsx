import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { authContext } from "../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(authContext);
  const currentUser = authCtx.currentUser;
  const clickHandler = () => {
    signOut(auth);
  };
  return (
    <div className="navbar">
      <span className="logo">Friends Chat</span>
      <div className="userInfo">
        <img src={currentUser.photoURL} />
        <span className="userName">{currentUser.displayName}</span>
        <button onClick={clickHandler}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
