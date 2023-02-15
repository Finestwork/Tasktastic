import { createStore } from 'vuex';
import UserModule from './Modules/User';

export default createStore({
    modules: {
        UserModule,
    },
});
