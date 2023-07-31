import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../components/Login/Login";
import Chat from "../components/Chat/Chat";
import App from "../components/App/App";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App/>} />
    </Routes>
  );
}
