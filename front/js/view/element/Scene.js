import ViewFactory from '../scene/ViewFactory';
import ModalFactory from '../modal/ModalFactory';


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
      const failEvtId = Evts.subscribe('SceneViewFailed', errors => {
        // Restore mainpage if view doesn't exists
        // Don't unsubscribe ready evt as we load MainPage that requires this evt
        this.clearScene();
        this.view = new ViewFactory('MainPage');
        mzk.ui.processLogFromServer(errors);
      }, true);
      Evts.subscribe('SceneViewReady', data => {
        this._scene.append(this.view.dom);
        Evts.unsubscribe(failEvtId);
        resolve();
      }, true);
      // Scene clearing and view instantiation
      this.clearScene();
      this.view = new ViewFactory(options.name, options);
      // Reject view build if it exceeds 20 seconds
      setTimeout(reject, 20000);
    });
  }


  buildModal(options) {
    return new Promise(resolve => {
      this.modal = new ModalFactory(options.name, options);
      resolve();
    });
  }


  closeModal() {
    if (this.modal) {
      this.modal.close();
    }
  }


}


export default Scene;
