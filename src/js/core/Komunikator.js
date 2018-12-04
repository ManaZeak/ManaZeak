'use strict';


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
   * This method must be called from the Komunikator's constructor only.</blockquote> */
  _init() {
    this._headers.push(['Content-Type', 'application/json; charset=UTF-8']); // this._headers[0]
    this._headers.push(['Accept', 'application/json']); // this._headers[1]
    this._headers.push(['X-CSRFToken', this._csrfToken]); // this._headers[2]
  }


  //  ----  PUBLIC METHODS  ----  //


  /** @method
   * @async
   * @name get
   * @public
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
          this._resolveAsJSON(response, resolve, reject);
        });
    });
  }


  /** @method
   * @async
   * @name getBinaryResponse
   * @public
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
      xhr.onreadystatechange = response => { // Keep old js function definition since this is the request response object
        if (response.originalTarget.readyState === 4 && response.originalTarget.status === 200) {
          this._resolveAsBinary(response.originalTarget, resolve, reject);
        }
      };
      xhr.send();
    });
  }


  /** @method
   * @async
   * @name getTemplate
   * @public
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br>
   * <code>resolve</code> returns the response as a <code>String</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from (see <code>app/urls.py</code>)
   * @returns {Promise} The request <code>Promise</code> */
  getTemplate(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]])
      };

      fetch(url, options)
        .then(response => {
          this._resolveAsText(response, resolve, reject);
        });
    });
  }


  /** @method
   * @async
   * @name post
   * @public
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
          this._resolveAsJSON(response, resolve, reject);
        });
    });
  }


  /** @method
   * @name _resolveAsJSON
   * @private
   * @memberof Komunikator
   * @description <blockquote>Tool method used by fetch requests to format server response
   * as a JSON object.</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @param {Function} resolve - The request <code>Promise</code> resolve callback
   * @param {Function} reject - The request <code>Promise</code> reject callback */
  _resolveAsJSON(response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      this._handleErrorCode(response.status, reject);
    }
  }


  /** @method
   * @name _resolveAsText
   * @private
   * @memberof Komunikator
   * @description <blockquote>Tool method used by fetch requests to format server response
   * as a string. In ManaZeak, the main usage for this formatting type is when requesting an
   * HTML template. This way it can be easily parsed and built into a DOM object.</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @param {Function} resolve - The request <code>Promise</code> resolve callback
   * @param {Function} reject - The request <code>Promise</code> reject callback */
  _resolveAsText(response, resolve, reject) {
    if (response.ok) {
      resolve(response.text());
    } else {
      this._handleErrorCode(response.status, reject);
    }
  }


  /** @method
   * @name _resolveAsBinary
   * @private
   * @memberof Komunikator
   * @description <blockquote>Tool method used by XMLHTTPRequests to format server response
   * as binary data. In ManaZeak, the main usage for this formatting type is when requesting
   * a <code>.mood</code> file, so it can be rendered as a moodbar in the UI.</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @param {Function} resolve - The request <code>Promise</code> resolve callback
   * @param {Function} reject - The request <code>Promise</code> reject callback */
  _resolveAsBinary(response, resolve, reject) {
    if (response.status === 200) {
      resolve(response.responseText);
    } else {
      this._handleErrorCode(response.status, reject);
    }
  }


  /** @method
   * @name _handleErrorCode
   * @private
   * @memberof Komunikator
   * @description <blockquote>This method is called whenever a server request didn't went well.
   * In case a request (from any type) fails, its HTTP status code have to be handle in the method,
   * so the reject code can be handled in the UI.</blockquote>
   * @param {Number} code - The HTTP error code to handle
   * @param {Function} reject - The request <code>Promise</code> reject callback */
  _handleErrorCode(code, reject) {
    if (code === 404) {
      reject('URL_NOT_FOUND');
    } else if (code === 403) {
      reject('ACCESS_FORBIDDEN');
    } else if (code === 500) {
      reject('INTERNAL_ERROR');
    } else {
      reject('UNKNOWN_ERROR');
    }
  }
}

export default Komunikator;
