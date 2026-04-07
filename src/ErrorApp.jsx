import React, { Suspense, useEffect, useState } from "react";
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

function AsyncMessage({ version }) {
  const message = readMessage();

  useEffect(() => {
    reportClientPhase("resolved");
    console.log("[client] Suspense subtree hydrated");
  }, []);

  return (
    <div className="resolved">
      <div>{message}</div>
      <div className="version">Render version: {version}</div>
    </div>
  );
}

export function ErrorApp() {
  const [version, setVersion] = useState(0);

  return (
    <main className="page">
      <div className="panel">
        <h1>Suspense hydration error demo</h1>
        <p>
          This variant adds a parent state update before the Suspense subtree hydrates so you can
          trigger the hydration error path.
        </p>
        <button className="trigger" onClick={() => setVersion(current => current + 1)} type="button">
          Update App state before Suspense hydrates
        </button>
        <p className="hint">
          Click the button during the 2.5 second wait. It updates parent state and pushes a new
          prop into the still-hydrating Suspense boundary.
        </p>
        <Suspense fallback={<div className="fallback">Loading...</div>}>
          <AsyncMessage version={version} />
        </Suspense>
      </div>
    </main>
  );
}
