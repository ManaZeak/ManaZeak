import Lang from '../../js/core/Lang.js';


window.mzk = {
  kom: {
    get: req => {
      return Promise.resolve('SUCCESS');
    }
  }
};


window.Logger = {
  errors: {}
};


describe('Lang unit tests,', () => {


  it('Component construction with no arguments', done => {
    let lang = new Lang();
    // Component proper instanciation
    expect(lang).not.toEqual(null);
    expect(lang).not.toEqual(undefined);
    // Properties existence test
    expect(lang._lang).not.toEqual(null);
    expect(lang._lang).not.toEqual(undefined);
    expect(typeof lang._lang).toEqual('string');
    expect(lang._lang).toEqual('en');
    expect(lang._nls).not.toEqual(null);
    expect(lang._nls).not.toEqual(undefined);
    expect(typeof lang._nls).toEqual('object');
    expect(lang._nls).toEqual({});
    done();
  });


  xit('Component construction with wrong arguments', done => {
    let lang = new Lang(42);
    // Component proper instanciation
    expect(lang).not.toEqual(null);
    expect(lang).not.toEqual(undefined);
    // Properties existence test
    expect(lang._lang).not.toEqual(null);
    expect(lang._lang).not.toEqual(undefined);
    expect(typeof lang._lang).toEqual('string');
    expect(lang._lang).toEqual('en');
    expect(lang._nls).not.toEqual(null);
    expect(lang._nls).not.toEqual(undefined);
    expect(typeof lang._nls).toEqual('object');
    expect(lang._nls).toEqual({});
    done();
  });


  it('Component construction', done => {
    let lang = new Lang('fr');
    // Component proper instanciation
    expect(lang).not.toEqual(null);
    expect(lang).not.toEqual(undefined);
    // Properties existence test
    expect(lang._lang).not.toEqual(null);
    expect(lang._lang).not.toEqual(undefined);
    expect(typeof lang._lang).toEqual('string');
    expect(lang._lang).toEqual('fr');
    expect(lang._nls).not.toEqual(null);
    expect(lang._nls).not.toEqual(undefined);
    expect(typeof lang._nls).toEqual('object');
    expect(lang._nls).toEqual({});
    done();
  });

/*
  it('Private method _resolveAsRaw', done => {
    let lang = new Lang();
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
*/

});
