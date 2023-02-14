import { createStore } from 'vuex';
import UserStore from './Modules/UserStore';

export default createStore({
    modules: {
        UserStore,
    },
});
