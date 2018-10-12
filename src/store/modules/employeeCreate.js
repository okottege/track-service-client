const getInitialState = () => (
  {
    email: '',
    firstName: 'Hello',
    lastName: 'World',
    dateOfBirth: undefined,
    startDate: undefined
  }
);

const initialState = getInitialState();

const getters = {};

const actions = {
  updateState ({ commit }, data) {
    commit('SET_DATA', data);
  },
  submitEmployee ({ commit }) {

  },
  resetEmployee ({ commit }) {
    commit('RESET_EMPLOYEE');
  }
};

const mutations = {
  SET_DATA (state, data) {
    state[data.fieldName] = data.value;
  },
  RESET_EMPLOYEE (state) {
    console.log('state: ', state);
    state = { ...getInitialState() };
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
