class ProgressBar {

  	constructor() {
  		this._progress = { container: {}, track: {}, current: {}, thumb: {}, hover: {}, moodbar: {}, left: {}, right: {} }; // DOM elements
      this._topbarLogo = {};
      this._rafId = null;
      this._duration = 0;

  		this._isActive = false; // Boolean flag to make listeners available/unavailable
  		this._isMouseOver = false;
  		this._isDragging = false;

  		this._init();
  	}


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

    _addEvents() {
      this._progress.container.addEventListener('mousedown', this._mouseDown);
      this._progress.container.addEventListener('mouseover', this._updateMouseOver);
  		this._progress.container.addEventListener('mouseleave', this._updateMouseOver);
      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);
    }

    _removeEvents() {
      this._progress.container.removeEventListener('mousedown', this._mouseDown);
      this._progress.container.removeEventListener('mouseover', this._updateMouseOver);
  		this._progress.container.removeEventListener('mouseleave', this._updateMouseOver);
      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
    }

  	_updateMouseOver(event) {
  		if (event.type === 'mouseover') {
        this._progress.hover.style.opacity = '1'; // Automatic CSS transition
  			this._isMouseOver = true;
  		}

  		else if (event.type === 'mouseleave') {
        this._progress.hover.style.opacity = '0'; // Automatic CSS transition
  			this._isMouseOver = false;
  		}
  	}

  	_updateHoverTimecode(xPos) {
      let boundRect = this._progress.track.getBoundingClientRect();
      let percentage = ((xPos - boundRect.left) * 100) / boundRect.width;

      if (percentage > 100) { percentage = 100; }
      if (percentage < 0)   { percentage = 0;   }

  		this._progress.hover.style.left = ((((boundRect.width * percentage) / 100) - 30) * 100) / boundRect.width + "%";
      this._progress.hover.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
   	}

  	_mouseDown(event) {
  		if (!this._isDragging && (event.target.id === 'progress-moodbar' ||event.target.id === 'progress-container' || event.target.id === 'progress-track' || event.target.id === 'progress-current' || event.target.id === 'progress-thumb')) {
        mzk.mute();
        this._isDragging = true;
        this._stopAnimation();
  			this._moveProgress(event.clientX);
  		}
  	}

  	_mouseUp(event) {
  		if (this._isDragging) { // User has released progress thumb
        mzk.unmute();
  		  this._isDragging = false;
  		  this._startAnimation();
        this._moveProgress(event.clientX);
  		}
  	}

  	_mouseMove(event) {
  		if (this._isActive && this._isDragging) { // User is draging progress thumb
  			this._moveProgress(event.clientX);
  		}

      else if (this._isActive && this._isMouseOver) { // Hover on progress track
        this._updateHoverTimecode(event.clientX);
  		}
  	}

  	_moveProgress(xPos) {
  			let boundRect = this._progress.track.getBoundingClientRect();
        let distance = ((xPos - boundRect.left) * 100) / boundRect.width;

        if (distance < 0) { distance = 0; }
        if (distance > 100) { distance = 100; }

        mzk.setProgress(Utils.precisionRound(distance, 3));
  	}

    _animate() {
      this.setProgress(mzk.getProgress());
    }

  	_startAnimation() {
  		if (this._isActive) {
  			this._animate();
  			this._rafId = requestAnimationFrame(this._startAnimation.bind(this));
  		}
  	}

  	_stopAnimation() {
  		if (!this._isActive) {
  			cancelAnimationFrame(this._rafId);
  		}
  	}

    _resetTimecode() {
      setTimeout(function() {
        this._progress.left.innerHTML = '--:--';
    		this._progress.right.innerHTML = '--:--';
        this._progress.hover.innerHTML = '--:--';
      }.bind(this), 500); // Match value with the one in scss/view/components/_progresbar.scss -> $footbar-transition
  	}

    resetProgressBar() {
      this.setProgress(0);
      this.desactivate();
    }

    activateTransitions() {
      this._progress.thumb.style.transition = 'left 0.4s ease 0s, opacity 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
      this._progress.current.style.transition = 'width 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
    }

    desactivateTransitions() {
      // Here we need to set transition value to 0s to avoid lag on current and thumb when progress bar is active
      // Lag duration will be equal to the transition time otherwise
      this._progress.thumb.style.transition = 'left 0s ease 0s, opacity 0.4s ease 0s'; // Reset left transition to default, match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
      this._progress.current.style.transition = 'width 0s ease 0s'; // Reset width transition to default
    }

  	toggleActive() {
  		!this._isActive ? this.activate(): this.desactivate();
  	}

  	activate() {
      this._isActive = true;
      this.setVisibility(true);
      this._startAnimation();
      this.activateTransitions(); // TODO : add transition in startAnimation
      this._addEvents();
  	}

  	desactivate() {
      this._isActive = false;
      this.setVisibility(false);
      this._resetTimecode();
      this._removeEvents();
      this._stopAnimation();

      setTimeout(function() { // Delay no animation style for thumb and current (both come at 0% in 0.5s interval)
        this.desactivateTransitions();
      }.bind(this), 500); // Use same timeout value as the transition value set in resetProgressBar(), so animation can run properly
  	}

  	adjustProgress(amount) {
  		this.setProgress(0 + amount);
  	}

    updateDuration(duration) {
      this._duration = duration;
      this._progress.right.innerHTML = Utils.secondsToTimecode(duration);
    }

  	setProgress(percentage) {
  		if (this._isActive) {
  			this._progress.current.style.width = percentage + '%';
  			this._progress.thumb.style.left = percentage + '%';
        this._progress.left.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
  		}
  	}

    setVisibility(isVisible) {
      if (isVisible) {
        this._progress.moodbar.style.height = '25px'; // Match value w/ the one in view/components/_progresbar.scss ($progress-moodbar-height)
        this._progress.moodbar.style.opacity = '1';
        this._progress.moodbar.style.cursor = 'pointer';
        this._progress.track.style.opacity = '1';
        this._progress.track.style.cursor = 'pointer';
        this._progress.thumb.style.opacity = '1';
        this._progress.left.style.opacity = '1';
        this._progress.right.style.opacity = '1';
        this._topbarLogo.style.opacity = '1';
      }

      else if (!isVisible) {
        this._progress.moodbar.style.height = '0';
        this._progress.moodbar.style.opacity = '0';
        this._progress.moodbar.style.cursor = 'default';
        this._progress.track.style.opacity = '0';
        this._progress.track.style.cursor = 'default';
        this._progress.thumb.style.opacity = '0';
        this._progress.left.style.opacity = '0';
        this._progress.right.style.opacity = '0';
        this._topbarLogo.style.opacity = '0';
      }
    }

  	setIsActive(isActive) { this._isActive = isActive; }
  	setIsMouseOver(isMouseOver) { this._isMouseOver = isMouseOver; }
  	setIsDragging(isDragging) { this._isDragging = isDragging; }
}

export default ProgressBar;
