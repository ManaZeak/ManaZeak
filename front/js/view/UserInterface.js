import Scene from './component/Scene';
import Aside from './component/Aside';
'use strict';


class UserInterface {


  constructor() {
    this._aside = new Aside();
    this._scene = new Scene();

  }


  setSceneView(options) {
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(this._scene.buildView.bind(this._scene, options))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this));
    });
  }


  startLoading() {
    return new Promise(resolve => {
      resolve();
    });
  }


  stopLoading() {
    return new Promise(resolve => {
      resolve();
    });
  }

}


export default UserInterface;
