import SceneView from '../utils/SceneView';
'use strict';


class MainPageView extends SceneView {


  constructor(options) {
    super(options);

    this._fetchWrapper('/fragment/mainpage/')
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


}


export default MainPageView;
