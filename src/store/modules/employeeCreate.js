import { validateForm } from '../../validators/EmployeeValidator';

const getInitialFormState = () => (
  {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    startDate: undefined
  }
);

const getError = (errors, field) => {
  var err = errors.find(e => e.field === field);
  return err ? err.error : undefined;
};

const state = {
  form: {
    ...getInitialFormState()
  },
  submitted: false,
  errors: []
};

const getters = {
  hasError: state => state.errors.length > 0,
  firstNameError: state => getError(state.errors, 'firstName'),
  lastNameError: state => getError(state.errors, 'lastName'),
  emailError: state => getError(state.errors, 'email')
};

const actions = {
  updateState ({ commit }, data) {
    commit('SET_DATA', data);
  },
  submitEmployee ({ commit, state }) {
    const errors = validateForm(state.form);
    commit('SET_VALIDATION_ERRORS', errors);

    if (errors.length === 0) {
      commit('SUBMIT_EMPLOYEE');
    }
  },
  resetEmployee ({ commit }) {
    commit('RESET_EMPLOYEE');
  }
};

const mutations = {
  SET_DATA (state, data) {
    state.form[data.fieldName] = data.value;
  },
  RESET_EMPLOYEE (state) {
    state.form = { ...getInitialFormState() };
    state.errors = [];
  },
  SUBMIT_EMPLOYEE (state) {
    state.submitted = true;
  },
  FIELD_VALIDATION_ERROR (state, err) {
    const errForFldInState = state.errors.find(e => e.field === err.fieldName);
    if (err.error) {
      if (errForFldInState) {
        state.errors = state.errors.map(e => e !== errForFldInState ? e : err);
      } else {
        state.errors.push(err);
      }
    } else if (errForFldInState) {
      state.errors = state.errors.filter(e => e !== errForFldInState);
    }
  },
  SET_VALIDATION_ERRORS (state, errors) {
    state.errors = errors;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
