import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./store/auth-context";
import ChatProvider from "./store/chat-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChatProvider>
);
