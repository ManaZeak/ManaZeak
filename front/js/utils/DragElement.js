class DragElement {


  /** @summary <h1>Make any DOM element draggable</h1>
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This class will make any DOM element draggable, and attach specific data on it that can be
   * used on drop (see DropElement class). It handle both the desktop and the mobile behavior. It must be used with a
   * DropElement class for perfect compatibility!</blockquote>
   * @param {object} options - The element to drag options
   * @param {object} options.target - The element to make draggable
   * @param {string} options.data - The data to attach to the drag event, that will be retrieved on drop **/
  constructor(options) {
    /** @private
     * @member {object} - The element to make draggable */
    this._target = options.target;
    /** @private
     * @member {object} - The data to attached */
    this._data = options.data;
    /** @private
     * @member {number[]} - The event IDs for all mobile and desktop dragging events */
    this._eventIds = [];
    /** @private
     * @member {boolean} - A flag to know if dragging is occurring in mobile */
    this._touchStarted = false;
    /** @private
     * @member {object} - The target DOM copy for a proper drag animation in mobile */
    this._touchPhantomDom = null;
    // Build DOM elements and subscribe to drag events
    this._buildElements();
    this._events();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will unsubscribe all drag events and remove all properties.</blockquote> **/
  destroy() {
    for (let i = 0; i < this._eventIds.length; ++i) {
      Events.removeEvent(this._eventIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------  DRAGELEMENT INSTANTIATION SEQUENCE  ---------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _buildElements
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will make the target element draggable adding the proper attribute. It will
   * also create a copy of the draggable DOM element and set its style with a fixed position and half its opacity to
   * emulate the desktop drag animation in mobile.</blockquote> **/
  _buildElements() {
    this._touchPhantomDom = this._target.cloneNode(true);
    this._touchPhantomDom.style.position = 'fixed';
    this._touchPhantomDom.style.opacity = '.5';
    this._target.setAttribute('draggable', 'true');
  }


  /** @method
   * @name _events
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will subscribe to drag events, both for desktop and mobile.</blockquote> **/
  _events() {
    this._eventIds.push(Events.addEvent('dragstart', this._target, this._dragStart, this));
    this._eventIds.push(Events.addEvent('touchstart', this._target, this._dragStart, this));
    this._eventIds.push(Events.addEvent('touchmove', this._target, this._dragTouchMove, this));
    this._eventIds.push(Events.addEvent('touchend', this._target, this._dragTouchEnd, this));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  MOBILE AND DESKTOP DRAG EVENTS METHODS  --------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragStart
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the desktop drag start event by attaching the data into the event.
   * On mobile, it will compute the target current position to update the phantom DOM element position. It then attach
   * the initial touch position and finally attach the phantom DOM element next to the target element.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _dragStart(event) {
    if (event.dataTransfer) { // Desktop behavior
      event.dataTransfer.setData('text/plain', JSON.stringify(this._data));
    } else { // Mobile behavior
      event.preventDefault(); // Avoid context to be triggered on touch kept pushed
      this._touchStarted = true;
      // Define style for phantom DIV according to the dragged item style values
      const rect = this._target.getBoundingClientRect();
      const style = window.getComputedStyle(this._target); // Get margin, as they make the position calculus wrong
      const leftMargin = parseInt(style.marginLeft.replace('px', ''));
      const topMargin = parseInt(style.marginTop.replace('px', ''));
      this._touchPhantomDom.style.top = `${rect.top - topMargin}px`;
      this._touchPhantomDom.style.left = `${rect.left - leftMargin}px`;
      this._touchPhantomDom.style.height = `${rect.height}px`;
      this._touchPhantomDom.style.width = `${rect.width}px`;
      // We need to keep track of the initial touch position to properly make the div move under the finger
      this._touchPhantomDom.dataset.startX = event.targetTouches[0].pageX - rect.left + leftMargin;
      this._touchPhantomDom.dataset.startY = event.targetTouches[0].pageY - rect.top + topMargin;
      // Append to DOM parent to have the exact same style without manually copying all the applied rules
      this._target.parentNode.appendChild(this._touchPhantomDom);
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MOBILE DRAG METHODS  ----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragTouchMove
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>On mobile, the dragging must be fully re-implemented as it is not standard. If any drag
   * start event was previously published, the phantom DOM element is moved according to the initial touch position,
   * relative to the event touch position.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchMove(event) {
    if (this._touchStarted === true) {
      this._touchPhantomDom.style.top = `${event.targetTouches[0].pageY - this._touchPhantomDom.dataset.startY}px`;
      this._touchPhantomDom.style.left = `${event.targetTouches[0].pageX - this._touchPhantomDom.dataset.startX}px`;
      // Attach a touch dragging flag to the event, so the DropElement class can know that a dragging event is occurring
      event.touchDragging = true;
    }
  }


  /** @method
   * @name _dragTouchEnd
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>On mobile, the dragging must be fully re-implemented as it is not standard. When the user
   * release its finger, we need to remove the phantom DOM element from the tree. The drag event data is attached as a
   * string to the event so it can be retrieved in the DropElement class.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchEnd(event) {
    this._touchStarted = false;
    this._target.parentNode.removeChild(this._touchPhantomDom);
    // Emulated dataTransfer into the event, we must attach at each touchmove so it can be retrieved in DropElement
    event.dataTransfer = {
      getData: type => {
        if (type === 'text/plain') {
          return JSON.stringify(this._data);
        }
      }
    };
  }


}


export default DragElement;