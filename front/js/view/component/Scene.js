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
      const failEvtId = Events.subscribe('SceneViewFailed', errors => {
        // Restore mainpage if view doesn't exists
        this.clearScene();
        this.view = new ViewFactory('MainPage');
        mzk.ui.processLogFromServer(errors);
      }, true);
      Events.subscribe('SceneViewReady', () => {
        this._scene.append(this.view.dom);
        Events.unsubscribe(failEvtId);
        resolve();
      }, true);
      // Scene clearing and view instantiation
      this.clearScene();
      this.view = new ViewFactory(options.name, options);
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
