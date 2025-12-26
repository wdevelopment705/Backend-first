const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Server is running");
});



router.post("/signup", (req, res) => {
  const { name, password, email } = req.body;
  const hash = bcrypt.hashSync(password, 10); // Hash the password
  db.query(
    "INSERT INTO signup (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash], () => {
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});




router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM signup WHERE email = ?", [email], (err, data) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });

    if (data.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Signin successful ✅" });
  });
});

module.exports = router;
