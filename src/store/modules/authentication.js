import AuthService from '../../services/AuthenticationService';

const auth = new AuthService();
const { login, logout, isAuthenticated } = auth;

const state = {
  authenticated: isAuthenticated()
};
const getters = {
  authenticated: state => state.authenticated
};
const actions = {
  goToLoginPage () {
    login();
  },
  handleLogin ({ commit }) {
    return new Promise((resolve, reject) => {
      auth.handleAuthentication()
        .then(() => {
          commit('SUCCESSFUL_LOGIN');
          resolve();
        })
        .catch((err) => reject(err));
    });
  },
  logout ({ commit }) {
    logout();
    commit('SUCCESSFUL_LOGOUT');
  }
};
const mutations = {
  SUCCESSFUL_LOGIN (state) {
    state.authenticated = true;
  },
  SUCCESSFUL_LOGOUT (state) {
    state.authenticated = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
