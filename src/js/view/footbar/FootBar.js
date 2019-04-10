import VolumeBar from './components/VolumeBar.js';
import ProgressBar from './components/ProgressBar.js';
import QueueContext from '../utils/contexts/QueueContext.js';
import PlaybackRateContext from '../utils/contexts/PlaybackRateContext.js';
'use strict';


class FootBar {


  /**
   * @summary ManaZeak FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description <blockquote>Handle all components in the FootBar and all related events</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The FootBar DOMs element (play, stop, mute volume, previous, next, repeat, queue) */
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
    /** @private
     * @member {object} - The volume bar object */
    this._volumeBar = {};
    /** @private
     * @member {object} - The progress bar object */
    this._progressBar = {};
    /** @private
     * @member {object} - The PlaybackRate context */
    this._playbackRateContext = {};
    /** @private
     * @member {object} - The Queue context */
    this._queueContext = {};

    this._init();
    this._events();
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name _init
   * @private
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Init the FootBar with controls, a volume bar, a progress bar and a queue
   **/
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
      url: 'contexts/PlaybackRateContext/'
    });
    this._queueContext = new QueueContext({
      target: document.body,
      url: 'contexts/queuecontext/'
    });
  }


  /**
   * @method
   * @name _events
   * @private
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Handle all controls click events
   **/
  _events() {
    this._controls.play.addEventListener('click', () => {
      mzk.togglePlay();
    });

    this._controls.stop.addEventListener('click', () => {
      mzk.stopPlayback();
    });

    this._controls.previous.addEventListener('click', () => {
      mzk.previousTrackInView();
    });

    this._controls.next.addEventListener('click', () => {
      mzk.next();
    });

    this._controls.repeat.addEventListener('click', () => {
      mzk.toggleRepeatMode();
    });

    this._controls.shuffle.addEventListener('click', () => {
      mzk.toggleShuffleMode();
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
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const clientRectangle = this._controls.queue.getBoundingClientRect();

        this._queueContext.open({
          rightOffset: windowWidth - (clientRectangle.x + clientRectangle.width),
          queue: mzk.model.queuedTracks
        });
      }
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CONTROLS METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
    } else {
      this._controls.play.src = '../../static/img/player/play.svg';
    }
  }


  updatePlaybackRate(playbackRate) {
    if (this._playbackRateContext !== null) {
      this._playbackRateContext.updatePlaybackRate(playbackRate);
    }
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
  updateQueueNumber(queue) {
    let length = queue.length;

    if (length === 0) {
      length = '';
    }

    this._controls.queue.parentNode.dataset.before = length;
  }


  updateQueuedTracks(queuedTracks) {
    if (this._queueContext.isOpen() === true) {
      this._queueContext.updateQueuedTracks(queuedTracks);
    }
  }

  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  MOODBAR METHODS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name renderMoodFile
   * @public
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Render a mood file into the progress-moodbar container.
   * Original code from : <a href="https://gist.github.com/Valodim/5225460">https://gist.github.com/Valodim/5225460</a>
   * @param {string} url - The url to fetch the modd file
   **/
  renderMoodFile(url) {
    mzk.komunikator.getBinaryResponse(url)
      .then((responseText) => {
        const rgb = [...Array((responseText.length / 3))];

        for (let i = 0; i < rgb.length; ++i) {
          // `& 0xff` Force 8bit long integer (to fit rgb range of values)
          const r = responseText.charCodeAt(i * 3) & 0xff;
          const g = responseText.charCodeAt((i * 3) + 1) & 0xff;
          const b = responseText.charCodeAt((i * 3) + 2) & 0xff;

          rgb[i] = { // Enhancement : Have fun here w/ colors and pref
            offset: `${(i / rgb.length * 100)}%`,
            color: `rgba(${r}, ${g}, ${b}, 1)`
          };
        }

        const svg = d3.select(this._progressBar.moodbarContainer.childNodes[1]).append('g');

        svg.append('linearGradient')
          .attr('id', `moodbar-gradient-${url[0] + url[1]}`)
          .attr('gradientUnits', 'userSpaceOnUse')
          .selectAll('stop')
          .data(rgb)
          .enter()
          .append('stop')
          .attr('offset', d => {
            return d.offset;
          })
          .attr('stop-color', d => {
            return d.color;
          });

        svg.append('rect')
          .attr('fill', `url(#moodbar-gradient-${url[0] + url[1]})`)
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', '100%')
          .attr('width', '100%');
      });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
   * @member {number} - The FootBar control repeat mode value in range int[0, 2] */
  set repeatMode(value) {
    if (value === 0) {
      this._controls.repeat.src = '/static/img/player/repeat-off.svg';
    } else if (value === 1) {
      this._controls.repeat.src = '/static/img/player/repeat-one.svg';
    } else if (value === 2) {
      this._controls.repeat.src = '/static/img/player/repeat-all.svg';
    }
  }


  /** @public
   * @member {number} - The FootBar control shuffle mode value in range int[0, 2] */
  set shuffleMode(value) {
    if (value === 0) {
      this._controls.shuffle.src = '/static/img/player/shuffle-off.svg';
    } else if (value === 1) {
      this._controls.shuffle.src = '/static/img/player/shuffle-on.svg';
    } else if (value === 2) {
      this._controls.shuffle.src = '/static/img/player/shuffle-random-on.svg';
    }
  }


}


export default FootBar;
