import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Try multiple possible locations for the public directory
  const possiblePaths = [
    path.resolve(__dirname, "public"),         // dist/public (when running bundled)
    path.resolve(__dirname, "..", "dist", "public"), // root/dist/public (when running from server/ source)
    path.resolve(process.cwd(), "dist", "public"),   // cwd/dist/public
    path.resolve(process.cwd(), "public"),          // legacy locations
  ];

  let distPath = possiblePaths[0];
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.resolve(p, "index.html"))) {
      distPath = p;
      break;
    }
  }

  console.log(`[static] Serving static files from: ${distPath}`);
  
  if (process.env.NODE_ENV === "production" && !fs.existsSync(path.resolve(distPath, "index.html"))) {
     if (!process.env.VERCEL) {
        console.warn(`[static] WARNING: index.html not found in ${distPath}`);
     }
  }

  app.use(express.static(distPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      // If we can't find index.html, we might be in a broken build state on Vercel
      res.status(404).send("Frontend build not found. Please ensure 'npm run build' completed successfully.");
    }
  });
}
