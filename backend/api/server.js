// backend/api/status.js
import { db } from "../db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed ❌" });
  }

  try {
    await db.query("SELECT 1"); // Check DB connection
    res.status(200).json({ message: "Server and DB are running ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server running, but DB connection failed ❌", error: err.message });
  }
}
