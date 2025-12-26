// backend/api/routes.js
import { db } from "../db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    // -----------------------
    // GET → Server status check
    // -----------------------
    if (req.method === "GET") {
      return res.status(200).json({ message: "Server is running ✅" });
    }

    return res.status(400).json({ message: "Invalid route ❌" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
