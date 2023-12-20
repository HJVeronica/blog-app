import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "context/AuthContext";
import { ThemeContextProvider } from "context/ThemeContext";

import App from "App";
import "index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeContextProvider>
);
