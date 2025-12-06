"use strict";

const express = require("express");
const router = express.Router();

const { findByEmail, findById, createUser } = require("../services/userStore");

// Very lightweight token model: token is just the user id.
// This is NOT secure and is only for demo / prototype use.

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "name, email and password are required" });
    }
    const user = await createUser({ name, email, password });
    return res.status(201).json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
      token: user.id,
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "email and password are required" });
    }
    const user = await findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }
    return res.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
      token: user.id,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ ok: false, message: "Missing auth token" });
    }
    const user = await findById(token);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Invalid auth token" });
    }
    return res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

module.exports = router;
