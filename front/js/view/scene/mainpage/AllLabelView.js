import SceneView from '../utils/SceneView';


class AllLabelView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/label/all/'
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
      console.log('events');
      resolve();
    });
  }


  _labelClicked() {
    mzk.setView({
      name: 'Label',
      id: this.dataset.id
    });     
  }


  getDisplayName() {
    return 'All labels';
  }



}


export default AllLabelView;
