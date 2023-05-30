import SceneView from './SceneView';


class PlayableView extends SceneView {


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


  _trackClicked(e) {
    const elementHovered = document.elementFromPoint(e.clientX, e.clientY);
    let startTimePercentage = null;
    if (elementHovered.classList.contains('track-moodbar')) {
      const bRect = this.getBoundingClientRect();
      startTimePercentage = ((e.clientX - bRect.left) / bRect.width) * 100;
    }
    mzk.changeTrack({
      id: this.dataset.id,
      playObject: this._buildPlaybackObject(this.dataset.id),
      startTimePercentage: startTimePercentage
    });
  }


  _buildPlaybackObject() {
    // Must be overriden in child class
  }


  _buildTrackObject() {
    // Must be overriden in child class    
  }


  _updatePlaying(data) {
    let scrolled = false;
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
      if (this._tracks[i].dataset.id === data.id) {
        this._tracks[i].classList.add('playing');
        // Only update scroll if visible and not already has been focus
        if (this._tracks[i].scroll.isHidden && !this._tracks[i].scroll.isHidden() && scrolled === false) {
          scrolled = true;
          this._tracks[i].parentNode.scrollTo({
            top: this._tracks[i].offsetTop - this._tracks[i].parentNode.offsetTop,
            left: 0,
            behavior: 'smooth'
          });
          // Not breaking to properly remove playing on next tracks
        }
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


export default PlayableView;
