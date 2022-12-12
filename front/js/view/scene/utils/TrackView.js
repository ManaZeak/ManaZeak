import SceneView from './SceneView';


class TrackView extends SceneView {


  constructor(options) {
    super(options);
    this._tracks = [];
    this._trackContext = null;
    this._changeTrackEvt = null;
  }


  destroy() {
    super.destroy();
    if (this._trackContext && this._trackContext.destroy) {
      this._trackContext.destroy();
    }
    Evts.unsubscribe(this._changeTrackEvt);
  }


  _events() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i]._buildPlaybackObject = this._buildPlaybackObject.bind(this);
      this._evtIds.push(Evts.addEvent('click', this._tracks[i], this._trackClicked, this._tracks[i]));
    }

    this._changeTrackEvt = Evts.subscribe('ChangeTrack', this._updatePlaying.bind(this));
  }


  _trackClicked() {
    mzk.changeTrack({
      id: this.dataset.id,
      playObject: this._buildPlaybackObject(this.dataset.id)
    });
  }


  _buildPlaybackObject() {
    // Must be overriden in child class
  }


  _buildTrackObject() {
    // Must be overriden in child class    
  }


  _updatePlaying(data) {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
      if (this._tracks[i].dataset.id === data.id) {
        this._tracks[i].classList.add('playing');
        // Not breaking to properly remove playing on next tracks
      }
    }
  }


  stopPlayback() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
    }
  }


  playFirstTrack() {
    mzk.changeTrack({
      id: this._tracks[0].dataset.id,
      playObject: this._buildPlaybackObject(this._tracks[0].dataset.id)
    });    
  }


  getTrackById(id) {
    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].dataset.id === id) {
        return this._buildTrackObject(this._tracks[i]);
      }
    }

    return {};
  }


}


export default TrackView;
