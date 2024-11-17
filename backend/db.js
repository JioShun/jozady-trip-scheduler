const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/sql');

// Cloud SQL Proxyの設定
const connector = new Connector();

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: connector.getSocketPath({
        instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME, // Vercel環境変数に設定した接続名
    }),
});

module.exports = pool;
