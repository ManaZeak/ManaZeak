import SceneView from '../utils/SceneView';


class AllReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/release-artist/all'
    });

    this._fetchWrapper(this._url)
      .then(this._makeInteractive.bind(this))
      .then(this._viewReady)
      .catch(error => Logger.raise(error));
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _makeInteractive() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }


}


export default AllReleaseArtistView;
