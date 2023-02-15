export default {
    state() {
        return {
            userInfo: {},
        };
    },
    getters: {
        hasUserInfo(state) {
            return Object.keys(state.userInfo).length !== 0;
        },
    },
    mutations: {
        setUserInfo(state, userObj) {
            state.userInfo = Object.assign({}, userObj);
        },
    },
};
