class ProgressBar {


  /**
   * @summary Interactive Progress Bar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description <blockquote>Handle the progress over a track</blockquote>
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
    };
    this._topbarLogo = {};
    this._asideLogo = {};

    this._rafId = null;
    this._duration = 0;

    this._isActive = false; // Boolean flag to make listeners available/unavailable
    this._isMouseOver = false;
    this._isDragging = false;

    this._init();
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name _init
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Init the progress bar DOM and events
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
   * @description Remove mouse events when ProgressBar is deactivated
   **/
  _removeEvents() {
    this._progress.container.removeEventListener('mousedown', this._mouseDown);
    this._progress.container.removeEventListener('mouseover', this._updateMouseOver);
    this._progress.container.removeEventListener('mouseleave', this._updateMouseOver);
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ---------------------------------------  MOUSE EVENTS  ---------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
      const progress = this._getProgressFromEvent(event.clientX);
      this.setProgress(progress);
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
      this._isDragging = false;
      mzk.unmute();
      this._startAnimation();
      const progress = this._getProgressFromEvent(event.clientX);
      mzk.setProgress(Utils.precisionRound(progress, 3));
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
    if (this._isDragging) {
      if (this._rafId !== -1) {
        cancelAnimationFrame(this._rafId);
        this._rafId = -1;
      }

      const progress = this._getProgressFromEvent(event.clientX);
      requestAnimationFrame(() => {
        this.setProgress(progress);
      });
    }

    if (this._isActive && this._isMouseOver) {
      this._updateHoverTimecode(event.clientX);
    }
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


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  ANIMATION METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
    this.setProgress(mzk.playerProgress);
    this._rafId = requestAnimationFrame(this._animate.bind(this));
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


  //  ------------------------------------------------------------------------------------------------//
  //  -----------------------------------  ACTIVATION METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
    this._addEvents();
  }


  /**
   * @method
   * @name deactivate
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Deactivate the ProgressBar, set it invisible, remove animations and remove mouse events
   **/
  deactivate() {
    this._progress.thumb.style.transition = 'left 0.4s ease 0s, opacity 0.4s ease 0s'; // Match transition duration w/ the one in ui/_footbar.scss (var(--mzk-footbar-transition))
    this._progress.current.style.transition = 'width 0.4s ease 0s'; // Match transition duration w/ the one in ui/_footbar.scss (var(--mzk-footbar-transition))

    this._isActive = false;
    this.setVisibility(false);
    this._resetTimecode();
    this._removeEvents();
    this._stopAnimation();

    setTimeout(() => { // Delay no animation style for thumb and current (both come at 0% in 0.5s interval)
      this._progress.thumb.style.transition = 'left 0s ease 0s, opacity 0.4s ease 0s';
      this._progress.current.style.transition = 'width 0s ease 0s';
    }, 500);
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
      this.deactivate();
    }
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ------------------------------------  UI MANIPULATIONS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
      this._progress.moodbar.style.height = '25px'; // Match value w/ the one in ui/components/_progressbar.scss ($progress-moodbar-height)
      this._progress.moodbar.style.opacity = '1';
      this._progress.moodbar.style.cursor = 'pointer';
      this._progress.track.style.opacity = '1';
      this._progress.track.style.cursor = 'pointer';
      this._progress.left.style.opacity = '1';
      this._progress.right.style.opacity = '1';
    } else {
      this._progress.moodbar.style.height = '0';
      this._progress.moodbar.style.opacity = '0';
      this._progress.moodbar.style.cursor = 'default';
      this._progress.track.style.opacity = '0';
      this._progress.track.style.cursor = 'default';
      this._progress.left.style.opacity = '0';
      this._progress.right.style.opacity = '0';
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
    setTimeout(() => {
      this._progress.left.innerHTML = '--:--';
      this._progress.right.innerHTML = '--:--';
      this._progress.hover.innerHTML = '--:--';
    }, 500); // Match value with the one in scss/ui/components/_progresbar.scss -> var(--mzk-footbar-transition)
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


  //  ------------------------------------------------------------------------------------------------//
  //  ---------------------------------  PROGRESS MANIPULATIONS  -----------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
   * @name adjustProgress
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Add/Substract a completion percentage to the ProgressBar
   * @param {number} amount - The percentage amount to add/substract in range float[-100,100]
   **/
  adjustProgress(amount) {
    this.setProgress(amount);
  }


  /**
   * @method
   * @name resetProgressBar
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Reset the progress bar to its initial state and deactivate its events and transitions
   **/
  resetProgressBar() {
    this.setProgress(0);
    this.deactivate();
  }


  /**
   * @method
   * @name _getProgressFromEvent
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Move the progress along its track
   * @param {number} xPos - The mouse X position on screen
   **/
  _getProgressFromEvent(xPos) {
    const boundRect = this._progress.track.getBoundingClientRect();
    let percentage = ((xPos - boundRect.left) * 100) / boundRect.width;

    if (percentage < 0) {
      percentage = 0;
    }

    if (percentage > 100) {
      percentage = 100;
    }

    return percentage;
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @public
   * @member {object} - The ProgressBar moodbar DOM container */
  get moodbarContainer() {
    return this._progress.moodbar;
  }


  get isActive() {
    return this._isActive;
  }


}


export default ProgressBar;
