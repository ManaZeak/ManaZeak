class User {


  constructor() {
    this._lang = 'en';
    // Auth JWT token
    this._jwtToken = '';
    this._jwtTokenExpiration = null;
    // Playback JWT token
    this._playToken = '';
    this._playTokenExpiration = null;

    this._userRoles = [];
    // JWT token must have been already set in auth pages
    this._parseJWTToken();
    // Ask for brand new play token
    this._renewPlayToken();
    this._events();
  }


  _parseJWTToken() {
    this._jwtToken = localStorage.getItem('mzk-jwt-token');
    const splitedToken = this._jwtToken.split('.');
    if (splitedToken.length === 3) {
      const tokenInfo = JSON.parse(atob(splitedToken[1]));
      this._jwtTokenExpiration = tokenInfo.exp * 1000; // Convert expiration from s to ms
      this._userRoles = tokenInfo.scope; // Save user roles
    } else {
      // In this case, clear localStorage and redirect user to login
      localStorage.removeItem('mzk-jwt-token');
      window.location = '/login/';
    }
    // Renew token if expiration is less than 10 minutes away
    if (this._jwtTokenExpiration - Date.now() < 600000) {
      this._renewJWTToken();
    }
  }

  
  _parsePlayToken() {
    this._playToken = localStorage.getItem('mzk-play-token');
    const splitedToken = this._playToken.split('.');
    if (splitedToken.length === 3) {
      const tokenInfo = JSON.parse(atob(splitedToken[1]));
      this._playTokenExpiration = tokenInfo.exp * 1000; // Convert expiration from s to ms
    }
    // Renew token if expiration is less than 10 minutes away
    if (this._playTokenExpiration - Date.now() < 600000) {
      this._renewPlayToken();
    }
  }


  _events() {
    // While logged in, each 10 minutes, refresh tokens
    setInterval(() => this._renewJWTToken(), 600000);
    setInterval(() => this._renewPlayToken(), 600000);
  }


  _renewJWTToken() {
    mzk.kom.getText('/renew-token/').then(token => {
      localStorage.setItem('mzk-jwt-token', token);
      this._parseJWTToken();
      window.mzk.kom.updateJWTToken(); // Update Kom class with newly set token
    }).catch(err => {
      console.error(err);
    });
  }


  _renewPlayToken() {
    mzk.kom.getText('/play-token/').then(token => {
      localStorage.setItem('mzk-play-token', token);
      this._parsePlayToken();
    }).catch(err => {
      console.error(err);
    });    
  }


  get lang() {
    return this._lang;
  }


  get playToken() {
    return this._playToken;
  }


}


export default User;
  