import 'dotenv/config'; // dotenvの設定
import express from 'express'; // expressのインポート
import session from 'express-session'; // express-sessionのインポート
import cors from 'cors'; // corsのインポート
const app = express();



// 時刻を出力するロギングミドルウェア
const loggerMiddleware = function (req, res, next) {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
};

// ルーティングの設定
import placesRouter from './routes/places.js';
import itinerariesRouter from './routes/itineraries.js';
import accountsRouter from './routes/accounts.js';
const PORT = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.static('public', { maxAge: 86400000 }));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use('/api/places', placesRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/accounts', accountsRouter);

app.listen(PORT, () => {
    console.log('Server started on port 3000');

});
