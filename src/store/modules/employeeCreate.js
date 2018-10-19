import { validateForm } from '../../validators/EmployeeValidator';
import EmployeeService from '../../services/EmployeeService';

const getInitialFormState = () => (
  {
    employeeId: undefined,
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

const submitNewEmployee = async () => {
  const employeeService = new EmployeeService(localStorage.getItem('access_token'));
  const createdEmployee = await employeeService.createNewEmployee(
    {
      Email: state.form.email,
      FirstName: state.form.firstName,
      LastName: state.form.lastName,
      DateOfBirth: state.form.dateOfBirth,
      StartDate: state.form.startDate
    }
  );
  return createdEmployee;
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
  async submitEmployee ({ commit, state }) {
    const errors = validateForm(state.form);
    commit('SET_VALIDATION_ERRORS', errors);

    if (errors.length === 0) {
      const createdEmployee = await submitNewEmployee();
      commit('SUBMIT_EMPLOYEE', createdEmployee);
      commit('RESET_EMPLOYEE');
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
  SUBMIT_EMPLOYEE (state, employee) {
    state.submitted = true;
    state.employeeId = employee.Id;
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
