import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null, // ユーザー情報
    }),
    actions: {

        loginUser() {
            window.location.href = `http://localhost:3000/api/accounts/login`;
        },
        initializeUserFromParams() {
            const params = new URLSearchParams(window.location.search);
            this.user = {
                name: params.get("name"),
                email: params.get("email"),
                picture: params.get("picture"),
            };
        },
    },
});
