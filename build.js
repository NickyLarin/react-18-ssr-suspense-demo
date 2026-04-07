import * as esbuild from "esbuild";

async function build() {
  await Promise.all([
    esbuild.build({
      entryPoints: ["src/client.js"],
      bundle: true,
      format: "iife",
      platform: "browser",
      target: ["es2020"],
      outfile: "public/client.js",
      loader: {
        ".js": "jsx",
        ".jsx": "jsx"
      }
    }),
    esbuild.build({
      entryPoints: ["src/MainApp.jsx"],
      bundle: true,
      format: "esm",
      platform: "node",
      target: ["node18"],
      outfile: "dist/main-app.js",
      loader: {
        ".js": "jsx",
        ".jsx": "jsx"
      },
      external: ["react"]
    }),
    esbuild.build({
      entryPoints: ["src/ErrorApp.jsx"],
      bundle: true,
      format: "esm",
      platform: "node",
      target: ["node18"],
      outfile: "dist/error-app.js",
      loader: {
        ".js": "jsx",
        ".jsx": "jsx"
      },
      external: ["react"]
    })
  ]);

  console.log("[build] Wrote public/client.js");
  console.log("[build] Wrote dist/main-app.js");
  console.log("[build] Wrote dist/error-app.js");
}

build().catch((error) => {
  console.error("[build] Failed", error);
  process.exit(1);
});
