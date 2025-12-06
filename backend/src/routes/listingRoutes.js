"use strict";

const express = require("express");
const router = express.Router();

const { getListings, addListing, updateListing, removeListing, getStats } = require("../services/listingStore");
const { findById } = require("../services/userStore");
const { validateListingPayload } = require("../utils/validator");

router.get("/", async (req, res) => {
  try {
    const { mode, search, city, propertyType, bhk } = req.query;
    const data = await getListings({ mode, search, city, propertyType, bhk });
    res.json({
      ok: true,
      count: data.length,
      listings: data,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

const getCurrentUser = async (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  return findById(token);
};

router.patch("/:id", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Unauthenticated" });
    }

    const updated = await updateListing(req.params.id, req.body, user.id);
    res.json({ ok: true, listing: updated });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Unauthenticated" });
    }

    await removeListing(req.params.id, user.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

router.get("/stats", async (_req, res) => {
  try {
    const stats = await getStats();
    res.json({ ok: true, stats });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { isValid, errors } = validateListingPayload(req.body);
  if (!isValid) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    const listing = await addListing(req.body);
    res.status(201).json({ ok: true, listing });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

module.exports = router;
