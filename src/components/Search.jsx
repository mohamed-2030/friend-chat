import { useContext, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import { authContext } from "../store/auth-context";

const Search = () => {
  const { currentUser } = useContext(authContext);
  const [targetUser, setTargetUser] = useState(null);
  const [err, setErr] = useState(false);
  const searchInputRef = useRef();
  const searchHandler = async () => {
    const targetUserName = searchInputRef.current.value;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", targetUserName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setTargetUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handelKey = (e) => {
    e.code === "Enter" && searchHandler();
  };
  const selectHandler = async () => {
    const combineId =
      currentUser.uid > targetUser.uid
        ? currentUser.uid + targetUser.uid
        : targetUser.uid + currentUser.uid;
    try {
      const chatsRef = doc(db, "chats", combineId);
      const res = await getDoc(chatsRef);
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combineId + ".userInfo"]: {
          uid: targetUser.uid,
          name: targetUser.name,
          photoURL: targetUser.photoURL,
        },
        [combineId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", targetUser.uid), {
        [combineId + ".userInfo"]: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combineId + ".date"]: serverTimestamp(),
      });
      setTargetUser(null);
      searchInputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="search">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handelKey}
          ref={searchInputRef}
        />
        {err && <p>User Not Found</p>}
        {targetUser && (
          <div className="searchResult" onClick={selectHandler}>
            <img src={targetUser.photoURL} />
            <span className="userName">{targetUser.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
