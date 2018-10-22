import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import Callback from './views/Callback.vue';
import HealthCheck from './views/HealthCheck';
import EmployeeDetails from './views/Employee';
import DatePickerDemo from './views/DatePickerDemo';
import EmployeeList from './views/EmployeeList';
import AuthenticationService from './services/AuthenticationService';

Vue.use(Router);
const authService = new AuthenticationService();

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { path: '/callback', name: 'callback', component: Callback },
    { path: '/health', name: 'healthCheck', component: HealthCheck },
    { path: '/employee/create', name: 'employee-create', component: EmployeeDetails },
    { path: '/employee/list', name: 'employee-list', component: EmployeeList },
    { path: '/date-picker-demo', name: 'datepicker', component: DatePickerDemo },
    { path: '*', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  if (['home', 'about', 'callback'].includes(to.name)) {
    next();
  } else if (authService.isAuthenticated()) {
    next();
  } else {
    authService.login();
  }
});

export default router;
