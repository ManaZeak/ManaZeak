'use strict';

class ScrollBar {
  /**
   * @summary Custom JavaScript ScrollBar for any conatiner
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Build a custom ScrollBar according to the given DOM target, inspired from https://github.com/buzinas/simple-scrollbar <3
   * @param {object} options - The ScrollBar options
   * @param {object} options.target - The DOM node to add a ScrollBar to
   **/
  constructor(options) {
    this._const = {
      grabbed: 'scrollbar-grabbed'
    };

    this._target = options.target; // Parent div to put the ScrollBar in
    this._alwaysVisible = options.alwaysVisible;
    this._wrapper = {}; // Wrap both container and ScrollBar
    this._container = {}; // Content to scroll + browser ScrollBar (18px offset)
    this._bar = {}; // ScrollBar itself
    this._scrollRatio = 0;
    this._lastPageY = 0;

    this._init();
    this._events();
    this._updateScrollBar();

    new ResizeObserver(this.update.bind(this)).observe(this._target);
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Build DOM hierrarchy, ScrollBar double wraps the content to append its custom bar
   **/
  _init() {
    const fragment = document.createDocumentFragment();
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
    fragment.appendChild(this._wrapper);
    // Append fragment to DOM target
    this._target.appendChild(fragment);
    let alwaysVisibleClass = '';
    if (this._alwaysVisible) {
      alwaysVisibleClass = 'always-visible';
    }
    // Append scroll as last child
    this._target.insertAdjacentHTML('beforeend', `<div class="scroll ${alwaysVisibleClass}"></div>`);
    this._bar = this._target.lastChild; // Get content from line just over this!
    // Methods auto binding with this to be able to add/remove listeners easily
    this._drag = this._drag.bind(this);
    this._stopDrag = this._stopDrag.bind(this);
    // Ensure parent has time to build to its max height before first update
    setTimeout(this._updateScrollBar.bind(this), 100);
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle ScrollBar mouse events
   **/
  _events() {
    window.addEventListener('resize', this._updateScrollBar.bind(this));
    this._container.addEventListener('scroll', this._updateScrollBar.bind(this));
    this._container.addEventListener('mouseenter', this._updateScrollBar.bind(this));
    this._bar.addEventListener('mousedown', this._barClicked.bind(this));
  }

  /**
   * @method
   * @name _drag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the drag animation of the bar
   * @param {object} event - The Mouse event from this._events()
   **/
  _drag(event) {
    const delta = event.pageY - this._lastPageY;
    this._lastPageY = event.pageY;
    requestAnimationFrame(() => {
      this._container.scrollTop += (delta / this._scrollRatio);
    });
  }

  /**
   * @method
   * @name _barClicked
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add document events when bar is clicked to track the mouse movement in parent
   * @param {object} event - The Mouse event from this._events()
   **/
  _barClicked(event) {
    this._lastPageY = event.pageY;
    this._bar.classList.add(this._const.grabbed);
    document.body.classList.add(this._const.grabbed);

    requestAnimationFrame(() => {
      document.addEventListener('mousemove', this._drag);
      document.addEventListener('mouseup', this._stopDrag);
    });
  }

  /**
   * @method
   * @name _stopDrag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Remove document events when bar is released
   **/
  _stopDrag() {
    this._bar.classList.remove(this._const.grabbed);
    document.body.classList.remove(this._const.grabbed);
    document.removeEventListener('mousemove', this._drag);
    document.removeEventListener('mouseup', this._stopDrag);
  }

  /**
   * @method
   * @name _updateScrollBar
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Compute bar position according to DOM measurements
   **/
  _updateScrollBar() {
    const totalHeight = this._container.scrollHeight;
    const ownHeight = this._container.clientHeight;
    const right = (this._target.clientWidth - this._bar.clientWidth) * -1;

    this._scrollRatio = ownHeight / totalHeight;
    requestAnimationFrame(() => {
      if (this._scrollRatio >= 1) { // Hide scrollbar if no scrolling is possible
        this._bar.classList.add('hidden');
      } else {
        const height = (Math.max(this._scrollRatio * 100, 5) * ownHeight) / 100;
        let top = ((this._container.scrollTop / totalHeight) * 100) * ownHeight / 100;

        if (Math.max(this._scrollRatio * 100, 5) === 5) { // ScrollBar has reached its minimum size
          /* Here is a complex thing : scroll total height != DOM node total height. We must substract
          a growing percentage (as user goes down) that is scaled after total scroll progress in %. */
          const scrollProgressPercentage = (this._container.scrollTop * 100) / (totalHeight - ownHeight);
          top = ((ownHeight - height) * (((this._container.scrollTop + (scrollProgressPercentage * ownHeight) / 100) / totalHeight) * 100)) / 100;
        }

        this._bar.classList.remove('hidden');
        this._bar.style.cssText = `height: ${height}px; top: ${top}px; right: ${right}px;`;
      }
    });
  }


  update() {
    this._updateScrollBar();
  }
}

export default ScrollBar;
