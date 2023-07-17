import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}
