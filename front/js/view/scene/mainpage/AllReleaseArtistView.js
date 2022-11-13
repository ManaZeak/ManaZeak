import SceneView from '../utils/SceneView';


class AllReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/release-artist/all'
    });

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(error => Logger.raise(error));
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
      const artists = this.dom.querySelector('#artist-container').children;
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


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });    
  }


}


export default AllReleaseArtistView;
