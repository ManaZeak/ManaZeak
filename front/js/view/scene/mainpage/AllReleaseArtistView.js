import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class AllReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/release-artist/all/'
    });

    this._fetchWrapper(this._url)
      .then(this._events.bind(this)) // We listen events first before altering the DOM
      .then(this._buildNavigation.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _events() {
    return new Promise((resolve, reject) => {
      const artists = this.dom.querySelector('#artists-container').children;
      if (artists && artists.length) {
        for (let i = 0; i < artists.length; ++i) {
          this._evtIds.push(Evts.addEvent('click', artists[i], this._artistClicked, artists[i]));
        }
        resolve();
      } else {
        reject();
      }
    });    
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      const artists = this.dom.querySelector('#artists-container').children;
      if (artists && artists.length) {
        this.dom.querySelector('#artist-count').innerHTML = this.dom.querySelector('#artist-count').innerHTML.replace('{x}', artists.length);
        this._scroll = new ScrollBar({
          target: this.dom,
          style: {
            color: '#56D45B'
          }
        });
        resolve();
      } else {
        reject();
      }
    });
  }  


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });    
  }


  getDisplayName() {
    return 'All release artists';
  }


}


export default AllReleaseArtistView;
