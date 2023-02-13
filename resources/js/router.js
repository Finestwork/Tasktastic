import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from "./Page/LandingPage/LandingPage";
import Page1 from "./Page/Page1/Page1";

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/page-1',
        name: 'Page1',
        component: Page1,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
