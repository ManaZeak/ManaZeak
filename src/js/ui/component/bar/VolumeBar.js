'use strict';


class VolumeBar {


  /**
   * @summary UI VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description <blockquote>Interactive volume bar that is linked to ManaZeak logic</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The VolumeBar DOM elements (image, wrapper, container, current, thumb) */
    this._volume = {
      image: {},
      wrapper: {},
      container: {},
      current: {},
      thumb: {}
    };
    /** @private
     * @member {boolean} - Flag to notify that user is currently dragging the volume bar thumb */
    this._isDragging = false;

    this._init();
    this._events();
    this._setLangFeedback();
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
    this._volume = {
      image: document.getElementById('volumebar-img'),
      wrapper: document.getElementById('volumebar-wrapper'),
      container: document.getElementById('volumebar-container'),
      current: document.getElementById('volumebar-current'),
      thumb: document.getElementById('volumebar-thumb')
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
    this._volume.image.addEventListener('click', mzk.toggleMute.bind(mzk));
    this._volume.container.addEventListener('mousedown', this._mouseDown.bind(this));

    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
  }


  _setLangFeedback() {
    // Singe dom element is an image, we put tooltip on parent wrapper
    this._volume.image.parentNode.classList.add('tooltip-top');
    this._volume.image.parentNode.dataset.tooltip = mzk.lang.player.volume.mute; // Volume is not muted by default
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
    if (!this._isDragging && (event.target.id === 'volumebar-wrapper' ||
        event.target.id === 'volumebar-container' ||
        event.target.id === 'volumebar-current' ||
        event.target.id === 'volumebar-thumb')) {

      this._isDragging = true;
      this._setVolumeFromEvent(event);

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
      this._setVolumeFromEvent(event);
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


  //  ------------------------------------------------------------------------------------------------//
  //  -----------------------------------  VOLUME MANIPULATIONS ------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
  _setVolumeFromEvent(event) {
    // Get container bound rectangle and compute difference in px and % (pr)
    const boundRect = this._volume.container.getBoundingClientRect();
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
    mzk.setVolume(toLeftInPr / 100);
  }


  /**
   * @method
   * @name updateVolume
   * @public
   * @memberof VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Updates the VolumeBar UI with a given position
   * @param {boolean} isMuted - The muted state
   * @param {number} volume - The volume value to set in range float[0, 100]
   **/
  updateVolume(isMuted, volume) {
    const removeFullClass = () => {
      if (this._volume.current.classList.contains('full')) {
        this._volume.current.classList.remove('full');
      }
    };

    volume *= 100;
    // Icon update
    if (volume === 0 || (typeof isMuted === 'boolean' && isMuted === true)) {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-mute.svg';
      this._volume.image.parentNode.dataset.tooltip = mzk.lang.player.volume.unmute; // Volume is not muted by default
    } else if (volume > 0 && volume < 50) {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-half.svg';
      this._volume.image.parentNode.dataset.tooltip = mzk.lang.player.volume.mute; // Volume is not muted by default
    } else {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-full.svg';
      this._volume.image.parentNode.dataset.tooltip = mzk.lang.player.volume.mute; // Volume is not muted by default
    }

    if (volume > 97 && volume <= 100) { // Add border radius on right side
      this._volume.current.classList.add('full');
    }

    // Current and thumb update
    if (typeof isMuted === 'boolean' && isMuted === true) {
      volume = 0;
    } // To set volume current and thumb at 0% left when muted.
    this._volume.current.style.width = `${volume}%`;
    this._volume.thumb.style.left = `${volume}%`;
  }


}


export default VolumeBar;
