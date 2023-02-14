import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './Page/LandingPage/LandingPage';

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LandingPage,
    },
    {
        path: '/signup',
        name: 'SignupPage',
        component: LandingPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
