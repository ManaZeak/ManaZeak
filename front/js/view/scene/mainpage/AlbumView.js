import ScrollBar from '../../navigation/ScrollBar';
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
      .catch(this._viewFailed);
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

      this._scroll = new ScrollBar({
        target: this.dom.querySelector('#album-tracks'),
        style: {
          color: '#56D45B'
        }
      });

      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#album-picture'), this._coverClicked, this));

      const performers = this.dom.querySelector('#album-performers').children;
      for (let i = 0; i < performers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', performers[i], this._artistClicked, performers[i]));
      }
  
      const rlArtist = this.dom.querySelector('#release-artist'); // Text artist name
      const rlArtistContainer = this.dom.querySelector('#release-artist-container'); // Artist picture
      this._evtIds.push(Evts.addEvent('click', rlArtistContainer, this._artistClicked, rlArtist));
      this._evtIds.push(Evts.addEvent('click', rlArtist, this._artistClicked, rlArtist));

      const label = this.dom.querySelector('#album-label');
      this._evtIds.push(Evts.addEvent('click', label, this._labelClicked, label));

      const tracks = this.dom.querySelector('#album-tracks').children;
      for (let i = 0; i < tracks.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', tracks[i], this._trackClicked, tracks[i]));
      }

      resolve();
    });
  }


  _coverClicked() {
    mzk.setModal({
      name: 'AlbumCover',
      path: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      title: this.dom.querySelector('#release-artist').nextElementSibling.innerHTML,
      artist: this.dom.querySelector('#release-artist').innerHTML
    });
  }


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _labelClicked() {
    mzk.setView({
      name: 'Label',
      id: this.dataset.id
    });
  }


  _trackClicked() {
    mzk.changeTrack({
      id: this.dataset.id
    });
  }


}


export default AlbumView;
