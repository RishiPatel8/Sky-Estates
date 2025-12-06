"use strict";

const express = require("express");
const router = express.Router();

const { findById } = require("../services/userStore");
const { getListings } = require("../services/listingStore");

// Helper to resolve current user from Authorization: Bearer <userId>
const getCurrentUser = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  return findById(token);
};

router.get("/activity", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Unauthenticated" });
    }

    const listings = await getListings();
    const mine = listings.filter((item) => item.ownerId === user.id);

    const summary = mine.reduce(
      (acc, item) => {
        acc.count += 1;
        acc.modes[item.mode] = (acc.modes[item.mode] || 0) + 1;
        return acc;
      },
      { count: 0, modes: {} }
    );

    return res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email }, summary, listings: mine });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
});

module.exports = router;
