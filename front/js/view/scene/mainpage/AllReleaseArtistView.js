import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class AllReleaseArtistView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: '/fragment/library/release-artist/all'
    });

    this._fetchWrapper(this._url)
      .then(this._events.bind(this)) // We listen events first before altering the DOM
      .then(this._buildNavigation.bind(this))
      .then(this._viewReady)
      .catch(error => Logger.raise(error));
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
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


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      const artists = this.dom.querySelector('#artist-container').children;
      if (artists && artists.length) {
        let currentLetter = '';
        for (let i = 0; i < artists.length; ++i) {
          const artistFirstLetter = artists[i].children[0].children[1].innerHTML[0];
          if (currentLetter !== artistFirstLetter) {
            currentLetter = artistFirstLetter.toUpperCase();
            const separator = document.createElement('H1');
            separator.classList.add('section-separator');
            separator.innerHTML = currentLetter;
            this.dom.querySelector('#artist-container').insertBefore(separator, artists[i]);
          }
        }

        this._scroll = new ScrollBar({
          target: this.dom,
          style: {
            color: '#56D45B'
          }
        })
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