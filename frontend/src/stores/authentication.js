
import { createStore} from 'vuex'

const authStore = createStore({
    state: {
        loggedIn: false,
        userRole: '',
        accessToken: '',
        refreshToken: ''


    },

    actions: {
        login(loginValue, role, accessToken, refreshToken){
            commit('setLoggedIn', loginValue)
            commit('setUserRole', role)
            commit('setAccessToken', accessToken)
            commit('setRefreshToken', refreshToken)
        },

        logout(){
            commit('setLogOut')
        }
    },

    mutations: {
        setLoggedIn(state, loginValue){
            state.loggedIn = loginValue;   
        },

        setRole(state, role){
            state.userRole = role
        },

        setAccessToken(state, token){
            state.accessToken = token;
        },

        setRefreshToken(state, token){
            state.refreshToken = token;
        },

        setLogOut(state){
            state.loggedIn = false;
            state.userRole = '';
            state.accessToken = '';
            state.refreshToken = ''
        }

    },

    getters:{
        isLoggedIn(state){
            return state.loggedIn;
        },
        
        getRole(state){
            return state.userRole;
        }
    }


});

export default authStore;