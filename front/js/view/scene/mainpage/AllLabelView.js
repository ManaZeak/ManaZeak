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


  _events() {
    return new Promise((resolve, reject) => {
      resolve();
/*
      const labels = this.dom.querySelector('#labels-container').children;
      if (labels && labels.length) {
        for (let i = 0; i < labels.length; ++i) {
          this._evtIds.push(Evts.addEvent('click', labels[i], this._labelClicked, labels[i]));
        }
        resolve();
      } else {
        reject();
      }
*/
    });
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
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
