import { createStore } from 'vuex';
import UserModule from './Modules/User';
import PersonalTaskModule from './Modules/PersonalTask';

export default createStore({
    modules: {
        UserModule,
        PersonalTaskModule,
    },
});
