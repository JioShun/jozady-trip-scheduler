const mysql = require('mysql2');

// MySQL接続
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'schedule_db'
});

// MySQL接続確認
con.connect((err) => {
    if (err) throw err
    console.log('Connected!');
});

module.exports = con;