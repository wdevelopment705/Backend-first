import { db } from "../db.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed ❌" });

  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    await db.query("INSERT INTO signup (name,email,password) VALUES (?,?,?)", [name, email, hash]);
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
