class ProgressBar {

  	constructor(options) {
  		this._options = options;
  		this._progress = { container: {}, track: {}, current: {}, thumb: {}, hover: {}, left: {}, right: {} };
  		this._rafId = null;

      this._duration = 0;

  		this._isActive = false; // Boolean flag to make listeners available/unavailable
  		this._isMouseOver = false;
  		this._isDragging = false;

  		this._init();
      this._events();
  		this._attach();
  	}


  	_init() {
  		this._progress.container = document.createElement('DIV');
  		this._progress.track = document.createElement('DIV');
  		this._progress.current = document.createElement('DIV');
  		this._progress.thumb = document.createElement('DIV');
  		this._progress.hover = document.createElement('DIV');

  		this._progress.container.id = 'progress';
  		this._progress.track.id = 'progress-track';
  		this._progress.current.id = 'progress-current';
  		this._progress.thumb.id = 'progress-thumb';
  		this._progress.hover.id = 'progress-hover';

  		if (this._options.timecode) {
  			this._progress.left = document.createElement('P');
  			this._progress.right = document.createElement('P');
  			this.resetTimecode();
  		}
  	}

    _events() {
      this._progress.track.addEventListener('mouseover', this._updateMouseOver.bind(this));
  		this._progress.track.addEventListener('mouseleave', this._updateMouseOver.bind(this));
    }

  	_attach() {
  		this._progress.track.appendChild(this._progress.current);
  		this._progress.track.appendChild(this._progress.thumb);
  		this._progress.track.appendChild(this._progress.hover);

  		if (this._options.timecode) { this._progress.container.appendChild(this._progress.left); }
  		this._progress.container.appendChild(this._progress.track);
  		if (this._options.timecode) { this._progress.container.appendChild(this._progress.right); }

  		let fragment = document.createDocumentFragment();
  		fragment.appendChild(this._progress.container);
  		document.body.appendChild(fragment);
  	}

  	_updateMouseOver(event) {
  		if (event.type === 'mouseover') {
  			this._isMouseOver = true;
  		}

  		else if (event.type === 'mouseleave') {
  			this._isMouseOver = false;
  		}
  	}

  	_updateHoverTimecode(xPos) {
      let boundRect                  = this._progress.track.getBoundingClientRect();
      let percentage         = ((xPos - boundRect.left) * 100) / boundRect.width;

      if (percentage > 100) { percentage = 100; }
      if (percentage < 0)   { percentage = 0;   }

  		this._progress.hover.style.left = ((((boundRect.width * percentage) / 100) - 30) * 100) / boundRect.width + "%";
      this._progress.hover.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
   	}

  	_mouseDown(event) {
  		if (!this._isDragging && (event.target.id === 'progress-track' || event.target.id === 'progress-current' || event.target.id === 'progress-thumb')) {
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
  		if (this._isDragging) { // User is draging progress thumb
  			this._moveProgress(event.clientX);
  		}

      else if (this._isMouseOver) { // Hover on progress track
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

  	_startAnimation() {
      let animate = function() {
        this.setProgress(mzk.getProgress());
      }.bind(this);

  		if (this._isActive) {
  			animate();
  			this._rafId = requestAnimationFrame(this._startAnimation.bind(this));
  		}
  	}

  	_stopAnimation() {
  		if (!this._isActive) {
  			cancelAnimationFrame(this._rafId);
  		}
  	}

    resetProgressBar() {
      this.setProgress(0);
      this.desactivate();
    }

    resetTimecode() {
  		this._progress.left.innerHTML = '--:--';
  		this._progress.right.innerHTML = '--:--';
      this._progress.hover.innerHTML = '--:--';
  	}

  	toggleActive() {
  		!this._isActive ? this.activate(): this.desactivate();
  	}

  	activate() {
      this._isActive = true;
  		this._startAnimation();

      this._mouseDown = this._mouseDown.bind(this); // In order to be able to remove event listener later
      this._mouseMove = this._mouseMove.bind(this);
      this._mouseUp = this._mouseUp.bind(this);

      this._progress.track.addEventListener('mousedown', this._mouseDown);
      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);
  	}

  	desactivate() {
      this._isActive = false;
      this._stopAnimation();

      this._progress.track.removeEventListener('mousedown', this._mouseDown);
      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
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

  	setIsActive(isActive) { this._isActive = isActive; }
  	setIsMouseOver(isMouseOver) { this._isMouseOver = isMouseOver; }
  	setIsDragging(isDragging) { this._isDragging = isDragging; }
}

export default ProgressBar;
