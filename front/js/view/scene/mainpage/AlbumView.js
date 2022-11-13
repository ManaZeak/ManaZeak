import SceneView from '../utils/SceneView';
import ScrollBar from '../../navigation/ScrollBar';


class AlbumView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/album/${options.id}`
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
      const date = this.dom.querySelector('#album-release-date').innerHTML;
      this.dom.querySelector('#album-duration').innerHTML = Utils.secondsToTimecode(parseFloat(this.dom.querySelector('#album-duration').innerHTML)); 
      this.dom.querySelector('#album-release-date').innerHTML = Utils.formatDate(date);
      const tracks = this.dom.querySelector('#album-tracks').children;
      for (let i = 0; i < tracks.length; ++i) {
        const duration = tracks[i].children[0].children[1];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }

      const performers = this.dom.querySelector('#performers-container').children;
      for (let i = 0; i < performers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', performers[i], this._performerClicked, performers[i]));
      }

      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#release-artist-container'), this._releaseArtistClicked, this.dom.querySelector('#release-artist')));
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#release-artist'), this._releaseArtistClicked, this.dom.querySelector('#release-artist')));
      resolve();
    });
  }


  _releaseArtistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _performerClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });    
  }


}


export default AlbumView;
