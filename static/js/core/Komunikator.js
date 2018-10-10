'use_strict';


class Komunikator {
  /**
   * @summary ManaZeak backend comunicator
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle all urls calls (GET, POST) and handle errors. This object is meant to be a Mzk attribute, that can be used from any sub-classes.
   * @param {object} options - The komunikator options object
   * @param {string} options.csrfToken - The user session csrf token (must be extracted from cookies before)
   **/
  constructor(options) {
    this._csrfToken = options.csrfToken;
    this._headers = [];

    this._init();
  }


  //  ----  PRIVATE METHODS  ----  //


  /**
   * @method
   * @name _init
   * @private
   * @memberof Komunikator
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fills the header array width content type, accep, csrftoken
   **/
  _init() {
    this._headers.push(['Content-Type', 'application/json; charset=UTF-8']); // this._headers[0]
    this._headers.push(['Accept', 'application/json']); // this._headers[1]
    this._headers.push(['X-CSRFToken', this._csrfToken]); // this._headers[2]
  }


  //  ----  PUBLIC METHODS  ----  //


  /**
   * @method
   * @name get
   * @public
   * @memberof Komunikator
   * @author Arthur Beaulieu
   * @since September 2018
   * @description GET http request using fetch API. Refeer to <code>url.py</code> for available URLs
   * @param {string} url - The GET url to fetch data from
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  get(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]])
      };

      fetch(url, options)
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          } else if (response.status === 404) {
            reject('URL_NOT_FOUND');
          } else {
            reject('UNKNOWN_ERROR');
          }
        });
    });
  }


  /**
   * @method
   * @name getWithOverrideMimeType
   * @public
   * @memberof Komunikator
   * @author Arthur Beaulieu
   * @since October 2018
   * @description GET with hack to pass bytes through unprocessed, returns a bytes array
   * @param {string} url - The GET url to fetch data from
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  getWithOverrideMimeType(url) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = function() { // Keep function old js definition since this is the request response object
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText); // responseText is binary data
        }
      };
      xhr.send();
    });
  }


  /**
   * @method
   * @name post
   * @public
   * @memberof Komunikator
   * @author Arthur Beaulieu
   * @since September 2018
   * @description POST http request using fetch API. Refeer to <code>url.py</code> for available URLs
   * @param {string} url - The POST url to fetch data from
   * @param {object} data - The JSON object that contains POST parameters
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  post(url, data) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: new Headers(this._headers), // POST needs all previously defined headers
        body: JSON.stringify(data)
      };

      fetch(url, options)
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          } else {
            switch (response.status) {
              case 403:
                reject('ACCESS_FORBIDDEN');
                break;
              case 404:
                reject('URL_NOT_FOUND');
                break;
              case 500:
                reject('INTERNAL_ERROR');
                break;
              default:
                break;
            }
          }
        });
    });
  }
}

export default Komunikator;
