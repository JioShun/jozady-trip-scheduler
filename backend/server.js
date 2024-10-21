require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// 時刻を出力するロギングミドルウェア
const loggerMiddleware = function (req, res, next) {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
};

const placesRouter = require('./routes/places');
const con = require('./db');
const PORT = 3000;

app.use(loggerMiddleware); // ロギングミドルウェアの登録
app.use(express.json()); // JSONの送信を許可
app.use(express.static('public', { maxAge: 86400000 })); // 静的ファイルの提供とキャッシュの有効化
app.use(cors({ origin: 'http://localhost:8080' }));
app.use('/api/places', placesRouter);

app.listen(PORT, () => {
    console.log('Server started on port 3000');

});
