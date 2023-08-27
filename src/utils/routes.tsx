import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import App from "../components/App/App";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chats" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chats"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
      <Route
        path="/chats/:chatId"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
