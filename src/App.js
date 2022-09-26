import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { authContext } from "./store/auth-context";

function App() {
  const { currentUser } = useContext(authContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {currentUser && <Route index element={<Home />} />}
          {!currentUser && <Route index element={<Login />} />}
        </Route>
        <Route path="/register" element={<Register />} />
        {!currentUser && <Route path="/login" element={<Login />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
