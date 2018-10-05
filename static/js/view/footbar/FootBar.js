import VolumeBar from './components/VolumeBar.js';
import ProgressBar from './components/ProgressBar.js';
'use_strict';

class FootBar {
  /**
	* @summary ManaZeak FootBar
	* @author Arthur Beaulieu
  * @since July 2018
	* @description Handle all components in the FootBar and all related events
	**/
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

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
  * @method
  * @name _init
  * @private
  * @memberof FootBar
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Init the FootBar with controls, a volume bar and a progress bar
  **/
  _init() {
    this._controls.play = document.getElementById('play');
    this._controls.stop = document.getElementById('stop');

    this._volumeBar = new VolumeBar();
    this._progressBar = new ProgressBar();
  }

  /**
  * @method
  * @name _events
  * @private
  * @memberof FootBar
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Handle al controls click events
  **/
  _events() {
    this._controls.play.addEventListener('click', () => { mzk.togglePlay(); });
    this._controls.stop.addEventListener('click', () => { mzk.stopPlayback(); });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
	* @method
	* @name updatePlayButton
	* @public
	* @memberof FootBar
	* @author Arthur Beaulieu
  * @since July 2018
	* @description Updates the play icon according to a given state
  * @param {boolean} isPlaying - The player playback state
	**/
  updatePlayButton(isPlaying) {
    if (isPlaying) {
      this._controls.play.src = '../../static/img/player/pause.svg';
    }

    else if (!isPlaying) {
      this._controls.play.src = '../../static/img/player/play.svg';
    }
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getProgressBar() { return this._progressBar; }
  getVolumeBar() { return this._volumeBar; }
}

export default FootBar;
