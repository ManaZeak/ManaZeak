import SceneView from '../utils/SceneView';


class AlbumView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/album/${options.id}`
    });

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(error => Logger.raise(error));
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      const date = this.dom.querySelector('#album-release-date').innerHTML;
      this.dom.querySelector('#album-duration').innerHTML = Utils.secondsToTimecode(parseFloat(this.dom.querySelector('#album-duration').innerHTML)); 
      this.dom.querySelector('#album-release-date').innerHTML = Utils.formatDate(date);
      const tracks = this.dom.querySelector('#album-tracks').children;
      for (let i = 0; i < tracks.length; ++i) {
        const duration = tracks[i].children[0].children[1];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      const performers = this.dom.querySelector('#performers-container').children;
      for (let i = 0; i < performers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', performers[i], this._artistClicked, performers[i]));
      }
  
      const ra = this.dom.querySelector('#release-artist'); // Text artist name
      const rac = this.dom.querySelector('#release-artist-container'); // Artist picture
      this._evtIds.push(Evts.addEvent('click', rac, this._artistClicked, ra));
      this._evtIds.push(Evts.addEvent('click', ra, this._artistClicked, ra));
      resolve();
    });
  }


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


}


export default AlbumView;
