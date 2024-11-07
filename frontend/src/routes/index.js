// src/routes/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import SchedulePage from '@/views/SchedulePage.vue';


const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/schedule',
        component: SchedulePage,
        name: 'schedule'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
