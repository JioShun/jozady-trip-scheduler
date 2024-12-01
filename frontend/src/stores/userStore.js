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

        // ユーザ情報の取得
        async fetchUserInfo() {
            const response = await fetch(`${process.env.VUE_APP_LOCAL_URL}/api/accounts/user`);
            const data = await response.json();
            this.user = data;
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
