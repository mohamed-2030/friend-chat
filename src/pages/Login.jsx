import React from "react";

const Login = () => {
  return (
    <div className="fromContainer">
      <div className="fromWrapper">
        <span className="logo">Freinds Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>You don't have an account ? Register</p>
      </div>
    </div>
  );
};

export default Login;
