import React from "react";
import { hydrateRoot } from "react-dom/client";
import { MainApp } from "./MainApp.jsx";
import { ErrorApp } from "./ErrorApp.jsx";
import { updateStatus } from "./status.js";

function getAppForPath(pathname) {
  if (pathname === "/error") {
    return ErrorApp;
  }

  return MainApp;
}

const App = getAppForPath(window.location.pathname);

console.log("[client] Hydration script loaded");
console.log("[client] Starting hydrateRoot");

updateStatus("booting");
window.addEventListener("suspense-status", event => {
  updateStatus(event.detail.phase);
});

hydrateRoot(document.getElementById("root"), React.createElement(App), {
  onRecoverableError(error, errorInfo) {
    console.error("[client] onRecoverableError", error, errorInfo);
  }
});
