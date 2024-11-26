import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null, // ユーザー情報
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },

        loginUser() {
            window.location.href = `http://localhost:3000/api/accounts/login`;
        }
    },
});
