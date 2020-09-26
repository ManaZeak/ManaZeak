import SceneView from '../utils/SceneView';
'use strict';


class UserPageView extends SceneView {


  constructor(options) {
    super(options);

    this._fetchWrapper('/fragment/user-profile/')
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


export default UserPageView;
