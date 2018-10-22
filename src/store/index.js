import Vue from 'vue';
import Vuex from 'vuex';

import healthCheck from './modules/healthCheck';
import employeeCreate from './modules/employeeCreate';
import employeeList from './modules/employeeList';
import authentication from './modules/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    healthCheck,
    employeeCreate,
    employeeList,
    authentication
  }
});
