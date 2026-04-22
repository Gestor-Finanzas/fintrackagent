import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import "./chartSetup";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
