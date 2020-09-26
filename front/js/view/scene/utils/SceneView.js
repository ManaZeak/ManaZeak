'use strict';


class SceneView {


  constructor() {
    // To be done in child class
  }


  destroy() {
    // To be done in child class
  }


  _viewReady() {
    Events.publish('SceneViewReady');
  }


}


export default SceneView;