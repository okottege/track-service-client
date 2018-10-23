import auth0 from 'auth0-js';
import { AUTH_CONFIG } from '../auth/auth0-config';
import EventEmitter from 'eventemitter3';

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
    audience: 'https://test-tracking-service-api.azurewebsites.net',
    clientID: AUTH_CONFIG.clientId,
    redirectUri: `${window.location.origin}${AUTH_CONFIG.redirectPath}`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login () {
    this.auth0.authorize();
  }

  handleAuthentication () {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          reject(err);
        } else {
          reject(new Error('There was an issue handling the login'));
        }
      });
    });
  }

  setSession (authResult) {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.authNotifier.emit('authChange', { authenticated: true });
  }

  logout () {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    this.authNotifier.emit('authChange', false);
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken () {
    return this.isAuthenticated() ? localStorage.getItem('access_token') : undefined;
  }
}
