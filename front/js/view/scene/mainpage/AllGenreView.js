import SceneView from '../utils/SceneView';


class AllGenreView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/genre/all'
    });

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _events() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }  


}


export default AllGenreView;
