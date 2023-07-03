class PlaybackRateBar {


  /**
   * @summary UI VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description <blockquote>Interactive playback rate bar that is linked to ManaZeak logic</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The VolumeBar DOM elements */
    this._playbackRate = {
      container: {},
      current: {},
      thumb: {},
      text: {},
      reset: {},
      slower: {},
      faster: {}
    };
    /** @private
     * @member {boolean} - Flag to notify that user is currently dragging the volume bar thumb */
    this._isDragging = false;
    // Event binding
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._mouseDown = this._mouseDown.bind(this);
    this._resetPlaybackRate = this._resetPlaybackRate.bind(this);
    this._adjustPlaybackRateSlower = this._adjustPlaybackRateSlower.bind(this);
    this._adjustPlaybackRateFaster = this._adjustPlaybackRateFaster.bind(this);
    this._scrolledInto = this._scrolledInto.bind(this);
    // Init plabackratebar
    this._init()
      .then(this._addEvents.bind(this))
      .catch(errorCode => {
        Logger.raise({
          code: errorCode,
          frontend: true
        });
      });
  }


  destroy() {
    this._removeEvents();
    Utils.removeAllObjectKeys(this);
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  _init() {
    return new Promise((resolve, reject) => {
      // All playback rate elements are in <code>app/templates/index.html</code>
      this._playbackRate = {
        container: document.getElementById('playback-rate-container'),
        current: document.getElementById('playback-rate-current'),
        thumb: document.getElementById('playback-rate-thumb'),
        text: document.getElementById('playback-rate-text'),
        reset: document.getElementById('reset-playback-rate'),
        slower: document.getElementById('playback-rate-slower'),
        faster: document.getElementById('playback-rate-faster')
      };
      // Check proper DOM construction or reject if missing DOM elements
      Object.keys(this._playbackRate).forEach(key => {
        // If one of playbackRate is null, reject
        if (this._playbackRate[key] === null) {
          reject('MISSING_DOM_ELEMENTS');
        }
      });
      // Init successful
      resolve();
    });
  }


  /**
   * @method
   * @name _events
   * @private
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Attach mouse events to the DOM elements
   **/
  _addEvents() {
    this._playbackRate.container.addEventListener('mousedown', this._mouseDown, false);
    this._playbackRate.reset.addEventListener('click', this._resetPlaybackRate, false);
    this._playbackRate.slower.addEventListener('click', this._adjustPlaybackRateSlower, false);
    this._playbackRate.faster.addEventListener('click', this._adjustPlaybackRateFaster, false);
    this._playbackRate.container.addEventListener('wheel', this._scrolledInto, true);
  }


  _removeEvents() {
    this._playbackRate.container.removeEventListener('mousedown', this._mouseDown, false);
    this._playbackRate.reset.removeEventListener('click', this._resetPlaybackRate, false);
    this._playbackRate.slower.removeEventListener('click', this._adjustPlaybackRateSlower, false);
    this._playbackRate.faster.removeEventListener('click', this._adjustPlaybackRateFaster, false);
    this._playbackRate.container.removeEventListener('wheel', this._scrolledInto, true);
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ---------------------------------------  MOUSE EVENTS  ---------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name _mouseDown
   * @private
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description When a mouse down event is triggered on <code>this.volume.container</code>,
   * attach mouse events to the windows while is <code>this._isDragging</code> is a true
   * @param {object} event - The mouse down event
   **/
  _mouseDown(event) {
    if (!this._isDragging && (event.target.id === 'playback-rate-wrapper' ||
        event.target.id === 'playback-rate-container' ||
        event.target.id === 'playback-rate-current' ||
        event.target.id === 'playback-rate-thumb')) {

      this._isDragging = true;
      this._setPlaybackRateFromEvent(event);

      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);
    }
  }


  /**
   * @method
   * @name _mouseMove
   * @private
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Change volume according to the mouse position in window
   * @param {object} event - The mouse down event
   **/
  _mouseMove(event) {
    if (this._isDragging) {
      this._setPlaybackRateFromEvent(event);
    }
  }


  /**
   * @method
   * @name _mouseUp
   * @private
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description End all mouse events attached to the window. Revoke the <code>this._isDragging</code> truthness
   **/
  _mouseUp() {
    if (this._isDragging) {
      this._isDragging = false;
      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
    }
  }


  /**
   * @method
   * @name _setVolumeFromEvent
   * @private
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Converts the user's mouse position into a volume value and send update info to <code>Mzk</code> controller
   * @param {object} event - The mouse event
   **/
  _setPlaybackRateFromEvent(event) {
    // Get container bound rectangle and compute difference in px and % (pr)
    const boundRect = this._playbackRate.container.getBoundingClientRect();
    const toLeftInPx = event.clientX - boundRect.left; // Client X position minus container left X position equals X variation from container left side
    let toLeftInPr = (toLeftInPx * 100) / boundRect.width; // Get width percentage depending on container width
    // OOB protection
    if (toLeftInPr > 100) {
      toLeftInPr = 100;
    }
    if (toLeftInPr < 0) {
      toLeftInPr = 0;
    }

    // Set mzk global volume
    mzk.setPlaybackRate(toLeftInPr / 100);
  }


  _getPlaybackRateFromProgress() {
    const boundRectContainer = this._playbackRate.container.getBoundingClientRect();
    const boundRectProgress = this._playbackRate.current.getBoundingClientRect();
    let toLeftInPr = (boundRectProgress.width * 100) / boundRectContainer.width; // Get width percentage depending on container width
    // OOB protection
    if (toLeftInPr > 100) {
      toLeftInPr = 100;
    }
    if (toLeftInPr < 0) {
      toLeftInPr = 0;
    }

    return toLeftInPr / 100;
  }


  _resetPlaybackRate() {
    mzk.setPlaybackRate(0.5);
  }


  _adjustPlaybackRateSlower() {
    const progressPercentage = Utils.precisionRound(this._getPlaybackRateFromProgress(), 2);

    if (progressPercentage - 0.1 >= 0) {
      mzk.setPlaybackRate(progressPercentage - 0.1);
    } else {
      mzk.setPlaybackRate(0);
    }
  }


  _adjustPlaybackRateFaster() {
    const progressPercentage = Utils.precisionRound(this._getPlaybackRateFromProgress(), 2);

    if (progressPercentage + 0.05 < 1) { // .05 because range from [1, 2] is twice larger than [.5, 1]
      mzk.setPlaybackRate(progressPercentage + 0.05);
    } else {
      mzk.setPlaybackRate(1);
    }
  }


  _scrolledInto(e) {
    // Scrolling up
    if (e.deltaY < 0) {
      this._adjustPlaybackRateFaster();
    } else {
      this._adjustPlaybackRateSlower();
    }
  }


  /**
   * @method
   * @name updateVolume
   * @public
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Updates the VolumeBar UI with a given position
   * @param {number} percentage - The playback rate converted in %
   **/
  updatePlaybackRate(percentage, playbackRate) {
    percentage = Utils.precisionRound(percentage, 2);
    percentage *= 100;
    // Restore style to default in all case
    this._playbackRate.current.classList.remove('full');
    this._playbackRate.current.style.border = `solid 1px #0F8489`; // Match value with #playback-rate-current style

    if (percentage > 97 && percentage <= 100) { // Add border radius on right side
      this._playbackRate.current.classList.add('full');
    }

    if (percentage === 0) {
      this._playbackRate.current.style.border = `none`;
    }

    this._playbackRate.current.style.width = `${percentage}%`;
    this._playbackRate.thumb.style.left = `${percentage}%`;

    this._playbackRate.text.innerHTML = Utils.precisionRound(playbackRate, 2);
  }


}


export default PlaybackRateBar;
