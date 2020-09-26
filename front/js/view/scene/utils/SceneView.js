'use strict';


class SceneView {


  constructor() {
    this.wrapper = null;
  }


  destroy() {
    this.wrapper = null;
  }


  _fetchWrapper(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url)
        .then(response => {
          this.wrapper = Utils.parseHTMLFragment(response);
          resolve();
        })
        .catch(reject);
    });
  }


  _viewReady() {
    Events.publish('SceneViewReady');
  }


  get dom() {
    return this.wrapper;
  }


}


export default SceneView;
