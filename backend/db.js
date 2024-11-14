const mysql = require('mysql2');

// MySQL接続
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// MySQL接続確認
con.connect((err) => {
    if (err) throw err
    console.log('Connected!');
});

module.exports = con;