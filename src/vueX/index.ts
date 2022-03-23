import {createStore} from 'vuex'
import dayjs from "dayjs";

interface dataX {
    user: { username: string | number, password: string | number },
    currentKind:string,
    currentSearch:string
}

export const store = createStore<dataX>({
    state() {
        return {
            user: {username: '', password: ''},
            currentKind:"1",
            currentSearch:''
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user
        },
        getCurrentKind(state){
            return state.currentKind
        },
        getCurrentSearch(state){
            return state.currentSearch
        }
    },
    mutations: {
        modifyCurrentUser(state, payload) {
            state.user = payload
        },
        modifyCurrentKind(state, payload) {
            state.currentKind = payload
        },
        modifyCurrentSearch(state, payload) {
            state.currentSearch = payload
        }
    }
})
