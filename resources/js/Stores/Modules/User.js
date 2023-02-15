export default {
    state() {
        return {
            userInfo: {},
        };
    },
    getters: {
        getUserFullName(state) {
            return `${state.userInfo.first_name} ${state.userInfo.last_name}`;
        },
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
