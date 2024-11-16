require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// 時刻を出力するロギングミドルウェア
const loggerMiddleware = function (req, res, next) {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
};

// ルーティングの設定
const placesRouter = require('./routes/places');
const itinerariesRouter = require('./routes/itineraries');
const PORT = env3000;

// ミドルウェアの設定
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.static('public', { maxAge: 86400000 }));
app.use(cors({ origin: 'http://localhost:8080' }));
app.use('/api/places', placesRouter);
app.use('/api/itineraries', itinerariesRouter);

app.listen(PORT, () => {
    console.log('Server started on port 3000');

});
