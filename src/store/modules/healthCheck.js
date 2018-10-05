import HealthCheckService from '../../services/HealthCheckService';

const token = localStorage.getItem('access_token');
console.log('token is: ', token);
const service = new HealthCheckService(token);

const state = {
  healthInfo: null
};

const getters = {};

const actions = {
  async getHealth ({ commit }) {
    const info = await service.getHealthCheckInfo();
    commit('setHealthInfo', info);
  }
};

const mutations = {
  setHealthInfo (state, info) {
    state.healthInfo = info;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
