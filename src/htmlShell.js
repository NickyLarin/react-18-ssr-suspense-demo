export function renderHtmlStart() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React 18 Suspense Hydration Demo</title>
    <style>
      :root {
        color-scheme: light;
        font-family: "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
        background: #f4efe6;
        color: #1d1d1d;
      }

      .page {
        max-width: 960px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }

      .shell {
        max-width: 960px;
        margin: 0 auto;
        padding: 24px 20px 0;
      }

      .panel {
        background: #fffdf8;
        border: 2px solid #1d1d1d;
        border-radius: 16px;
        padding: 20px;
        margin-top: 18px;
        box-shadow: 8px 8px 0 #d7c6ab;
      }

      .phase {
        display: inline-block;
        margin-top: 8px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #f1e2c8;
        font-size: 14px;
      }

      .resolved {
        margin-top: 14px;
        padding: 14px;
        background: #dff3e4;
        border: 1px solid #2f6b3b;
        border-radius: 10px;
      }

      .version {
        margin-top: 8px;
        font-size: 14px;
      }

      .fallback {
        margin-top: 14px;
        padding: 14px;
        background: #ffe2bf;
        border: 1px dashed #965100;
        border-radius: 10px;
      }

      .trigger {
        margin-top: 12px;
        padding: 12px 16px;
        border: 2px solid #1d1d1d;
        border-radius: 12px;
        background: #1d1d1d;
        color: #fffdf8;
        font: inherit;
        cursor: pointer;
      }

      .hint {
        margin: 12px 0 0;
        font-size: 14px;
      }

      .client-status {
        display: grid;
        gap: 6px;
        background: #fff7d6;
        border: 2px solid #a26a00;
        border-radius: 16px;
        padding: 14px 16px;
        box-shadow: 8px 8px 0 #e7d9a7;
      }

      .client-status strong {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .client-status[data-phase="hydrated"] {
        background: #def2df;
        border-color: #2f6b3b;
        box-shadow: 8px 8px 0 #bfdcbf;
      }

      .client-status[data-phase="resolved"] {
        background: #def2df;
        border-color: #2f6b3b;
        box-shadow: 8px 8px 0 #bfdcbf;
      }

      code {
        background: #efe7d7;
        padding: 2px 4px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="client-status" id="client-status" data-phase="server">
        <strong>Client status</strong>
        <div id="client-status-text">
          Server HTML is on the page. Client hydration has not started yet.
        </div>
      </div>
    </div>
    <div id="root">`;
}

export function renderHtmlEnd() {
  return `</div>
    <script src="/client.js"></script>
  </body>
</html>`;
}
