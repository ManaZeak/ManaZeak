import SceneView from '../utils/SceneView';


class LabelView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/label/${options.id}/`
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


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      resolve();
    });    
  }


  getDisplayName() {
    return 'Label';
  }


}


export default LabelView;
