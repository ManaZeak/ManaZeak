import Kom from '../../js/core/Kom.js';

'use strict';


const clearCookies = () => {
  // Clear all cookies - https://stackoverflow.com/a/179514
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; ++i) {
    const eqPos = cookies[i].indexOf('=');
    const name = eqPos > -1 ? cookies[i].substr(0, eqPos) : cookies[i];
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};


describe('Kom unit tests,', () => {


  beforeEach(() => {
    document.cookie = 'csrftoken=test-csrf';
  });


  it('Component construction with no CSRF token', done => {
    clearCookies();
    // Test routine
    let kom = new Kom();
    // Component proper instanciation
    expect(kom).not.toBe(null);
    expect(kom).not.toBe(undefined);
    // Properties existence test
    expect(kom._csrfToken).not.toBe(null);
    expect(kom._csrfToken).not.toBe(undefined);
    expect(typeof kom._csrfToken).toBe('string');
    expect(kom._headers).not.toBe(null);
    expect(kom._headers).not.toBe(undefined);
    expect(typeof kom._headers).toBe('object');
    // Properties value test
    expect(kom._csrfToken).toEqual('');
    expect(kom._headers).toEqual(
      [['Content-Type','application/json; charset=UTF-8'],['Accept', 'application/json'],['X-XSRF-TOKEN', '']]
    );
    // Then check component validity that must fail (no csrf token set)
    spyOn(console, 'error').and.callFake(error => {
      expect(error).toEqual('F_KOM_NO_CSRF_TOKEN');
      done();
    });
    kom._checkValidity();
  });


  it('Component construction with CSRF token', done => {
    let kom = new Kom();
    // Properties value test
    expect(kom._csrfToken).toEqual('test-csrf');
    expect(kom._headers).toEqual(
      [['Content-Type','application/json; charset=UTF-8'],['Accept', 'application/json'],['X-XSRF-TOKEN', 'test-csrf']]
    );
    spyOn(console, 'error').and.callThrough();
    // Then check component validity that must succeed
    kom._checkValidity();
    setTimeout(() => {
      expect(console.error).not.toHaveBeenCalled();
      done();
    });
  });


  it('Private method _getCsrfCookie', done => {
    // Test method call with csrf cookie
    let kom = new Kom();
    expect(kom._getCsrfCookie()).toEqual('test-csrf');
    // Test method call without csrf cookie
    clearCookies();
    kom = new Kom();
    expect(kom._getCsrfCookie()).toEqual('');
    done();
  });


  it('Private method _createRequestHeaders', done => {
    // Test method call with csrf cookie
    let kom = new Kom();
    expect(kom._createRequestHeaders()).toEqual(
      [['Content-Type','application/json; charset=UTF-8'],['Accept', 'application/json'],['X-XSRF-TOKEN', 'test-csrf']]
    );
    // Test method call without csrf cookie
    clearCookies();
    kom = new Kom();
    expect(kom._createRequestHeaders()).toEqual(
      [['Content-Type','application/json; charset=UTF-8'],['Accept', 'application/json'],['X-XSRF-TOKEN', '']]
    );
    done();
  });


  it('Private method _getErrorCodeFromHTTPStatus', done => {
    let kom = new Kom();
    // Test method call with supported status codes
    expect(kom._getErrorCodeFromHTTPStatus(404)).toEqual('B_KOM_NOT_FOUND');
    expect(kom._getErrorCodeFromHTTPStatus(403)).toEqual('B_KOM_ACCESS_FORBIDDEN');
    expect(kom._getErrorCodeFromHTTPStatus(500)).toEqual('B_KOM_INTERNAL_ERROR');
    // Test method with unsupported status codes
    const codes = [200, null, undefined, ''];
    for (let i = 0; i < codes.length; ++i) {
      expect(kom._getErrorCodeFromHTTPStatus(codes[i])).toEqual('B_KOM_UNKNOWN_ERROR');
    }
    done();
  });


  it('Private method _resolveAsJSON', done => {
    let kom = new Kom();
    // Valid pseudo response object
    kom._resolveAsJSON({
      ok: true,
      json: () => { return 'OK' }
    }).then(response => {
      expect(response).toEqual('OK');
    });
    // No argument provided
    kom._resolveAsJSON().catch(response => {
      expect(response).toEqual('F_KOM_MISSING_ARGUMENT');
    });
    // Regular error handling
    kom._resolveAsJSON({
      ok: false,
      status: 404,
      json: () => { return 'B_KOM_NOT_FOUND' }
    }).catch(response => {
      expect(response).toEqual('B_KOM_NOT_FOUND');
    });
    // End IT after a some ms, since method calls are async
    setTimeout(done, 100);
  });


  it('Private method _resolveAsText', done => {
    let kom = new Kom();
    // Valid pseudo response object
    kom._resolveAsText({
      ok: true,
      text: () => { return 'OK' }
    }).then(response => {
      expect(response).toEqual('OK');
    });
    // No argument provided
    kom._resolveAsText().catch(response => {
      expect(response).toEqual('F_KOM_MISSING_ARGUMENT');
    });
    // Regular error handling
    kom._resolveAsText({
      ok: false,
      status: 404,
      text: () => { return 'B_KOM_NOT_FOUND' }
    }).catch(response => {
      expect(response).toEqual('B_KOM_NOT_FOUND');
    });
    // End IT after a some ms, since method calls are async
    setTimeout(done, 100);
  });


  it('Private method _resolveAsRaw', done => {
    let kom = new Kom();
    // Valid pseudo response object
    kom._resolveAsRaw({
      status: 200,
      responseText: 'OK'
    }).then(response => {
      expect(response).toEqual('OK');
    });
    // No argument provided
    kom._resolveAsRaw().catch(response => {
      expect(response).toEqual('F_KOM_MISSING_ARGUMENT');
    });
    // Regular error handling
    kom._resolveAsRaw({
      status: 404
    }).catch(response => {
      expect(response).toEqual('B_KOM_NOT_FOUND');
    });
    // End IT after a some ms, since method calls are async
    setTimeout(done, 100);
  });


  it('Public method checkValidity', done => {
    let kom = new Kom();
    let calls = 0;
    spyOn(console, 'error').and.callFake(error => {
      if (calls === 0) {
        expect(error).toEqual('F_KOM_HEADERS_ERROR');
      } else {
        expect(error).toEqual('F_KOM_NO_CSRF_TOKEN');
      }
      ++calls;
    });
    // Wrong header formatting
    kom._headers = 'Not a string';
    kom._checkValidity();
    // No csrf token
    clearCookies()
    kom = new Kom();
    // End IT after a some ms, since method calls are async
    setTimeout(done, 100);
  });


});
