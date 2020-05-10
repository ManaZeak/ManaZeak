'use strict';


class SceneView {


  constructor() {
    this._dom = {
      container: null
    };
    // No global initialization required
  }


  destroy() {
    this._dom.container = null;
  }


  refreshView() {
    return null;
  }


  fillContext() {
    return null;
  }


  _viewReady() {
    Events.publish('SceneViewReady');
  }


}


export default SceneView;
