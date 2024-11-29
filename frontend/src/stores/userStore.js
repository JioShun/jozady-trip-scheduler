import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            name: null,
            email: null,
            picture: null,
        }, // ユーザー情報
    }),
    actions: {
        // ログイン状態を確認
        isLogin() {
            return this.user.name !== null;
        },

        // ログイン処理
        loginUser() {
            window.location.href = `${process.env.VUE_APP_LOCAL_URL}/api/accounts/login`;
        },

        // ログイン情報の取得
        initializeUserFromParams() {
            const params = new URLSearchParams(window.location.search);
            this.user = {
                name: params.get("name"),
                email: params.get("email"),
                picture: params.get("picture"),
            };
        },

        // ログアウト処理（簡易版）
        logoutUser() {
            this.user = {
                name: null,
                email: null,
                picture: null,
            };
        },
    },
});
