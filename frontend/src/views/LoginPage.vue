<template>
    <div class="login-btn">
        <!-- ログインボタン -->
        <v-btn size="x-large" rounded="lg" @click="userStore.loginUser()"
            >Googleでログイン</v-btn
        >
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
</script>

<style scoped>
.login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
