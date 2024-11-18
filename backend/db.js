import mysql from 'mysql2';
import { Connector } from '@google-cloud/cloud-sql-connector';

import fs from 'fs';
import path from 'path';

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    //console.log('Service account credentials:', credentials);
    const tempPath = path.join('/tmp', 'service-account.json');
    fs.writeFileSync(tempPath, JSON.stringify(credentials));
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tempPath;
}

const connector = new Connector();

// 環境変数から設定を取得
const user = process.env.DB_USER; // データベースユーザー
const password = process.env.DB_PASS; // データベースパスワード
const database = process.env.DB_NAME; // データベース名

// Google Cloud SQL Proxyのオプションを取得
const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: 'PUBLIC', // 'PUBLIC' または 'PRIVATE' を指定
});

// MySQLコネクションプールを作成
const pool = await mysql.createPool({
    ...clientOpts, // ソケット接続情報を追加
    user: user,
    password: password,
    database: database,
});

// データベース接続をテスト
function testConnection() {
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('Failed to get a database connection:', err);
            return;
        }

        conn.query('SELECT NOW()', (queryErr, results) => {
            if (queryErr) {
                console.error('Failed to execute query:', queryErr);
            } else {
                console.log('Database connected! Current time:', results[0]['NOW()']);
            }

            // 接続を解放
            conn.release((releaseErr) => {
                if (releaseErr) {
                    console.error('Failed to release the connection:', releaseErr);
                }
            });
        });
    });
}


// テスト実行
testConnection();

// プールとコネクタのクローズ処理
process.on('SIGINT', async () => {
    console.log('Closing database connections...');
    await pool.end();
    connector.close();
    process.exit();
});

export default pool;
