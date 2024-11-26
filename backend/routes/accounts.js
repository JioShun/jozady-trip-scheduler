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
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        const userInfoResponse = await client.request({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
        });

        const user = userInfoResponse.data;
        // 必要に応じてユーザー情報をDBに保存（この例では省略）
        res.json({ user });
    } catch (error) {
        console.error("Error during login callback:", error);
        res.status(500).json({ error: "Failed to log in with Google" });
    }
});

export default router;