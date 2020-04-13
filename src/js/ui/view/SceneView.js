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
    Events.fire('SceneViewReady');
  }


}


export default SceneView;
