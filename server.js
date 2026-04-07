import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "stream";
import { MainApp } from "./dist/main-app.js";
import { ErrorApp } from "./dist/error-app.js";
import { renderHtmlStart, renderHtmlEnd } from "./src/htmlShell.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

function renderPage(req, res, Component) {
  console.log(`[server] Request received for ${req.path}`);
  console.log("[server] Starting SSR render");

  let didError = false;
  let didFinish = false;
  const body = new PassThrough();

  body.on("end", () => {
    if (didFinish) {
      return;
    }

    didFinish = true;
    res.end(renderHtmlEnd());
  });

  const stream = renderToPipeableStream(React.createElement(Component), {
    onShellReady() {
      console.log("[server] onShellReady");
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.write(renderHtmlStart());

      body.pipe(res, { end: false });
      stream.pipe(body);
      res.on("close", () => {
        console.log("[server] Response closed");
      });
    },
    onAllReady() {
      console.log("[server] onAllReady");
    },
    onError(error) {
      didError = true;
      console.error("[server] render error", error);
    }
  });
}

app.get("/", (req, res) => {
  renderPage(req, res, MainApp);
});

app.get("/error", (req, res) => {
  renderPage(req, res, ErrorApp);
});

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
