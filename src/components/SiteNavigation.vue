<template>
  <b-navbar toggleable="md" type="info" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item href="#">
          <router-link to="/about">About</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link v-if="authenticated" to="/health">Health Check</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <b-button variant="primary"
            v-if="!authenticated"
            @click="login()">
            Login
          </b-button>
          <b-button variant="primary"
            v-if="authenticated"
            @click="logout()">
            Logout
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AuthService from '../services/AuthenticationService';
const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: 'site-navigation',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated;
    });

    return { auth, authenticated };
  },
  methods: {
    login, logout
  }
};
</script>
