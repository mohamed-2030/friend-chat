import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {
  const emailInputRef = useRef();
  const passwordlInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordlInputRef.current.value;

    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigate("/");
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
  return (
    <div className="fromContainer">
      <div className="fromWrapper">
        <span className="logo">Friends Chat</span>
        <span className="title">Login</span>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder="Email" ref={emailInputRef} />
          <input
            type="password"
            placeholder="Password"
            ref={passwordlInputRef}
          />
          <button>Sign In</button>
        </form>
        <p>
          You don't have an account ?<Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
