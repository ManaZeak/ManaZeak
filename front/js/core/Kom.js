import HttpStatusCode from '../utils/enum/HttpStatusCode.js';
'use strict';


class Kom {


  /** @summary <h1>Server communication abstraction</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>This class is the main object to deal with when requesting something from the server.<br>
   * It handle all urls calls (<code>GET</code>, <code>POST</code>), treat responses or handle errors using
   * <code>Promise</code>.<br>Because it uses <code>Promise</code>, success and errors are to be handled in the caller
   * function, using <code>.then()</code> and <code>.catch()</code>. To properly deal with <code>POST</code> request,
   * the session must contain a csrf token in cookies. Otherwise, those <code>POST</code> call may fail.</blockquote> */
  constructor() {
    /** @private
     * @member {string} - User session CSRF token to use in POST request */
    this._csrfToken = this._getCsrfCookie();
    /** @private
     * @member {array[]} - Array of HTTP headers to be used in HTTP calls */
    this._headers = this._createRequestHeaders();
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  CLASS INIT UTILS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _getCsrfCookie
   * @private
   * @memberof Kom
   * @description <blockquote>Extract CSRF token value from client cookies and returns it as a string. Returns an empty
   * string by default. This method is required to be called on construction.</blockquote>
   * @return {string} - The CSRF token string */
  _getCsrfCookie() {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; ++i) {
        // Parse current cookie to extract its properties
        const cookie = cookies[i].trim().match(/(\w+)=(.*)/);
        if (cookie !== undefined && cookie[1] === 'csrftoken') {
          // Found a matching cookie for csrftoken value, return as decoded string
          return decodeURIComponent(cookie[2]);
        }
      }
    }
    // Return empty string by default, POST calls may fail
    return '';
  }


  /** @method
   * @name _createRequestHeaders
   * @private
   * @memberof Kom
   * @description <blockquote>Fills Kom <code>_headers</code> private member array, to use in HTTP requests later on.
   * This method is required to be called on construction.</blockquote>
   * @return {array[]} - The headers array, length 3, to be used in HTTP requests */
  _createRequestHeaders() {
    return [
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['X-CSRFToken', this._csrfToken]
    ];
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  PRIVATE METHODS  ------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _getErrorCodeFromHTTPStatus
   * @private
   * @memberof Kom
   * @description <blockquote>This method is called whenever a server request didn't went well. In case a request (from
   * any type) fails, its HTTP status code have to be handle in the method, so it returns an error code can be handled
   * in the user interface (with notification, console or else), using front locale files.</blockquote>
   * @param {number} code - The HTTP status code to handle, in supported ones from HttpStatusCode enumeration
   * @return {string} The HTTP status as an error code */
  _getErrorCodeFromHTTPStatus(code) {
    if (code === HttpStatusCode.NOT_FOUND) {
      return 'B_KOM_NOT_FOUND';
    } else if (code === HttpStatusCode.FORBIDDEN) {
      return 'B_KOM_ACCESS_FORBIDDEN';
    } else if (code === HttpStatusCode.INTERNAL_ERROR) {
      return 'B_KOM_INTERNAL_ERROR';
    } else {
      return `B_KOM_UNKNOWN_ERROR`;
    }
  }


  /** @method
   * @async
   * @name _resolveAsJSON
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by public methods on fetch responses to format output data as JSON to be
   * read in JavaScript code as objects.</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @returns {Promise} The request <code>Promise</code>, format response as an object on resolve, as error code string on reject */
  _resolveAsJSON(response) {
    return new Promise((resolve, reject) => {
      if (response) {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(this._getErrorCodeFromHTTPStatus(response.status));
        }
      } else {
        reject('F_KOM_MISSING_ARGUMENT');
      }
    });
  }


  /** @method
   * @async
   * @name _resolveAsText
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by public methods on fetch responses to format output data as text to be
   * read in JavaScript code as string (mostly to parse HTML templates).</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @returns {Promise} The request <code>Promise</code>, format response as a string on resolve, as error code string on reject */
  _resolveAsText(response) {
    return new Promise((resolve, reject) => {
      if (response) {
        if (response.ok) {
          resolve(response.text());
        } else {
          reject(this._getErrorCodeFromHTTPStatus(response.status));
        }
      } else {
        reject('F_KOM_MISSING_ARGUMENT');
      }
    });
  }


  /** @method
   * @async
   * @name _resolveAsRaw
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by XmlHTTPRequests to format server response as raw binary data.</blockquote>
   * @param {Object} response - The <code>XmlHTTPRequest</code> response status object
   * @returns {Promise} The request <code>Promise</code>, doesn't format response on resolve, send error code string on reject */
  _resolveAsRaw(response) {
    return new Promise((resolve, reject) => {
      if (response) {
        if (response.status === HttpStatusCode.OK) {
          resolve(response.responseText);
        } else {
          reject(this._getErrorCodeFromHTTPStatus(response.status));
        }
      } else {
        reject('F_KOM_MISSING_ARGUMENT');
      }
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  PUBLIC METHODS  ------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @async
   * @name checkValidity
   * @public
   * @memberof Kom
   * @description <blockquote>Check the Kom instance validity to ensure its properties validity. Useful to call after
   * component instantiation to ensure all its headers are properly set.</blockquote>
   * @returns {Promise} The validity <code>Promise</code>, rejected if csrf token not set, resolved otherwise  */
  checkValidity() {
    return new Promise((resolve, reject) => {
      if (this._csrfToken !== '' && this._headers.length !== null) {
        resolve();
      } else {
        reject('F_KOM_INIT_FAILED');
      }
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------------  HTTP SERVER CALLS METHODS  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @async
   * @name get
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br><code>resolve</code> returns the
   * response as an <code>Object</code>.<br><code>reject</code> returns an error key as a <code>String</code>.
   * It is meant to perform API call to access database through the user interface.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from, in supported back URLs
   * @returns {Promise} The request <code>Promise</code> */
  get(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]]) // Content type to JSON
      };

      fetch(url, options)
        .then(this._resolveAsJSON)
        .then(resolve)
        .catch(reject);
    });
  }


  /** @method
   * @async
   * @name getText
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br><code>resolve</code> returns the
   * response as a <code>String</code>.<br><code>reject</code> returns an error key as a <code>String</code>. It is
   * meant to perform API call to get HTML templates as string to be parsed as documents/documents fragments.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from, in supported back URLs
   * @returns {Promise} The request <code>Promise</code> */
  getText(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]]) // Content type to JSON
      };

      fetch(url, options)
        .then(this._resolveAsText)
        .then(resolve)
        .catch(reject);
    });
  }


  /** @method
   * @async
   * @name getRaw
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using an <code>XMLHttpRequest</code>, with an override
   * mime type hack to pass bytes through unprocessed.<br>It was implemented to allow <code>d3.js</code> to render
   * <code>.mood</code> file.<br><code>resolve</code> returns the response as raw binary data.<br><code>reject</code>
   * returns an error code as a <code>String</code>.</blockquote>
   * @param {String} url - The url to fetch raw data from
   * @returns {Promise} The request <code>Promise</code> */
  getRaw(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = response => { // Keep old js function definition since this is the request response object
        if (response.target.readyState === 4) { // Ready state changed has reach the response state
          this._resolveAsRaw(response.target)
            .then(resolve)
            .catch(reject);
        }
      };
      xhr.onerror = reject('F_KOM_XHR_ERROR');
      xhr.send();
    });
  }


  /** @method
   * @async
   * @name post
   * @public
   * @memberof Kom
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>Beware that the given options
   * object match the url expectations (browse the backend documentation for further details).<br><code>resolve</code>
   * returns the response as an <code>Object</code>.<br><code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>POST</code> url to fetch data from
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
        .then(this._resolveAsJSON)
        .then(resolve)
        .catch(reject);
    });
  }


}


export default Kom;
