import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AddImg from "../img/addAvatar.png";
import { auth, db, storage } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Register = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const userImage = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const storageRef = ref(storage, `${enteredName} ${res.user.uid}`);
      await uploadBytesResumable(storageRef, userImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: enteredName,
              photoURL: downloadURL,
            });
            //create users doc in firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name: enteredName,
              email: enteredEmail,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");

            //create empty user chats on firestore
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="fromContainer">
      <div className="fromWrapper">
        <span className="logo">Friends Chat</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Name" ref={nameInputRef} />
          <input type="email" placeholder="Email" ref={emailInputRef} />
          <input
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={AddImg} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <p style={{ color: "red" }}>Something went wrong</p>}
        </form>
        <p>
          You do have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
