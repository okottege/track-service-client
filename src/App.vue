<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link to="/" class="btn btn-primary btn-margin">Home</router-link> |
          <router-link to="/about" class="btn btn-primary btn-margin">About</router-link> |
          <button
             class="btn btn-primary btn-margin"
             v-if="!authenticated"
             @click="login()">
            Login
          </button>
          <button
             class="btn btn-primary btn-margin"
             v-if="authenticated"
             @click="logout()">
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view :auth="auth" :authenticated="authenticated" />
    </div>
  </div>
</template>

<script>
import AuthService from './services/AuthenticationService';
const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: 'app',
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

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
</style>
