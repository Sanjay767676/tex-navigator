import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  
  // In Vercel serverless functions, we might not have a public folder 
  // if we are serving through the Vercel edge/router, but this logic 
  // is needed for local production-like testing.
  if (process.env.NODE_ENV === "production" && !fs.existsSync(distPath)) {
     // Skip error in Vercel environment where static files are handled by the router
     if (!process.env.VERCEL) {
        throw new Error(`Could not find the build directory: ${distPath}`);
     }
  }

  app.use(express.static(distPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.resolve(distPath, "index.html"), (err) => {
      if (err) next();
    });
  });
}
