"use strict";

const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const USERS_PATH = path.join(__dirname, "..", "..", "data", "users.json");

let usersCache = [];
let usersLoaded = false;

const loadUsers = async () => {
  if (usersLoaded) {
    return usersCache;
  }
  try {
    const raw = await fs.readFile(USERS_PATH, "utf-8");
    usersCache = JSON.parse(raw || "[]");
  } catch (error) {
    usersCache = [];
  }
  usersLoaded = true;
  return usersCache;
};

const persistUsers = async () => {
  await fs.writeFile(USERS_PATH, JSON.stringify(usersCache, null, 2), "utf-8");
};

const findByEmail = async (email) => {
  const data = await loadUsers();
  return data.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
};

const findById = async (id) => {
  const data = await loadUsers();
  return data.find((user) => user.id === id) || null;
};

const createUser = async ({ name, email, password }) => {
  const data = await loadUsers();
  const exists = data.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("Email already registered");
  }
  const user = {
    id: uuid(),
    name,
    email,
    password, // NOTE: plaintext password for demo only; replace with a proper hash in production.
    createdAt: new Date().toISOString(),
  };
  usersCache = [...data, user];
  await persistUsers();
  return user;
};

module.exports = {
  loadUsers,
  findByEmail,
  findById,
  createUser,
};
