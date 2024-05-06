class User {


  constructor() {
    this._lang = 'en';
    this._jwtToken = '';
    this._tokenExpiration = null;
    this._userRoles = [];

    this._parseJWTToken();
    this._events();
  }


  _parseJWTToken() {
    this._jwtToken = localStorage.getItem('mzk-jwt-token');
    const splitedToken = this._jwtToken.split('.');
    if (splitedToken.length === 3) {
      const tokenInfo = JSON.parse(atob(splitedToken[1]));
      this._tokenExpiration = tokenInfo.exp * 1000; // Convert expiration from s to ms
      this._userRoles = tokenInfo.scope; // Save user roles
    } else {
      // In this case, clear localStorage and redirect user to login
      localStorage.removeItem('mzk-jwt-token');
      window.location = '/login/';
    }
    // Renew token if expiration is less than 10 minutes away
    if (this._tokenExpiration - Date.now() < 600000) {
      this._renewToken();
    }
  }


  _events() {
    // While logged in, each 10 minutes, refresh token
    setInterval(() => this._renewToken(), 600000);
  }


  _renewToken() {
    mzk.kom.getText('/renew-token/').then(token => {
      localStorage.setItem('mzk-jwt-token', token);
      this._parseJWTToken();
    }).catch(err => {
      console.error(err);
    });
  }


  get lang() {
    return this._lang;
  }


}


export default User;
  