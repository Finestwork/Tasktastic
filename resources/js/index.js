import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Store from './Stores/Store';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import FloatingVue from 'floating-vue';

createApp(App)
    .use(router)
    .use(Store)
    .use(autoAnimatePlugin)
    .use(FloatingVue)
    .mount('#app');
