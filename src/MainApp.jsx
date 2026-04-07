import React, { Suspense, useEffect } from "react";
import { reportClientPhase } from "./clientPhaseReporter.jsx";

const MESSAGE = "Message from async component.";

let clientValue = null;

function readMessage() {
  if (typeof window === "undefined") {
    return MESSAGE;
  }

  if (clientValue) {
    return clientValue;
  }

  reportClientPhase("waiting");

  throw new Promise(resolve => {
    setTimeout(() => {
      clientValue = MESSAGE;
      resolve();
    }, 2500);
  });
}

function AsyncMessage() {
  const message = readMessage();

  useEffect(() => {
    reportClientPhase("resolved");
    console.log("[client] Suspense subtree hydrated");
  }, []);

  return (
    <div className="resolved">
      <div>{message}</div>
    </div>
  );
}

export function MainApp() {
  return (
    <main className="page">
      <div className="panel">
        <h1>Suspense hydration demo</h1>
        <p>
          The component below reads a promise-backed resource. On the server it is already
          resolved, but on the client it resolves after 2.5 seconds.
        </p>
        <Suspense fallback={<div className="fallback">Loading...</div>}>
          <AsyncMessage />
        </Suspense>
      </div>
    </main>
  );
}
