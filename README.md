# Suspense Example

Minimal React 18 SSR Suspense hydration demo built with Express and esbuild.

This project shows two server-rendered examples:

- `/` demonstrates a Suspense boundary that is already resolved on the server and resolves on the client after 2.5 seconds.
- `/error` demonstrates the hydration error path by updating parent state before the Suspense subtree finishes hydrating.

## Scripts

- `npm run build` builds the server and client bundles.
- `npm start` starts the Express server.
- `npm run dev` rebuilds and then starts the server.

## Run locally

```bash
npm install
npm run build
npm start
```

Open `http://localhost:3000` for the main example or `http://localhost:3000/error` for the error variant.
