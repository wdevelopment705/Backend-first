const mysql = require('mysql2');  

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "firstbase"
});

database.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("Database connected");
    }
});

module.exports = database;
