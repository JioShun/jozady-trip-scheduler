import express from 'express';
import con from '../db.js';
import { OAuth2Client } from 'google-auth-library'; // OAuth2Clientのインポート

const router = express.Router(); // express.Routerのインスタンスを生成
const client = new OAuth2Client( // OAuth2Clientのインスタンスを生成
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// ログインURLの生成
router.get("/login", (req, res) => {
    try {
        const url = client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
        });
        res.redirect(url);
    } catch (error) {
        console.error("Error generating login URL:", error);
        res.status(500).json({ error: "Failed to generate login URL" });
    }
});

// Googleからのコールバック処理
router.get("/callback", async (req, res) => {
    const code = req.query.code;

    try {
        // Googleからアクセストークンを取得
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        // アクセストークンを使ってユーザー情報を取得
        const userInfoResponse = await client.request({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
        });

        const user = userInfoResponse.data;

        console.log(req.session);
        // セッションにユーザー情報を保存
        req.session.user = {
            name: user.name,
            email: user.email,
            picture: user.picture,
        };
        console.log(req.session.user);

        // 必要に応じてユーザー情報をDBに保存
        res.redirect("http://localhost:8080/");
    } catch (error) {
        console.error("Error during login callback:", error);
        res.status(500).json({ error: "Failed to log in with Google" });
    }
});

//  ユーザ情報を取得するAPI
router.get("/user", (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.json(req.session.user); // セッションからユーザー情報を返す
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// ログアウト処理
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('ログアウトエラー:', err);
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // セッションIDクッキーを削除
        res.json({ message: 'Logged out' });
    });
});


export default router;