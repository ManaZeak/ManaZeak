'use strict';


// This mother class is a way to proxify the fetch layout and content for all tag views
class AllTagsView {


  constructor(options) {
    this._type = options.type;

    this._dom = {
      wrapper: null
    };
  }


  _init() { // Must be called in child class when needed, and chain the specific view initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(this._getAll.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate(`view/all/${this._type}/layout/`)
        .then((response) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, 'text/html');
            const wrapperClass = `all-${this._type}s-page`;
            this._dom.wrapper = doc.getElementsByClassName(wrapperClass)[0];

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }

  _getAll() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get(`view/all/${this._type}`)
        .then(response => {
          // Resolve promise to build UI in child class
          resolve(response);
        }).catch(reject);
    });
  }



  _viewReady() {
    Events.fire('SceneViewReady');
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllTagsView;