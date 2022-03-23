import {createStore} from 'vuex'
import dayjs from "dayjs";

interface dataX {
    user: { username: string | number, password: string | number },
    currentKind:string
}

export const store = createStore<dataX>({
    state() {
        return {
            user: {username: '', password: ''},
            currentKind:"1"
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user
        },
        getCurrentKind(state){
            return state.currentKind
        }
    },
    mutations: {
        modifyCurrentUser(state, payload) {
            state.user = payload
        },
        modifyCurrentKind(state, payload) {
            state.currentKind = payload
        }
    }
})
