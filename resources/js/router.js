import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './Page/Landing/LandingPage';
import Dashboard from './Page/Dashboard/Dashboard';

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
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
    },
];

const routes = [...ENTRY_POINT_ROUTES, ...DASHBOARD_ROUTES];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
