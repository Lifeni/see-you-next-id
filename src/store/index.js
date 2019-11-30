import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    info: {},
    isLogin: 0,
    userId: "----"
}

export default new Vuex.Store({
    state,
    actions: {

    },
    mutations: {
        login(state) {
            state.isLogin = 1;
        },
        logout(state) {
            state.isLogin = -1;
        },
        setUserId(state, id) {
            state.userId = id
        }
    },
})
