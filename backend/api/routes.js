import { db } from "../db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") return res.status(200).json({ message: "Server is running ✅" });

    if (req.method === "POST" && req.url?.includes("signup")) {
      const { name, email, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);
      await db.query("INSERT INTO signup (name,email,password) VALUES (?,?,?)", [name,email,hash]);
      return res.status(201).json({ message: "User registered successfully ✅" });
    }

    if (req.method === "POST" && req.url?.includes("signin")) {
      const { email, password } = req.body;
      const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);
      const isValid = rows.length && bcrypt.compareSync(password, rows[0].password);
      if (!isValid) return res.status(401).json({ message: "Invalid credentials ❌" });
      return res.status(200).json({ message: "Signin successful ✅" });
    }

    return res.status(405).json({ message: "Method not allowed ❌" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
