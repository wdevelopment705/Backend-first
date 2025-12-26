// backend/api/routes.js
import { db } from "../db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    const { name, email, password } = req.body;

    // SIGNUP
    if (req.method === "POST" && req.url?.includes("signup")) {
      const hash = bcrypt.hashSync(password, 10);
      await db.query(
        "INSERT INTO signup (name,email,password) VALUES (?,?,?)",
        [name, email, hash]
      );
      return res.status(201).json({ message: "User registered successfully ✅" });
    }

    // SIGNIN
    if (req.method === "POST" && req.url?.includes("signin")) {
      const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);
      const isValid = rows.length && bcrypt.compareSync(password, rows[0].password);
      if (!isValid) return res.status(401).json({ message: "Invalid credentials ❌" });
      return res.status(200).json({ message: "Signin successful ✅" });
    }

    return res.status(400).json({ message: "Invalid route ❌" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
