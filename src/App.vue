<template>
  <div id="app">
    <site-navigation :login="login" :logout="logout" :authenticated="authenticated" />
    <div class="container">
      <router-view :auth="auth" :authenticated="authenticated" />
    </div>
  </div>
</template>

<script>
import SiteNavigation from '@/components/SiteNavigation';
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
  },
  components: {
    SiteNavigation
  }
};

</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';

.btn-margin {
  margin-top: 7px
}
</style>
