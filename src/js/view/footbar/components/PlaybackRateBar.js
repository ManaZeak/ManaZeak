'use strict';


class PlaybackRateBar {


  /**
   * @summary UI VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description <blockquote>Interactive volume bar that is linked to ManaZeak logic</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The VolumeBar DOM elements (image, wrapper, container, current, thumb) */
    this._playbackRate = {
      container: {},
      current: {},
      thumb: {},
      text: {},
      reset: {}
    };
    /** @private
     * @member {boolean} - Flag to notify that user is currently dragging the volume bar thumb */
    this._isDragging = false;

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
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Build VolumeBar object from DOM
   **/
  _init() {
    this._playbackRate = {
      container: document.getElementById('playback-rate-container'),
      current: document.getElementById('playback-rate-current'),
      thumb: document.getElementById('playback-rate-thumb'),
      text: document.getElementById('playback-rate-text'),
      reset: document.getElementById('reset-playback-rate')
    };
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
  _events() {
    this._playbackRate.container.addEventListener('mousedown', this._mouseDown.bind(this));
    this._playbackRate.reset.addEventListener('click', this._resetPlaybackRate.bind(this));

    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
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


  _resetPlaybackRate() {
    mzk.setPlaybackRate(0.5);
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
    percentage *= 100;

    if (percentage > 97 && percentage <= 100) { // Add border radius on right side
      this._playbackRate.current.classList.add('full');
    }

    this._playbackRate.current.style.width = `${percentage}%`;
    this._playbackRate.thumb.style.left = `${percentage}%`;

    this._playbackRate.text.innerHTML = Utils.precisionRound(playbackRate, 2);
  }


}


export default PlaybackRateBar;
