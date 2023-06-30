import VolumeBar from '../control/VolumeBar.js';
import ProgressBar from '../control/ProgressBar.js';
import QueueContext from '../context/QueueContext.js';
import PlaybackRateContext from '../context/PlaybackRateContext.js';


class NavBar {


  constructor() {
     this._controls = {
      play: {},
      stop: {},
      volume: {},
      previous: {},
      next: {},
      repeat: {},
      shuffle: {},
      speedometer: {},
      queue: {}
    };

    this._volumeBar = {};
    this._progressBar = {};
    this._playbackRateContext = {};
    this._queueContext = {};
    this._mmodbar = {};

    this._init();
    this._events();
  }


  _init() {
    this._controls.play = document.getElementById('play');
    this._controls.stop = document.getElementById('stop');
    this._controls.previous = document.getElementById('previous');
    this._controls.next = document.getElementById('next');
    this._controls.repeat = document.getElementById('repeat');
    this._controls.shuffle = document.getElementById('shuffle');
    this._controls.speedometer = document.getElementById('speedometer');
    this._controls.queue = document.getElementById('queue');

    this._volumeBar = new VolumeBar();
    this._progressBar = new ProgressBar();

    this._playbackRateContext = new PlaybackRateContext({
      target: document.body,
      name: 'playbackrate'
    });

    this._queueContext = new QueueContext({
      target: document.body,
      name: 'queue'
    });

    this._moodbar = document.getElementById('progress-moodbar');
  }


  _events() {
    this._controls.play.addEventListener('click', () => {
      mzk.togglePlay();
    });

    this._controls.stop.addEventListener('click', () => {
      mzk.stopPlayback();
    });

    this._controls.previous.addEventListener('click', () => {
      mzk.previous();
    });

    this._controls.next.addEventListener('click', () => {
      mzk.next();
    });

    this._controls.repeat.addEventListener('click', () => {
      mzk.toggleRepeatMode();
    });

    this._controls.speedometer.addEventListener('click', () => {
      if (document.body.contains(this._playbackRateContext.dom)) {
        this._playbackRateContext.close();
        this._playbackRateContext = null;
      } else {
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const clientRectangle = this._controls.speedometer.getBoundingClientRect();
        this._playbackRateContext.open({
          rightOffset: windowWidth - (clientRectangle.x + clientRectangle.width + 5)
        });
      }
    });

    this._controls.queue.addEventListener('click', () => {
      if (document.body.contains(this._queueContext.dom)) {
        this._queueContext.close();
      } else {
        const clientRectangle = this._controls.queue.getBoundingClientRect();
        this._queueContext.open({
          leftOffset: clientRectangle.x
        });
      }
    });
  }


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
      this._controls.play.src = '/static/img/player/pause.svg';
    } else {
      this._controls.play.src = '/static/img/player/play.svg';
    }
  }


  updatePlaybackRate(playbackRate) {
    if (this._playbackRateContext !== null) {
      this._playbackRateContext.updatePlaybackRate(playbackRate);
    }
  }


  updateRepeatMode(value) {
    if (value === 0) {
      this._controls.repeat.src = '/static/img/player/repeat-off.svg';
      this._controls.repeat.parentNode.dataset.tooltip = this._controls.repeat.dataset.repeatoff;
    } else if (value === 1) {
      this._controls.repeat.src = '/static/img/player/repeat-one.svg';
      this._controls.repeat.parentNode.dataset.tooltip = this._controls.repeat.dataset.repeatone;
    } else if (value === 2) {
      this._controls.repeat.src = '/static/img/player/repeat-all.svg';
      this._controls.repeat.parentNode.dataset.tooltip = this._controls.repeat.dataset.repeatall;
    }
    // Update tooltip displayed text
    this._controls.repeat.parentNode.lastElementChild.textContent = this._controls.repeat.parentNode.dataset.tooltip;
  }


  updateMoodbar(mood) {
    const evtId = Evts.addEvent('error', this._moodbar, () => {
      Evts.removeEvent(evtId);
      this._moodbar.src = `/static/img/moodbar/default-1k.webp`;
    });
    this._moodbar.src = `/resources/moods/hd/${mood}`;
  }



  //  ------------------------------------------------------------------------------------------------//
  //  ---------------------------------------  QUEUE METHODS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name updateQueueNumber
   * @public
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Updates the superscript queue length over the queue icon
   * @param {array} queue - The current session queue
   **/
  updateQueueNumber(length) {
    if (length === 0) {
      length = '';
    }

    this._controls.queue.parentNode.dataset.before = length;
  }


  setQueuedTracks(queuedTracks) {
    this._queueContext.updateQueuedTracks(queuedTracks);
    this.updateQueueNumber(queuedTracks.length);
  }


  setQueuedPlayObject(playObject) {
    this._queueContext.updateQueuedPlayObject(playObject);    
  }



  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  get playbackRateContext() {
    return this._playbackRateContext;
  }


  /** @public
   * @member {object} - The FootBar's progress bar public accessor */
  get progressBar() {
    return this._progressBar;
  }


  /** @public
   * @member {object} - The FootBar's volume bar public accessor */
  get volumeBar() {
    return this._volumeBar;
  }


  /** @public
   * @member {number} - The FootBar control shuffle mode value in range int[0, 2] */
  set shuffleMode(value) {
    if (value === 0) {
      this._controls.shuffle.src = '/static/img/player/shuffle-off.svg';
      this._controls.shuffle.parentNode.dataset.tooltip = mzk.lang.player.shuffle.off;
    } else if (value === 1) {
      this._controls.shuffle.src = '/static/img/player/shuffle-on.svg';
      this._controls.shuffle.parentNode.dataset.tooltip = mzk.lang.player.shuffle.shuffle;
    } else if (value === 2) {
      this._controls.shuffle.parentNode.dataset.tooltip = mzk.lang.player.shuffle.on;
      this._controls.shuffle.src = '/static/img/player/shuffle-random-on.svg';
    }
  }


}


export default NavBar;
