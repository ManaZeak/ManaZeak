import ViewFactory from '../scene/ViewFactory';
import ModalFactory from '../modal/ModalFactory';
'use strict';


class Scene {


  constructor() {
    this._scene = document.getElementById('scene');
    this.view = null;
    this.modal = null;
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
      // Restore mainpage if view doesn't exists
      if (this.view === null) {
        this.view = new ViewFactory('MainPage');
        // TODO raise warning
      }
      // Reject view build if it exceed 5 seconds
      setTimeout(reject, 5000);
    });
  }


  buildModal(options) {
    return new Promise(resolve => {
      this.modal = new ModalFactory(options.name, options);
      resolve();
    });
  }


}


export default Scene;
