import VolumeBar from './components/VolumeBar.js';
import ProgressBar from './components/ProgressBar.js';
import QueueContext from './components/QueueContext.js';
'use strict';

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
      volume: {},
      previous: {},
      next: {},
      repeat: {},
      queue: {}
    };
    this._volumeBar = {};
    this._progressBar = {};
    this._queueContext = {};

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
    this._controls.previous = document.getElementById('previous');
    this._controls.next = document.getElementById('next');
    this._controls.repeat = document.getElementById('repeat');
    this._controls.queue = document.getElementById('queue');

    this._volumeBar = new VolumeBar();
    this._progressBar = new ProgressBar();
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
   * @description Handle al controls click events
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
      mzk.nextTrackInView();
    });

    this._controls.repeat.addEventListener('click', () => {
      mzk.toggleRepeatMode();
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
    } else {
      this._controls.play.src = '../../static/img/player/play.svg';
    }
  }

  /**
   * @method
   * @name renderMoodFile
   * @public
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Render a mood file into the progress-moodbar container
   * @param {string} url - The url to fetch the modd file
   **/
  renderMoodFile(url) {
    mzk.komunikator.getBinaryResponse(url)
      .then((responseText) => {
        // Original code from : https://gist.github.com/Valodim/5225460
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

        const svg = d3.select(this._progressBar.getMoodbarContainer().childNodes[1]).append('g');

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


  //  --------------------------------  GETTER METHODS   --------------------------------  //


  get progressBar() {
    return this._progressBar;
  }


  get volumeBar() {
    return this._volumeBar;
  }


  set repeatMode(value) {
    if (value === 0) {
      this._controls.repeat.src = '/static/img/player/repeat-off.svg';
    } else if (value === 1) {
      this._controls.repeat.src = '/static/img/player/repeat-one.svg';
    } else if (value === 2) {
      this._controls.repeat.src = '/static/img/player/repeat-all.svg';
    }
  }


}


export default FootBar;
