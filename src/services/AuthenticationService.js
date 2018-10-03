import auth0 from 'auth0-js';
import { AUTH_CONFIG } from '../auth/auth0-config';
import EventEmitter from 'eventemitter3';
import router from '../router';

export default class AuthenticationService {
  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();

  constructor () {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.redirectUri,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login () {
    this.auth0.authorize();
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        router.replace('home');
      } else if (err) {
        router.replace('home');
        console.log('Error handling authentication ', err);
      }
    });
  }

  setSession () {

  }
}
