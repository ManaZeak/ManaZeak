import SceneView from '../utils/SceneView';
'use strict';


class MainPageView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null
    };

    this._fetchWrapper()
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.kom.getText('/fragment/mainpage/').then(response => {
        this._dom.wrapper = Utils.parseHTMLFragment(response);
        resolve();
      }).catch(reject);
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default MainPageView;