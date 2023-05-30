import '../../../scss/navigation/scrollbar.scss';


class ScrollBar {


  /**
   * @class
   * @constructor
   * @summary Custom JavaScript ScrollBar for any conatiner
   * @author Arthur Beaulieu
   * @since January 2022
   * @licence GPL-v3.0
   * @description Build a custom ScrollBar according to the given DOM target, inspired from https://github.com/buzinas/simple-scrollbar <3
   * @param {Object} options - The ScrollBar options
   * @param {Object} options.target - The DOM node to add a ScrollBar to
   * @param {Boolean} [options.horizontal=false] - The scrollbar direction, default to vertical
   * @param {Number} [options.minSize=15] - The minimal scrollbar size in pixels
   * @param {Object} [options.style] - The scrollbar style to apply
   * @param {String} [options.style.color='rgb(155, 155, 155)'] - The CSS color
   * @param {String} [options.style.size='10px'] - The scrollbar with or height in px depending on horizontal flag
   * @param {String} [options.style.radius='5px'] - The border radius in px, by default is half the scrollbar width
   * @param {String} [options.style.lowOpacity='.2'] - The scrollbar opacity when not hovered
   * @param {String} [options.style.highOpacity='.8'] - The scrollbar opacity when hovered
   * @param {String} [options.style.transitionDuration='.2'] - The opacity transition duration in seconds
   **/
  constructor(options) {
    /**
     * The DOM target element to put a scrollbar on
     * @type {Object}
     * @private
     **/
    this._target = options.target;
    /**
     * Whether the scrollbar should be horizontal or not
     * @type {Boolean}
     * @private
     **/
    this._horizontal = options.horizontal || false;
    /**
     * The minimal size in pixels for scrollbar to be
     * @type {Number}
     * @private
     **/
    this._minSize = options.minSize || 15;
    /**
     * Optionnal custom style object. Support for color, size, radius, lowOpacity, highOpacity and transitionDuration
     * @type {Object}
     * @private
     **/
    this._style = options.style || {};
    /**
     * The DOM element that will wrap the DOM target content
     * @type {Object}
     * @private
     **/
    this._wrapper = {};
    /**
     * The DOM element that will contain the DOM target content, this DOM element hides the default browser scrollbar
     * @type {Object}
     * @private
     **/
    this._container = {};
    /**
     * The DOM element that hold the custom scrollbar itself
     * @type {Object}
     * @private
     **/
    this._bar = {};
    /**
     * Ratio between DOM target and content size, if < 1, it requires a scrollbar
     * @type {Number}
     * @private
     **/
    this._scrollRatio = 0;
    /**
     * For horizontal scroll, save the last user X position for position computations
     * @type {Number}
     * @private
     **/
    this._lastPageX = 0;
    /**
     * For vertical scroll, save the last user Y position for position computations
     * @type {Number}
     * @private
     **/
    this._lastPageY = 0;
    // Component initialization sequence
    this._init()
      .then(this._events.bind(this))
      .then(this._updateScrollBar.bind(this))
      .catch(err => console.error(err));
  }


  destroy() {
    Utils.removeAllObjectKeys(this);
  }


  // ======================================================================== //
  // ---------------------- Component initialization ------------------------ //
  // ======================================================================== //


  /**
   * @method
   * @name _init
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Build DOM hierrarchy, ScrollBar double wraps the content to append its custom bar
   * @returns {Promise} A Js promise resolved when DOM is fully initialized
   **/
  _init() {
    return new Promise(resolve => {
      const fragment = document.createDocumentFragment();
      // Creating associated elements (wrapper, container, bar)
      this._target.classList.add('scrollbar-container');
      this._wrapper = document.createElement('DIV');
      this._wrapper.setAttribute('class', 'scrollbar-wrapper');
      this._container = document.createElement('DIV');
      // Append scroll-content class to container
      if (this._horizontal === true) {
        this._container.setAttribute('class', 'horizontal-scrollbar-content');
      } else {
        this._container.setAttribute('class', 'scrollbar-content');
      }
      // Move target children into this new container
      while (this._target.firstChild) {
        this._container.appendChild(this._target.firstChild);
      }
      // Link DOM elements
      this._wrapper.appendChild(this._container);
      fragment.appendChild(this._wrapper);
      // Append fragment to DOM target
      this._target.appendChild(fragment);
      // Append the scroll depending on scrollbar position
      if (this._horizontal === true) {
        this._target.insertAdjacentHTML('beforeend', '<div class="horizontal-scroll"></div>'); // Append scroll as last child
      } else {
        this._target.insertAdjacentHTML('beforeend', '<div class="scroll"></div>'); // Append scroll as last child
      }
      // Save bar from previously added scroll element
      this._bar = this._target.lastChild;
      // Style update if user has specified style rules of its own
      this.style = this._style;
      // DOM initialization is done
      resolve();
    });
  }


  /**
   * @method
   * @name _events
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Handle ScrollBar mouse events
   * @returns {Promise} A Js promise resolved when all events are registered
   **/
  _events() {
    return new Promise(resolve => {
      // Methods auto binding with this to be able to add/remove listeners easily
      this._drag = this._drag.bind(this);
      this._stopDrag = this._stopDrag.bind(this);
      // Listen to window events or container/scrollbar events
      window.addEventListener('resize', this._updateScrollBar.bind(this));
      this._container.addEventListener('scroll', this._updateScrollBar.bind(this));
      this._container.addEventListener('mouseenter', this._mouseEnter.bind(this));
      this._container.addEventListener('mouseleave', this._mouseLeave.bind(this));
      this._bar.addEventListener('mousedown', this._barClicked.bind(this));
      // Scrollbar is now ready to be used
      resolve();
    });
  }


  // ======================================================================== //
  // ----------------------- Dragging mouse events -------------------------- //
  // ======================================================================== //


  /**
   * @method
   * @name _barClicked
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Add document events when bar is clicked to track the mouse movement in parent
   * @param {Object} event - The Mouse event from this._events()
   **/
  _barClicked(event) {
    if (this._horizontal === true) {
      this._lastPageX = event.pageX;
    } else {
      this._lastPageY = event.pageY;
    }

    this._bar.classList.add('scrollbar-grabbed');
    document.body.classList.add('scrollbar-grabbed');

    requestAnimationFrame(() => {
      document.addEventListener('mousemove', this._drag);
      document.addEventListener('mouseup', this._stopDrag);
    });
  }


  /**
   * @method
   * @name _drag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Handle the drag animation of the bar
   * @param {Object} event - The Mouse event from this._events()
   **/
  _drag(event) {
    if (this._horizontal === true) {
      const delta = event.pageX - this._lastPageX;
      this._lastPageX = event.pageX;
      requestAnimationFrame(() => {
        this._container.scrollLeft += (delta / this._scrollRatio);
      });
    } else {
      const delta = event.pageY - this._lastPageY;
      this._lastPageY = event.pageY;
      requestAnimationFrame(() => {
        this._container.scrollTop += (delta / this._scrollRatio);
      });
    }
  }


  /**
   * @method
   * @name _stopDrag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Remove document events when bar is released
   **/
  _stopDrag() {
    this._bar.classList.remove('scrollbar-grabbed');
    document.body.classList.remove('scrollbar-grabbed');
    document.removeEventListener('mousemove', this._drag);
    document.removeEventListener('mouseup', this._stopDrag);
  }


  // ======================================================================== //
  // ----------------- Internal size and position update -------------------- //
  // ======================================================================== //


  _mouseEnter(e) {
    e.preventDefault();
    this._target.classList.add('hovered');
    this._updateScrollBar();
  }


  _mouseLeave(e) {
    e.preventDefault();
    this._target.classList.remove('hovered');
    this._updateScrollBar();    
  }
  
  
  /**
   * @method
   * @name _updateScrollBar
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Compute bar position according to DOM measurements
   **/
  _updateScrollBar() {
    if (this._horizontal === true) {
      this._updateHorizontalScroll();
    } else {
      this._updateVerticalScroll();
    }
  }


  _updateHorizontalScroll() {
    const totalWidth = this._container.scrollWidth;
    const ownWidth = this._container.clientWidth;
    const bottom = (this._target.clientHeight - this._bar.clientHeight) * -1;
    this._scrollRatio = ownWidth / totalWidth;
    requestAnimationFrame(() => {
      // Hide scrollbar if no scrolling is possible
      if (this._scrollRatio >= 1) {
        this._bar.classList.add('hidden');
      } else {
        let width = (Math.max(this._scrollRatio * 100, this._minSize) * ownWidth) / 100;
        let left = ((this._container.scrollLeft / totalWidth) * 100) * ownWidth / 100;
        // ScrollBar has reached its minimum size
        if (Math.max(this._scrollRatio * 100, this._minSize) === this._minSize) {
          // Set minSize as width, unless minSize is greater than container client width
          width = (this._minSize < ownWidth) ? this._minSize : ownWidth / 2;
          /* Here is a complex thing : scroll total height != DOM node total height. We must substract
          a growing percentage (as user goes down) that is scaled after total scroll progress in %. */
          const scrollProgressPercentage = (this._container.scrollLeft * 100) / (totalWidth - ownWidth);
          left = ((ownWidth - width) * (((this._container.scrollLeft + (scrollProgressPercentage * ownWidth) / 100) / totalWidth) * 100)) / 100;
        }
        // Update the bar position
        this._bar.classList.remove('hidden');
        this._bar.style.cssText = `width: ${width}px; left: ${left}px; bottom: ${bottom}px;`;
      }
    });
  }


  _updateVerticalScroll() {
    const totalHeight = this._container.scrollHeight;
    const ownHeight = this._container.clientHeight;
    const right = (this._target.clientWidth - this._bar.clientWidth) * -1;
    this._scrollRatio = ownHeight / totalHeight;
    requestAnimationFrame(() => {
      // Hide scrollbar if no scrolling is possible
      if (this._scrollRatio >= 1) {
        this._bar.classList.add('hidden');
      } else {
        let height = (Math.max(this._scrollRatio * 100, this._minSize) * ownHeight) / 100;
        let top = ((this._container.scrollTop / totalHeight) * 100) * ownHeight / 100;
        // ScrollBar has reached its minimum size
        if (Math.max(this._scrollRatio * 100, this._minSize) === this._minSize) {
          // Set minSize as height, unless minSize is greater than container client height
          height = (this._minSize < ownHeight) ? this._minSize : ownHeight / 2;
          /* Here is a complex thing : scroll total height != DOM node total height. We must substract
          a growing percentage (as user goes down) that is scaled after total scroll progress in %. */
          const scrollProgressPercentage = (this._container.scrollTop * 100) / (totalHeight - ownHeight);
          top = ((ownHeight - height) * (((this._container.scrollTop + (scrollProgressPercentage * ownHeight) / 100) / totalHeight) * 100)) / 100;
        }
        // Update the bar position
        this._bar.classList.remove('hidden');
        this._bar.style.cssText = `height: ${height}px; top: ${top}px; right: ${right}px;`;
      }
    });
  }


  // ======================================================================== //
  // -------------------------- Exposed methods ----------------------------- //
  // ======================================================================== //


  /**
   * @method
   * @name updateScrollbar
   * @public
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since January 2022
   * @description Manually update the scrollbar
   **/
  updateScrollbar() {
    this._updateScrollBar();
  }


  isHidden() {
    return this._bar.classList.contains('hidden');
  }


  /**
   * Updates the scrollbar style. Support for color, size, radius, lowOpacity, highOpacity and transitionDuration
   * @param {Object} style
   **/
  set style(style) {
    this._style = style;

    if (this._style.color) {
      this._target.style.setProperty('--scroll-color', this._style.color);
    }

    if (this._style.size) {
      this._target.style.setProperty('--scroll-size', this._style.size);
    }

    if (this._style.radius) {
      this._target.style.setProperty('--scroll-radius', this._style.radius);
    }

    if (this._style.lowOpacity) {
      this._target.style.setProperty('--scroll-low-opacity', this._style.lowOpacity);
    }

    if (this._style.highOpacity) {
      this._target.style.setProperty('--scroll-high-opacity', this._style.highOpacity);
    }

    if (this._style.transitionDuration) {
      this._target.style.setProperty('--scroll-transition-duration', this._style.transitionDuration);
    }
  }


}


export default ScrollBar;
