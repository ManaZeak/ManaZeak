'use_strict';


class ProgressBar {
  /**
   * @summary Interactive Progress Bar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the progress over a track
   **/
  constructor() {
    this._progress = {
      container: {},
      track: {},
      current: {},
      thumb: {},
      hover: {},
      moodbar: {},
      left: {},
      right: {}
    }; // DOM elements
    this._topbarLogo = {};
    this._rafId = null;
    this._duration = 0;

    this._isActive = false; // Boolean flag to make listeners available/unavailable
    this._isMouseOver = false;
    this._isDragging = false;

    this._init();
  }

  //  ----  PRIVATE METHODS  ----  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Init the progress bar dom and events
   **/
  _init() {
    this._progress.container = document.getElementById('progress-container');
    this._progress.track = document.getElementById('progress-track');
    this._progress.current = document.getElementById('progress-current');
    this._progress.thumb = document.getElementById('progress-thumb');
    this._progress.hover = document.getElementById('progress-hover');
    this._progress.moodbar = document.getElementById('progress-moodbar');
    this._progress.left = document.getElementById('footbar-left');
    this._progress.right = document.getElementById('footbar-right');
    this._topbarLogo = document.getElementById('topbar-logo');

    this._resetTimecode();

    // In order to remove event listeners in _removeEvents()
    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._updateMouseOver = this._updateMouseOver.bind(this);
  }

  /**
   * @method
   * @name _addEvents
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Listen to mouse events when ProgressBar is activated
   **/
  _addEvents() {
    this._progress.container.addEventListener('mousedown', this._mouseDown);
    this._progress.container.addEventListener('mouseover', this._updateMouseOver);
    this._progress.container.addEventListener('mouseleave', this._updateMouseOver);
    window.addEventListener('mousemove', this._mouseMove);
    window.addEventListener('mouseup', this._mouseUp);
  }

  /**
   * @method
   * @name _removeEvents
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Remove mouse events when ProgressBar is desactivated
   **/
  _removeEvents() {
    this._progress.container.removeEventListener('mousedown', this._mouseDown);
    this._progress.container.removeEventListener('mouseover', this._updateMouseOver);
    this._progress.container.removeEventListener('mouseleave', this._updateMouseOver);
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);
  }

  /**
   * @method
   * @name _updateMouseOver
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle mouse hover on progress bar
   * @param {object} event - The mouse event object
   **/
  _updateMouseOver(event) {
    if (event.type === 'mouseover') {
      this._progress.hover.style.opacity = '1'; // Automatic CSS transition
      this._isMouseOver = true;
    } else if (event.type === 'mouseleave') {
      this._progress.hover.style.opacity = '0'; // Automatic CSS transition
      this._isMouseOver = false;
    }
  }

  /**
   * @method
   * @name _updateHoverTimecode
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Update the hover timecode value
   * @param {number} xPos - The mouse X position on screen
   **/
  _updateHoverTimecode(xPos) {
    const boundRect = this._progress.track.getBoundingClientRect();
    let percentage = ((xPos - boundRect.left) * 100) / boundRect.width;

    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }

    this._progress.hover.style.left = `${((((boundRect.width * percentage) / 100) - 30) * 100) / boundRect.width}%`;
    this._progress.hover.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
  }

  /**
   * @method
   * @name _mouseDown
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse down event
   * @param {object} event - The mouse event object
   **/
  _mouseDown(event) {
    if (!this._isDragging &&
      (event.target.id === 'progress-container' ||
        event.target.id === 'progress-track' ||
        event.target.id === 'progress-current' ||
        event.target.id === 'progress-moodbar' ||
        event.target.id === 'progress-thumb' ||
        event.target.id === 'moodbarThumb' ||
        event.target.tagName === 'rect')) {

      mzk.mute();
      this._isDragging = true;
      this._stopAnimation();
      this._moveProgress(event.clientX);
    }
  }

  /**
   * @method
   * @name _mouseUp
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse up event
   * @param {object} event - The mouse event object
   **/
  _mouseUp(event) {
    if (this._isDragging) { // User has released progress thumb
      mzk.unmute();
      this._isDragging = false;
      this._startAnimation();
      this._moveProgress(event.clientX);
    }
  }

  /**
   * @method
   * @name _mouseMove
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse move event
   * @param {object} event - The mouse event object
   **/
  _mouseMove(event) {
    if (this._isActive && this._isDragging) { // User is draging progress thumb
      this._moveProgress(event.clientX);
    } else if (this._isActive && this._isMouseOver) { // Hover on progress track
      this._updateHoverTimecode(event.clientX);
    }
  }

  /**
   * @method
   * @name _moveProgress
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Move the progress along its track
   * @param {number} xPos - The mouse X position on screen
   **/
  _moveProgress(xPos) {
    const boundRect = this._progress.track.getBoundingClientRect();
    let distance = ((xPos - boundRect.left) * 100) / boundRect.width;

    if (distance < 0) {
      distance = 0;
    }
    if (distance > 100) {
      distance = 100;
    }

    mzk.setProgress(Utils.precisionRound(distance, 3));
  }

  /**
   * @method
   * @name _animate
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the progress bar completion according to the Mzk player progress value
   **/
  _animate() {
    this.setProgress(mzk.getProgress());
  }

  /**
   * @method
   * @name _startAnimation
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Use RequestAnimationFrame to render and setProgress most of the frames
   **/
  _startAnimation() {
    if (this._isActive) {
      this._animate();
      this._rafId = requestAnimationFrame(this._startAnimation.bind(this));
    }
  }

  /**
   * @method
   * @name _stopAnimation
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Cancel animation frame if needed
   **/
  _stopAnimation() {
    if (!this._isActive) {
      cancelAnimationFrame(this._rafId);
    }
  }

  /**
   * @method
   * @name _resetTimecode
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set UI values to default `--:--`
   **/
  _resetTimecode() {
    setTimeout(function() {
      this._progress.left.innerHTML = '--:--';
      this._progress.right.innerHTML = '--:--';
      this._progress.hover.innerHTML = '--:--';
    }.bind(this), 500); // Match value with the one in scss/view/components/_progresbar.scss -> $footbar-transition
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name resetProgressBar
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Reset the progress bar to its initial state and desactivate its events and transitions
   **/
  resetProgressBar() {
    this.setProgress(0);
    this.desactivate();
  }

  /**
   * @method
   * @name activateTransitions
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Enable the transition on the ProgressBar
   **/
  activateTransitions() {
    this._progress.thumb.style.transition = 'left 0.4s ease 0s, opacity 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
    this._progress.current.style.transition = 'width 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
  }

  /**
   * @method
   * @name desactivateTransitions
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Disable the transition on the ProgressBar
   **/
  desactivateTransitions() {
    // Here we need to set transition value to 0s to avoid lag on current and thumb when progress bar is active
    // Lag duration will be equal to the transition time otherwise
    // Reset left and width transition to default, match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
    this._progress.thumb.style.transition = 'left 0s ease 0s, opacity 0.4s ease 0s';
    this._progress.current.style.transition = 'width 0s ease 0s';
  }

  /**
   * @method
   * @name toggleActive
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Toggle the ProgressBar active status
   **/
  toggleActive() {
    if (!this._isActive) {
      this.activate();
    } else {
      this.desactivate();
    }
  }

  /**
   * @method
   * @name activate
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Activate the ProgressBar, set it visible, add animations and add mouse events
   **/
  activate() {
    this._isActive = true;
    this.setVisibility(true);
    this._startAnimation();
    this.activateTransitions(); // TODO : add transition in startAnimation
    this._addEvents();
  }

  /**
   * @method
   * @name desactivate
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Desactivate the ProgressBar, set it invisible, remove animations and remove mouse events
   **/
  desactivate() {
    this._isActive = false;
    this.setVisibility(false);
    this._resetTimecode();
    this._removeEvents();
    this._stopAnimation();

    setTimeout(() => { // Delay no animation style for thumb and current (both come at 0% in 0.5s interval)
      this.desactivateTransitions();
    }, 500); // Use same timeout value as the transition value set in resetProgressBar(), so animation can run properly
  }

  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Add/Substract a completion percentage to the ProgressBar
   * @param {number} amount - The percentage amount to add/substract in range float[-100,100]
   **/
  adjustProgress(amount) {
    this.setProgress(0 + amount);
  }

  /**
   * @method
   * @name updateDuration
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Update the duration values
   * @param {number} duration - The track duration in seconds
   **/
  updateDuration(duration) {
    this._duration = duration;
    this._progress.right.innerHTML = Utils.secondsToTimecode(duration);
  }

  /**
   * @method
   * @name setProgress
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the completion percentage of the ProgressBar
   * @param {number} percentage - The progress percentage to set
   **/
  setProgress(percentage) {
    if (this._isActive) {
      this._progress.current.style.width = `${percentage}%`;
      this._progress.thumb.style.left = `${percentage}%`;
      this._progress.left.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
    }
  }

  /**
   * @method
   * @name setVisibility
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the visibility status of the ProgressBar
   * @param {boolean} isVisible - The visibility state
   **/
  setVisibility(isVisible) {
    if (isVisible) {
      this._progress.moodbar.style.height = '25px'; // Match value w/ the one in view/components/_progresbar.scss ($progress-moodbar-height)
      this._progress.moodbar.style.opacity = '1';
      this._progress.moodbar.style.cursor = 'pointer';
      this._progress.track.style.opacity = '1';
      this._progress.track.style.cursor = 'pointer';
      this._progress.left.style.opacity = '1';
      this._progress.right.style.opacity = '1';
      this._topbarLogo.style.opacity = '1';
    } else {
      this._progress.moodbar.style.height = '0';
      this._progress.moodbar.style.opacity = '0';
      this._progress.moodbar.style.cursor = 'default';
      this._progress.track.style.opacity = '0';
      this._progress.track.style.cursor = 'default';
      this._progress.left.style.opacity = '0';
      this._progress.right.style.opacity = '0';
      this._topbarLogo.style.opacity = '0';
    }
  }

  //  ----  GETTER METHODS   ----  //

  getMoodbarContainer() {
    return this._progress.moodbar;
  }


  //  ----  SETTER METHODS   ----  //

  setIsActive(isActive) {
    this._isActive = isActive;
  }
  setIsMouseOver(isMouseOver) {
    this._isMouseOver = isMouseOver;
  }
  setIsDragging(isDragging) {
    this._isDragging = isDragging;
  }
}

export default ProgressBar;
