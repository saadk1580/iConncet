import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import App from "../components/App/App";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/chats" element={<App/>} />
      <Route path="/chats/:chatId"  element={<App/>} />
    </Routes>
  );
}
