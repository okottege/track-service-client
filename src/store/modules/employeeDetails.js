import { validateForm } from '../../validators/EmployeeValidator';
import EmployeeService from '../../services/EmployeeService';
import { formatDateWithoutTime } from '../../common/dates';

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

const newEmployeeService = () => new EmployeeService(localStorage.getItem('access_token'));

const saveEmployeeDetails = async () => {
  const employeeService = newEmployeeService();
  const employeeToSave = mapEmployeeFromState();
  let savedEmployee;
  if (employeeToSave.employeeId) {

  } else {
    savedEmployee = await employeeService.createNewEmployee(employeeToSave);
  }
  return savedEmployee;
};

const mapEmployeeFromState = () => ({
  Email: state.form.email,
  FirstName: state.form.firstName,
  LastName: state.form.lastName,
  DateOfBirth: state.form.dateOfBirth,
  StartDate: state.form.startDate
});

const mapEmployeeToState = e => ({
  employeeId: e.EmployeeId,
  firstName: e.FirstName,
  lastName: e.LastName,
  dateOfBirth: formatDateWithoutTime(e.DateOfBirth),
  startDate: formatDateWithoutTime(e.StartDate),
  email: e.Email
});

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
  initialiseState ({ commit }, employee) {
    commit('SET_EMPLOYEE_DETAILS', employee);
  },
  updateState ({ commit }, data) {
    commit('SET_DATA', data);
  },
  async submitEmployee ({ commit, state }) {
    const errors = validateForm(state.form);
    commit('SET_VALIDATION_ERRORS', errors);

    if (errors.length === 0) {
      const createdEmployee = await saveEmployeeDetails();
      commit('SUBMIT_EMPLOYEE', createdEmployee);
      commit('RESET_EMPLOYEE');
    }
  },
  resetEmployee ({ commit }) {
    commit('RESET_EMPLOYEE');
  },
  async loadEmployee ({ dispatch }, employeeId) {
    const employee = await newEmployeeService().getEmployee(employeeId);
    dispatch('initialiseState', mapEmployeeToState(employee));
  }
};

const mutations = {
  SET_EMPLOYEE_DETAILS (state, employee) {
    state.form = { ...employee };
  },
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
