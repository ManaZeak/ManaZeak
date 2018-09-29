class ScrollBar {
  constructor(options) {
    // https://github.com/buzinas/simple-scrollbar <3
    this._target = options.target; // Parent div to put the ScrollBar in
    this._wrapper = {}; // Wrap both container and ScrollBar
    this._container = {}; // Content to scroll + browser ScrollBar (18px offset)
    this._bar = {} // ScrollBar itself
    this._scrollRatio = 0;
    this._lastPageY = 0;

    this._init();
    this._events();
    this._updateScrollBar();
  }

  _init() {
    // Creating associated elements (wrapper, container, bar)
    this._target.classList.add('scrollbar-container');
    this._wrapper = document.createElement('DIV');
    this._wrapper.setAttribute('class', 'scrollbar-wrapper');
    this._container = document.createElement('DIV');
    this._container.setAttribute('class', 'scrollbar-content');
    // Move target children into this container
    while (this._target.firstChild) {
      this._container.appendChild(this._target.firstChild);
    }
    // Link DOM elements
    this._wrapper.appendChild(this._container);
    this._target.appendChild(this._wrapper); // TODO : replace with fragment
    this._target.insertAdjacentHTML('beforeend', '<div class="scroll"></div>');
    this._bar = this._target.lastChild; // Get content from line just over this!
    // Methods auto binding with this to be able to add/remove listeners easily
    this._drag = this._drag.bind(this);
    this._stopDrag = this._stopDrag.bind(this);
  }

  _events() {
    window.addEventListener('resize', this._updateScrollBar.bind(this));
    this._container.addEventListener('scroll', this._updateScrollBar.bind(this));
    this._container.addEventListener('mouseenter', this._updateScrollBar.bind(this));
    this._bar.addEventListener('mousedown', this._barClicked.bind(this));
  }

  _drag(event) {
    let delta = event.pageY - this._lastPageY;
    this._lastPageY = event.pageY;
    requestAnimationFrame(() => {
      this._container.scrollTop += (delta / this._scrollRatio);
    });
  }

  _barClicked(event) {
    this._lastPageY = event.pageY;
    this._bar.classList.add('scrollbar-grabbed');
    document.body.classList.add('scrollbar-grabbed');
    document.addEventListener('mousemove', this._drag);
    document.addEventListener('mouseup', this._stopDrag);
  }

  _stopDrag() {
    this._bar.classList.remove('scrollbar-grabbed');
    document.body.classList.remove('scrollbar-grabbed');
    document.removeEventListener('mousemove', this._drag);
    document.removeEventListener('mouseup', this._stopDrag);
  }

  _updateScrollBar() {
    let totalHeight = this._container.scrollHeight,
        ownHeight = this._container.clientHeight,
        right = (this._target.clientWidth - this._bar.clientWidth) * -1;

    this._scrollRatio = ownHeight / totalHeight;
    requestAnimationFrame(() => {
      if (this._scrollRatio >= 1) { // Hide scrollbar if no scrolling is possible
        this._bar.classList.add('hidden');
      }

      else {
        let height = (Math.max(this._scrollRatio * 100, 5) * ownHeight) / 100;
        let top = ((this._container.scrollTop / totalHeight) * 100) * ownHeight / 100;

        if (Math.max(this._scrollRatio * 100, 5) === 5) {
          let scrollProgressPercentage = (this._container.scrollTop * 100) / (totalHeight - ownHeight);
          top = ((ownHeight - height) * (((this._container.scrollTop + (scrollProgressPercentage * ownHeight) / 100) / totalHeight) * 100)) / 100;
        }

        this._bar.classList.remove('hidden');
        this._bar.style.cssText = `height: ${height}px; top: ${top}px; right: ${right}px;`;
      }
    });
  }
}

export default ScrollBar;
