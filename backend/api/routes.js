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

    // -----------------------
    // POST → Signup
    // -----------------------
    if (req.method === "POST" && req.body.action === "signup") {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required ❌" });
      }

      const hash = bcrypt.hashSync(password, 10);
      await db.query(
        "INSERT INTO signup (name,email,password) VALUES (?,?,?)",
        [name, email, hash]
      );

      return res.status(201).json({ message: "User registered successfully ✅" });
    }

    // -----------------------
    // POST → Signin
    // -----------------------
    if (req.method === "POST" && req.body.action === "signin") {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required ❌" });
      }

      const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);
      if (!rows.length) return res.status(401).json({ message: "Invalid credentials ❌" });

      const isValid = bcrypt.compareSync(password, rows[0].password);
      if (!isValid) return res.status(401).json({ message: "Invalid credentials ❌" });

      return res.status(200).json({ message: "Signin successful ✅" });
    }

    // -----------------------
    // Any other route/method
    // -----------------------
    return res.status(400).json({ message: "Invalid route ❌" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
