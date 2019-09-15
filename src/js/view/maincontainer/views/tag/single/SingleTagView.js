import SceneView from "../../../SceneView";
import Scene from "../../../Scene";
'use strict';


// This mother class is a way to proxify the fetch layout and content for single tag views
class SingleTagView extends SceneView {


  constructor(options) {
    super(options);

    this._type = options.type;

    this._dom = {
      wrapper: null
    };
  }


  _init() { // Must be called in child class when needed, and chain the specific view initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(this._getSingle.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate(`view/single/${this._type}/layout/`)
        .then((response) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, 'text/html');
            const wrapperClass = `single-${this._type}-page`;
            this._dom.wrapper = doc.getElementsByClassName(wrapperClass)[0];

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }

  _getSingle() {
    return new Promise((resolve, reject) => {
      //mzk.komunikator.get(`view/all/${this._type}`)
      //  .then(response => {
          // Resolve promise to build UI in child class
          resolve(/*response*/);
      //  }).catch(reject);
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleTagView;