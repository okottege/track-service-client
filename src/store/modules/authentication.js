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
  handleSuccessfulLogin ({ commit }) {
    auth.handleAuthentication();
    commit('SUCCESSFUL_LOGIN');
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
