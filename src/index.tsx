import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./utils/routes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </React.StrictMode>
);
