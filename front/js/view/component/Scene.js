import ViewFactory from '../scene/ViewFactory';
'use strict';


class Scene {


  constructor() {
    this._scene = document.getElementById('scene');
    this.view = null;
  }


  clearScene() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }

    this._scene.innerHTML = '';
  }


  buildView(options) {
    return new Promise((resolve, reject) => {
      Events.subscribe('SceneViewReady', () => {
        this._scene.append(this.view.dom);
        resolve();
      }, true);

      this.clearScene();
      this.view = new ViewFactory(options.name, options);

      if (this.view === null) {
        this.view = new ViewFactory('MainPage');
      }
      // Reject view build if it exceed 5 seconds
      setTimeout(reject, 5000);
    });
  }


}


export default Scene;
