// backend/api/signup.js
import { db } from "../db.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const body = req.body || {};
  const { name, email, password } = body;

  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO signup (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "Signup successful ✅", id: result.insertId });
  } catch (err) {
    console.error("Signup failed:", err);
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists ❌" });
    return res.status(500).json({ message: "Server error ❌" });
  }
}
