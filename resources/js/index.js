import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Store from './Stores/Store';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

createApp(App).use(router).use(autoAnimatePlugin).use(Store).mount('#app');
