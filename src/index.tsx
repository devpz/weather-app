import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.scss";

const root = document.getElementById("root");
const rootInstance = createRoot(root!);
rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
