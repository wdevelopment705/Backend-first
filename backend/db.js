import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,       // Railway MYSQLHOST
  user: process.env.DB_USER,       // Railway MYSQLUSER
  password: process.env.DB_PASSWORD, // Railway MYSQLPASSWORD
  database: process.env.DB_NAME,   // Railway MYSQLDATABASE
  port: process.env.DB_PORT,       // Railway MYSQLPORT
  waitForConnections: true,
  connectionLimit: 10,
});
