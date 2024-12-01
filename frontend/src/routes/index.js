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

export default router;
