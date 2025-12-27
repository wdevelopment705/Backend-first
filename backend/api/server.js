// backend/api/status.js
import { db } from "../db.js";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await db.query("SELECT 1"); // Test DB connection
    res.status(200).json({ message: "Server and DB running ✅" });
  } catch (err) {
    res.status(500).json({ message: "DB connection failed ❌", error: err.message });
  }
}
