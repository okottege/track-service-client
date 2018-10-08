import HealthCheckService from '../../services/HealthCheckService';

const state = {
  healthInfo: null
};

const getters = {};

const actions = {
  async getHealth ({ commit }) {
    const service = new HealthCheckService(localStorage.getItem('access_token'));
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
