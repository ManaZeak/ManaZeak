import TopBar from './topbar/TopBar.js'
import Aside from './maincontainer/Aside.js'
import Scene from './maincontainer/Scene.js'
import FootBar from './footbar/FootBar.js'

class View {
  constructor() {
    this._mainContainer = {};
    this._topBar = {};
    this._leftAside = {};
    this._scene = {};
    this._rightAside = {};
    this._footBar = {};

    this._init();
  }

  _init() {
    this._mainContainer = document.getElementById('mainContainer'); // Used when switching Discover (anciennement modes (partyview, managotit etc))

    this._topBar = new TopBar();
    this._leftAside = new Aside({ side: 'left' });
    this._scene = new Scene();
    this._rightAside = new Aside({ side: 'right' });
    this._footBar = new FootBar();

    this._footBar.getVolumeBar().updateVolume(mzk.getIsMuted(), mzk.getVolume()); // TODO : replace with mzk.getUserVolume() or from localStorage or from opts (serv)
  }

  changeTrack(isPlaying) {
    this.togglePlay(isPlaying);
    this._footBar.getProgressBar().updateDuration(mzk.model.getPlayer().getDuration());
  }

  togglePlay(isPlaying) {
    this._footBar.updatePlayButton(isPlaying);

    if (isPlaying) { // If !playing we don't desactivate ProgressBar -> pause != stop
      this._footBar.getProgressBar().activate();
    }
  }

  stopPlayback(hasSource) {
    // TODO : unselectAll on current view
    this._footBar.updatePlayButton(false); // Send !isPlaying to restore play icon
    this._footBar.getProgressBar().resetProgressBar();
    this._footBar.getProgressBar().resetTimecode();
  }

  initCollection(collection) {
    console.log(collection);
  }

  updateView(view) {
    // TODO? update asides if needed ?
    this._scene.updateView(view);
  }

  updateVolume(isMuted, volume) {
    this._footBar.getVolumeBar().updateVolume(isMuted, volume);
  }

  updateProgress(progress) { // Called onClick
    this._footBar.getProgressBar().desactivateTransitions(); // Must disable transition when called
    this._footBar.getProgressBar().setProgress(progress);

    setTimeout(function() { // Restore transitions
      this._footBar.getProgressBar().activateTransitions();
    }.bind(this), 50); // 5 is fine, but 50 is more 'lag friendly'
  }

  getFootBar() { return this._footBar; }
}

export default View;
