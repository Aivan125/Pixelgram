import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/pages/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
