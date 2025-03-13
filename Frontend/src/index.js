import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // If you have any global styles

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create root
root.render(  // Use the new render method
  <React.StrictMode>
    <App />
  </React.StrictMode>
);