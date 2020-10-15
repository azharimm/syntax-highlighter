import api from '../../api';

const state = {
    userId: null,
    userName: null,
    isAuthenticated: false,
    error: {
        isError: false,
        errMsg: null
    }
};

const getters = {
	getUserId(state) {
		return state.userId;
    },
    getUserName(state) {
		return state.userName;
	},
	getIsAuthenticated(state) {
		return state.isAuthenticated;
    },
    getError(state) {
        return state.error;
    }
};

const actions = {
	async login({commit}, data) {
        try {
            let response = await api.post(`/user/login`, data);
            if(!response.data.success) {
                throw new Error()
            }
            const userId = response.data.data.id;
            const userName = response.data.data.name;
            commit('SET_USER', {userId, userName});
            commit('SET_ERROR', {isError: false, errMsg: null});
        }catch(e) {
            commit('SET_ERROR', {isError: true, errMsg: 'Nama user harus diisi'});
            return Promise.reject(e);
        }
    },
    logout({commit}) {
        commit('SET_USER', {userId: null, userName: null, isAuthenticated: false});
    }
};

const mutations = {
	SET_ERROR(state, {isError, errMsg}) {
        state.error.isError = isError;
        state.error.errMsg = errMsg;
    },
    SET_USER(state, {userId, userName, isAuthenticated = true}) {
        state.userId = userId;
        state.userName = userName;
        state.isAuthenticated = isAuthenticated;
    }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
