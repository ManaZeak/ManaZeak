'use_strict';

class VolumeBar {
  /**
   * @summary UI VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Interactive volume bar that is linked to ManaZeak logic
   **/
  constructor() {
    this._volume = {
      image: {},
      wrapper: {},
      container: {},
      current: {},
      thumb: {}
    };
    this._showHideTimeoutId = -1;
    this.isDragging = false;

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this._volume = {
      image: document.getElementById('volumebar-img'),
      wrapper: document.getElementById('volumebar-wrapper'),
      container: document.getElementById('volumebar-container'),
      current: document.getElementById('volumebar-current'),
      thumb: document.getElementById('volumebar-thumb')
    };

    this._events();
  }

  _events() {
    this._volume.image.addEventListener('click', mzk.toggleMute.bind(mzk));
    this._volume.container.addEventListener('mousedown', this._mouseDown.bind(this));
    // this._volume.wrapper.addEventListener('mouseover', this._mouseOver.bind(this));

    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
  }

  _mouseOver() {
    clearTimeout(this._showHideTimeoutId);
    this._showHideTimeoutId = -1;
    this._showWrapper();
  }

  _mouseDown(event) {
    if (!this.isDragging && (event.target.id === 'volumebar-wrapper' || event.target.id === 'volumebar-container' || event.target.id === 'volumebar-current' || event.target.id === 'volumebar-thumb')) {
      this.isDragging = true;
      this._moveVolume(event);
      this._showWrapper();

      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);
    }
  }

  _mouseMove(event) {
    if (this.isDragging) {
      this._moveVolume(event);
    }
  }

  _mouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this._hideWrapper();

      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
    }
  }

  _hideWrapper() {
    this._volume.wrapper.style.opacity = null;
    this._volume.wrapper.style.visibility = null;
  }

  _showWrapper() {
    this._volume.wrapper.style.opacity = 1;
    this._volume.wrapper.style.visibility = 'visible';
  }

  _moveVolume(event) {
    // Get container bound rectangle and compute difference in px and % (pr)
    let boundRect = this._volume.container.getBoundingClientRect();
    let toLeftInPx = event.clientX - boundRect.left; // Client X position minus container left X position equals X variation from container left side
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

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  startShowHide() {
    if (this._showHideTimeoutId === -1) {
      this._showWrapper();
    } // Show wrapp bc no timeout in progress
    else {
      clearTimeout(this._showHideTimeoutId);
    } // Reset timeout to avoid wrapper blinking

    this._showHideTimeoutId = setTimeout(() => {
      this._showHideTimeoutId = -1; // Reset timeout id
      this._hideWrapper();
    }, 1000); // Transition time according to $transition-duration by 5 (utils/tools/_global.scss)
  }

  updateVolume(isMuted, volume) {
    volume *= 100;
    // Icon update
    if (volume === 0 || (typeof isMuted === 'boolean' && isMuted === true)) {
      this._volume.image.src = "/static/img/player/volume-mute.svg";
    } else if (volume > 0 && volume < 66) {
      this._volume.image.src = "/static/img/player/volume-half.svg"
    } else {
      this._volume.image.src = "/static/img/player/volume-full.svg";
    }
    // Current and thumb update
    if (typeof isMuted === 'boolean' && isMuted === true) {
      volume = 0;
    } // To set volume current and thumb at 0% left when muted.
    this._volume.current.style.width = volume + "%";
    this._volume.thumb.style.left = volume + "%";
  }
}

export default VolumeBar;
