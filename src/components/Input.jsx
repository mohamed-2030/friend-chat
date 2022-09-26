import { useContext, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import attach from "../img/attach.png";
import img from "../img/img.png";
import { authContext } from "../store/auth-context";
import { chatContext } from "../store/chat-context";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../Firebase";

const Input = () => {
  const [textInput, setText] = useState("");
  const [imageInput, setImage] = useState(null);
  const { currentUser } = useContext(authContext);
  const { chatId, user } = useContext(chatContext);
  const sender = {
    id: currentUser.uid,
    photoURL: currentUser.photoURL,
    name: currentUser.displayName,
    email: currentUser.email,
  };
  const handleSend = async () => {
    const text = textInput;
    const image = imageInput;
    setImage(null);
    setText("");
    if ((text !== "" || image) && user) {
      if (image) {
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, image).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  sender,
                  date: Timestamp.now(),
                  image: downloadURL,
                }),
              });
            } catch (err) {}
          });
        });
      } else {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            sender,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
      let lastMessage;
      if (image) {
        lastMessage = "image...";
      } else lastMessage = text;
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".lastMessage"]: {
          content: lastMessage,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [chatId + ".lastMessage"]: {
          content: lastMessage,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something ..."
        onChange={(e) => setText(e.target.value)}
        value={textInput}
      />
      <div className="inputSend">
        <input
          type="file"
          id="img"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
          filename={!imageInput ? "" : imageInput}
        />
        <label htmlFor="img">
          <img src={attach} />
        </label>
        <label htmlFor="img">
          <img src={img} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
