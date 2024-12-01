import { defineStore } from "pinia";
const BASE_URL = process.env.VUE_APP_LOCAL_URL;

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
            window.location.href = `${BASE_URL}/api/accounts/login`;
        },

        // ユーザ情報の取得
        async fetchUserInfo() {
            const response = await fetch(`${BASE_URL}/api/accounts/user`, {
                credentials: "include",
            });
            const data = await response.json();
            console.log(data);
            this.user = data;
        },

        // ログアウト処理
        async logoutUser() {
            const response = await fetch(`${BASE_URL}/api/accounts/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                this.user = {
                    name: null,
                    email: null,
                    picture: null,
                };
                window.location.href = "/login";
            }
        },
    },
});
