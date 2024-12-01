// src/routes/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SchedulePage from '@/views/SchedulePage.vue';


const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/schedule/:itineraryId',
        component: SchedulePage,
        name: 'schedule',
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// piniaが使えないから一旦これで代用
async function isAuthenticated() {
    try {
        const response = await fetch('http://localhost:3000/api/accounts/user', {
            method: 'GET',
            credentials: 'include', // セッション情報を含める
        });
        if (response.ok) {
            return true; // ログイン中
        } else {
            return false; // 未ログイン
        }
    } catch (error) {
        console.error('ログイン確認エラー:', error);
        return false;
    }
}

// ナビゲーションガードを設定
router.beforeEach(async (to, from, next) => {
    if (to.name === 'login') {
        next(); // ログイン画面は常に許可
    } else {
        const loggedIn = await isAuthenticated();
        if (loggedIn) {
            next(); // ログイン中はそのまま遷移
        } else {
            next({ name: 'login' }); // 未ログインはログイン画面にリダイレクト
        }
    }
});

export default router;
