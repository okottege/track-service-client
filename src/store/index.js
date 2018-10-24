import Vue from 'vue';
import Vuex from 'vuex';

import healthCheck from './modules/healthCheck';
import employeeDetails from './modules/employeeDetails';
import employeeList from './modules/employeeList';
import authentication from './modules/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    healthCheck,
    employeeDetails,
    employeeList,
    authentication
  }
});
