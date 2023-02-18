import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Store from './Stores/Store';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import FloatingVue from 'floating-vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

createApp(App)
    .use(router)
    .use(Store)
    .use(autoAnimatePlugin)
    .use(FloatingVue)
    .use(Toast)
    .mount('#app');
