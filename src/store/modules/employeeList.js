import EmployeeService from '../../services/EmployeeService';

const state = {
  employees: []
};

const getters = {
  employees: state => state.employees
};

const actions = {
  async getEmployees ({ commit }) {
    const service = new EmployeeService(localStorage.getItem('access_token'));
    const employees = await service.getEmployees();
    commit('EMPLOYEES_LOADED', employees.data);
  }
};

const mutations = {
  EMPLOYEES_LOADED (state, employees) {
    state.employees = employees;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
