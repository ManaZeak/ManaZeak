'use_strict';


class Komunikator {


  /** @summary <h1>Handle ManaZeak's HTTP requests</h1>
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>This class is the main object to deal with when requesting something from the server.<br>
   * It handle all urls calls (<code>GET</code>, <code>POST</code>), treat responses or handle errors using <code>Promise</code>.<br>
   * Because it uses <code>Promise</code>, success and errors are to be handled in the caller function, using <code>.then()</code> and <code>.catch()</code>.<br>
   * This object is a <a href="Mzk.html" target="_blank">Mzk</a>'s attribute, that can be used from anywhere (<code>mzk.komunikator</code>).<br>
   * Refer to <code>app/url.py</code> for available urls to control ManaZeak.</blockquote>
   * @param {Object} options - The komunikator's parameters
   * @param {String} options.csrfToken - The user's csrf token (must be extracted from browser's cookies before) */
  constructor(options) {
    /** @private
     * @member {String} - The user's csrf token */
    this._csrfToken = options.csrfToken;
    /** @private
     * @member {Array} - The HTTP headers that are used in <code>GET</code> and <code>POST</code> requests */
    this._headers = [];

    this._init();
  }


  //  ----  PRIVATE METHODS  ----  //


  /** @method
   * @name _init
   * @private
   * @memberof Komunikator
   * @description <blockquote>Init the Komunikator class by filling its <code>_headers</code> private member, to use in requests later on.<br>
   * This method must be called in Komunikator's constructor only.</blockquote> */
  _init() {
    this._headers.push(['Content-Type', 'application/json; charset=UTF-8']); // this._headers[0]
    this._headers.push(['Accept', 'application/json']); // this._headers[1]
    this._headers.push(['X-CSRFToken', this._csrfToken]); // this._headers[2]
  }


  //  ----  PUBLIC METHODS  ----  //


  /** @method
   * @async
   * @name get
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br>
   * <code>resolve</code> returns the response as an <code>Object</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from (see <code>app/urls.py</code>)
   * @returns {Promise} The request <code>Promise</code> */
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


  /** @method
   * @async
   * @name getBinaryResponse
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using an <code>XMLHttpRequest</code>, with an override mimetype hack to pass bytes through unprocessed.<br>
   * It was implemented to allow <code>d3.js</code> to render <code>.mood</code> file (used in <a href="./FootBar.html#.renderMoodFile" target="_blank">renderMoodFile</a>).<br>
   * <code>resolve</code> returns the response as binary data.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>.mood</code> file url to fetch data from
   * @returns {Promise} The request <code>Promise</code> */
  getBinaryResponse(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = function() { // Keep old js function definition since this is the request response object
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText); // responseText is binary data
        }
      };
      xhr.send();
    });
  }


  /** @method
   * @async
   * @name post
   * @memberof Komunikator
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>
   * Beware that the given options object match the url expectations (browse the backend documentation for further details).<br>
   * <code>resolve</code> returns the response as an <code>Object</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>POST</code> url to fetch data from (see <code>app/urls.py</code>)
   * @param {Object} data - The <code>JSON</code> object that contains <code>POST</code> parameters
   * @returns {Promise} The request <code>Promise</code> */
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
