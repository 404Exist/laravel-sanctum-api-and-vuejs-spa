import { getLoggedInUser } from "./auth";

const user = getLoggedInUser();

export default {
    state: {
      currentUser: user,
      isLoggedIn: !!user,
      authError: null,
      regError: null,
      registeredUser: null,
    },
    getters: {
      isLoggedIn(state) {
        return state.isLoggedIn;
      },
      currentUser(state) {
        return state.currentUser;
      },
      authError(state) {
        return state.authError;
      },
      registeredUser(state) {
        return state.registeredUser;
      },
    },
    mutations: {
      login(state) {
        state.authError = null;
      },
      loginSuccess(state, payload) {
        state.authError = null;
        state.isLoggedIn = true;
        state.currentUser = Object.assign({}, payload.user, {token: payload.token});
        localStorage.setItem('user', JSON.stringify(state.currentUser));
      },
      loginFaild(state, payload) {
        state.authError = payload;
      },
      logout(state) {
        localStorage.removeItem('user');
        state.isLoggedIn = false;
        state.currentUser = null;
      },
      registerSuccess(state, payload) {
        state.regError = null;
        state.registeredUser = payload.user;
      },
      registerFaild(state, payload) {
        state.regError = payload.error;
      },

    },
    actions: {
        login(context) {
            context.commit('login')
        }
    }
}
