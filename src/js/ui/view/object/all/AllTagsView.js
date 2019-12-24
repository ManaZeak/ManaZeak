import SceneView from "../../SceneView";
'use strict';


// This mother class is a way to proxify the fetch layout and content for all object views
class AllTagsView extends SceneView {


  constructor(options) {
    super(options);

    this._type = options.type;

    this._dom = {
      wrapper: null,
      title: null,
      description: null
    };
  }


  _init() { // Must be called in child class when needed, and chain the specific ui initialization with then
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
            
            this._dom.wrapper = doc.getElementsByClassName(`all-${this._type}s-page`)[0];
            this._dom.title = doc.getElementsByClassName(`all-objects-title`)[0];
            this._dom.description = doc.getElementsByClassName(`all-objects-description`)[0];

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


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllTagsView;