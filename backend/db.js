// backend/db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

export { db };
