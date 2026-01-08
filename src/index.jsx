import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import { mcpClient } from "./mcp/client.js";
import "./styles/index.css";

// Initialize MCP client
mcpClient.init().catch(console.error);

// Mount React app
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Register service worker for PWA (if enabled)
if ("serviceWorker" in navigator && import.meta.env?.ENABLE_PWA === "true") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
