import SceneView from '../../utils/SceneView';


class ArtistItemView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/artist/${options.id}`
    });

    this._fetchWrapper(this._url)
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


export default ArtistItemView;
