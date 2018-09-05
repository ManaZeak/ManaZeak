import VolumeBar from './components/VolumeBar.js'
import ProgressBar from './components/ProgressBar.js'

class FootBar {
  constructor() {
    this._controls = {
      play: {},
      stop: {},
      volume: {}
    }
    this._volumeBar = {};
    this._progressBar = {};

    this._init();
    this._events();
  }

  _init() {
    this._controls.play = document.getElementById('play');
    this._controls.stop = document.getElementById('stop');

    this._volumeBar = new VolumeBar();
    this._progressBar = new ProgressBar();
  }

  _events() {
    this._controls.play.addEventListener('click', () => { mzk.togglePlay(); });
    this._controls.stop.addEventListener('click', () => { mzk.stopPlayback(); });
  }

  updatePlayButton(isPlaying) {
    if (isPlaying) {
      this._controls.play.src = '../../static/img/player/pause.svg';
    }

    else if (!isPlaying) {
      this._controls.play.src = '../../static/img/player/play.svg';
    }
  }

  updateVolume(isMuted, volume) {

  }

  getProgressBar() { return this._progressBar; }
  getVolumeBar() { return this._volumeBar; }
}

export default FootBar;
