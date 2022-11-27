import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';


class GenreView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/genre/${options.id}`
    });

    this._artists = [];
    this._albums = [];
    this._tracks = [];
    this._scrolls = [];

    this._changeTrackEvt = -1;

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Evts.unsubscribe(this._changeTrackEvt);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      this._artists = this.dom.querySelectorAll('.artist-info');
      this._albums = this.dom.querySelectorAll('.album-info');
      this._tracks = this.dom.querySelectorAll('.track');
      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].children[1];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }

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
      for (let i = 0; i < this._artists.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._artists[i], this._artistClicked, this._artists[i]));
      }

      for (let i = 0; i < this._albums.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._albums[i], this._albumClicked, this._albums[i]));
      }

      for (let i = 0; i < this._tracks.length; ++i) {
        this._tracks[i]._buildPlaybackObject = this._buildPlaybackObject.bind(this);
        this._evtIds.push(Evts.addEvent('click', this._tracks[i], this._trackClicked, this._tracks[i]));
      }

      this._changeTrackEvt = Evts.subscribe('ChangeTrack', this._trackChanged.bind(this));

      resolve();
    });    
  }


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _albumClicked() {
    mzk.setView({
      name: 'Album',
      id: this.dataset.id
    });
  }


  _trackClicked() {
    mzk.changeTrack({
      id: this.dataset.id,
      playObject: this._buildPlaybackObject(this.dataset.id)
    });
  }


  _buildPlaybackObject() {
    return {
      type: 'genre'
    };
  }


  _trackChanged(data) {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
      if (this._tracks[i].dataset.id === data.id) {
        this._tracks[i].classList.add('playing');
        // Not breaking to properly remove playing on next tracks
      }
    }
  }


}


export default GenreView;
