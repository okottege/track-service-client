import Vue from 'vue';
import Vuex from 'vuex';

import healthCheck from './modules/healthCheck';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    healthCheck
  }
});
