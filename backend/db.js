import mysql from "mysql2/promise";

let db;

if (!db) {
  db = mysql.createPool({
    host: process.env.DB_HOST,             // Railway host
    user: process.env.DB_USER,             // Railway user
    password: process.env.DB_PASSWORD,     // Railway password
    database: process.env.DB_NAME,         // Railway database
    port: Number(process.env.DB_PORT),     // Railway port (number)
    ssl: { rejectUnauthorized: false },    // SSL required for Railway
    waitForConnections: true,
    connectionLimit: 5,
    connectTimeout: 10000,                 // 10 sec
  });
}

export { db };
