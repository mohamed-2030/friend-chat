import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

export const authContext = createContext({
  currentUser: null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const ctxValue = {
    currentUser: currentUser,
  };

  return (
    <authContext.Provider value={ctxValue}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
