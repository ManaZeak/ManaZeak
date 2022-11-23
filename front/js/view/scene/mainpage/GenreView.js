import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class GenreView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/genre/${options.id}`
    });

    this._scrolls = [];

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
      this._scrolls.push(new ScrollBar({
        target: this.dom,
        style: {
          color: '#56D45B'
        }
      }));

      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      resolve();
    });    
  }


}


export default GenreView;
