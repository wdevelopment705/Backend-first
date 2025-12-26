import { db } from "../../db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed ❌" });

  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);
    const isValid = rows.length && bcrypt.compareSync(password, rows[0].password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials ❌" });
    res.status(200).json({ message: "Signin successful ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
