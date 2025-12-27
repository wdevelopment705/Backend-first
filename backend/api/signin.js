// backend/api/signin.js
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const body = req.body || {};
  const { email, password } = body;

  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);

    if (rows.length === 0) return res.status(401).json({ message: "Invalid email or password ❌" });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid email or password ❌" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful ✅",
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error("Signin failed:", err);
    return res.status(500).json({ message: "Server error ❌" });
  }
}
