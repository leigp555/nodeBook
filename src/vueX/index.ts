import {createStore} from 'vuex'

interface dataX {
    user: { username: string | number, password: string | number }
}

export const store = createStore<dataX>({
    state() {
        return {
            user: {username: '', password: ''}
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user
        },
    },
    mutations: {
        modifyCurrentUser(state, payload) {
            state.user = payload
        }
    }
})
