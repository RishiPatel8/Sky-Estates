"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const listingRoutes = require("./routes/listingRoutes");
const authRoutes = require("./routes/authRoutes");
const meRoutes = require("./routes/meRoutes");

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGINS = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: FRONTEND_ORIGINS,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "skyline-backend", timestamp: new Date().toISOString() });
});

app.use("/api/listings", listingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);

const frontendDist = path.join(__dirname, "..", "..", "frontend", "dist");
const hasFrontendBuild = fs.existsSync(frontendDist);

if (hasFrontendBuild) {
  app.use(express.static(frontendDist));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.use((err, _req, res, _next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ ok: false, message: "Unexpected error" });
});

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
  if (hasFrontendBuild) {
    console.log("Serving frontend from dist/ bundle");
  } else {
    console.log("Frontend dist/ not found. Run `npm run build:client` from backend to bundle the UI.");
  }
});
