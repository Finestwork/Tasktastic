import Todo from '../../Helpers/APIs/Todo';

export default {
    namespaced: true,
    state: {
        started: [],
        inProgress: [],
        completed: [],
    },
    mutations: {
        setStartedTask(state, startedArr) {
            state.started = startedArr;
        },
        setInProgressTask(state, inProgressArr) {
            state.inProgress = inProgressArr;
        },
        setCompletedTask(state, completedArr) {
            state.completed = completedArr;
        },
        addStartedTask(state, data) {
            state.started.push(data);
        },
        addInProgressTask(state, data) {
            state.inProgress.push(data);
        },
        addCompletedTask(state, data) {
            state.completed.push(data);
        },
    },
    actions: {
        // Fetch all personal tasks (started, in-progress, completed)
        fetchAll(state) {
            const REQUEST = Todo.fetchAllPersonalTasks();

            REQUEST.then((res) => {
                const DATA = res.data;

                state.commit('setStartedTask', DATA.started);
                state.commit('setInProgressTask', DATA.in_progress);
                state.commit('setCompletedTask', DATA.completed);
            });

            return REQUEST;
        },

        // Create a todo task
        create({ commit }, data) {
            const REQUEST = Todo.create(data);

            REQUEST.then((res) => {
                const DATA = res.data;
                commit('addStartedTask', DATA);
            });

            return REQUEST;
        },
    },
};
