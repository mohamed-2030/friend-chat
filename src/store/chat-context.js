import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { authContext } from "./auth-context";

export const chatContext = createContext({
  chatId: null,
  user: null,
  changeUser: () => {},
});

const chatReducer = (state, action) => {
  if (action.type === "CHANGE-USER") {
    return {
      user: action.payload.user,
      chatId:
        action.payload.currentUser.uid > action.payload.user.uid
          ? action.payload.currentUser.uid + action.payload.user.uid
          : action.payload.user.uid + action.payload.currentUser.uid,
    };
  }
  return {
    ...state,
  };
};

export const ChatProvider = ({ children }) => {
  const INITIAL_STATE = {
    chatId: null,
    user: null,
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const changeUserHandler = (currentUser, user) => {
    dispatch({
      type: "CHANGE-USER",
      payload: {
        currentUser,
        user,
      },
    });
  };
  const ctxValue = {
    ...state,
    changeUser: changeUserHandler,
  };

  return (
    <chatContext.Provider value={ctxValue}>{children}</chatContext.Provider>
  );
};

export default ChatProvider;
