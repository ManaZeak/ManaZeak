import ProgressBar from '../modules/ProgressBar.js'

class FootBar {
  constructor() {
    this._controls = {
      play: {},
      stop: {}
    }
    this._progressBar = {};

    this._init();
    this._events();
  }

  _init() {
    this._controls.play = document.getElementById('play');
    this._controls.stop = document.getElementById('stop');

    this._progressBar = new ProgressBar({
      timecode: false
    });
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

  getProgressBar() { return this._progressBar; }
}

export default FootBar;
