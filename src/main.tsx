// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client"; // Import the correct createRoot API
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";

// Get the root element from the DOM
const container = document.getElementById("root");

if (container) {
  // Create a root.
  const root = createRoot(container);

  // Initial render
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Handle the error gracefully
  console.error("Could not find root element to mount to!");
}
