import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './Page/Landing/LandingPage';
import Personal from './Page/Personal/Personal';

const ENTRY_POINT_ROUTES = [
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

const DASHBOARD_ROUTES = [
    {
        name: 'Personal',
        path: '/personal',
        component: Personal,
    },
];

const routes = [...ENTRY_POINT_ROUTES, ...DASHBOARD_ROUTES];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
