class DropElement {


  /** @summary <h1>Make any DOM element drop friendly</h1>
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This class will make any DOM element able to receive drop event. It propose an overlay
   * when the target is hovered with a draggable element. It handle both the desktop and the mobile behavior. It must be
   * used with a DragElement class for perfect compatibility!</blockquote>
   * @param {object} options - The element to drop options
   * @param {object} options.target - The element to allow dropping in
   * @param {function} options.onDrop - The method to call for each drop event **/
  constructor(options) {
    /** @private
     * @member {object} - The element to make allow dropping in */
    this._target = options.target; // Get given target from the DOM
    /** @private
     * @member {function} - The callback function to call on each drop event */
    this._onDropCB = options.onDrop;
    /** @private
     * @member {number[]} - The event IDs for all mobile and desktop dropping events */
    this._eventIds = [];
    /** @private
     * @member {number} - This counter helps to avoid enter/leave events to overlap when target has children */
    this._movementCounter = 0;
    /** @private
     * @member {string} - The transparent border that must be added to avoid weird target resize on hover */
    this._transparentBorder = '';
    // Build DOM elements and subscribe to drag events
    this._buildElements();
    this._events();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will unsubscribe all drop events and remove all properties.</blockquote> **/
  destroy() {
    for (let i = 0; i < this._eventIds.length; ++i) {
      Events.removeEvent(this._eventIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------  DROPELEMENT INSTANTIATION SEQUENCE  ---------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _buildElements
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will define the transparent border style and append this virtual border to the
   * target DOM element.</blockquote> **/
  _buildElements() {
    this._transparentBorder = 'dashed 3px transparent';
    this._target.style.border = this._transparentBorder;
  }


  /** @method
   * @name _events
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will subscribe to drop events, both for desktop and mobile.</blockquote> **/
  _events() {
    this._eventIds.push(Events.addEvent('dragenter', this._target, this._dragEnter, this));
    this._eventIds.push(Events.addEvent('dragover', this._target, this._dragOver, this));
    this._eventIds.push(Events.addEvent('dragleave', this._target, this._dragLeave, this));
    this._eventIds.push(Events.addEvent('drop', this._target, this._drop, this));
    this._eventIds.push(Events.addEvent('touchmove', document.body, this._dragTouchOver, this));
    this._eventIds.push(Events.addEvent('touchend', document.body, this._dragTouchEnd, this));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------  DESKTOP DROP EVENTS METHODS  --------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragEnter
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the entering of a dragged div over the target DOM element. When
   * the target DOM element is hovered, a dashed border is made visible, replacing the transparent one to notify the
   * user that the dragged div can be dropped.</blockquote>
   * @param {object} event - The mouse event **/
  _dragEnter(event) {
    this._eventBehavior(event);
    ++this._movementCounter;
    this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
  }


  /** @method
   * @name _dragOver
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the dragged div hovering the target DOM element.</blockquote>
   * @param {object} event - The mouse event **/
  _dragOver(event) {
    this._eventBehavior(event);
    event.dataTransfer.dropEffect = 'copy';
  }


  /** @method
   * @name _dragLeave
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the event that is fired when the hovered div leaves the target
   * DOM element. It require the movement counter to be equal to zero to restore the transparent border of the target
   * DOM element.</blockquote>
   * @param {object} event - The mouse event **/
  _dragLeave(event) {
    this._eventBehavior(event);
    --this._movementCounter;
    if (this._movementCounter === 0) {
      this._target.style.border = this._transparentBorder;
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MOBILE DROP EVENTS METHODS  --------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragTouchOver
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the hovering of a dragged div over the target DOM element. The
   * touch dragging flag is attached to the event in the DropElement class, so we can ensure to only trigger the
   * dragging over event logic when the event is coming after a drag touch has occurred in DropElement.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchOver(event) {
    if (event.touchDragging) { // This flag has been set in DragElement class to know if a touch drag is occurring
      if (this._isTouchEventInTarget(event.targetTouches[0])) { // Mobile equivalent to dragenter
        this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
      } else { // Same for dragleave
        this._target.style.border = this._transparentBorder;
      }
    }
  }


  /** @method
   * @name _dragTouchEnd
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the pre-drop event for mobile devices. The dataTransfer is
   * attached to the event by DragElement class, to recognize a touch ended event that is linked with a dragging in
   * progress. The touch position is then tested to fired the drop method if the touch end occurred on the target DOM
   * element.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchEnd(event) {
    // Touch event has an emulated dataTransfer element, see DragElement. touched position is held in changedTouches
    if (event.dataTransfer && this._isTouchEventInTarget(event.changedTouches[0])) {
      this._drop(event);
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  MOBILE AND DESKTOP DROP EVENTS METHODS  --------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _drop
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the dropping of a DragElement, to properly read the data it holds
   * and send it to the drop callback provided in constructor.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _drop(event) {
    this._eventBehavior(event);
    this._target.style.border = this._transparentBorder;
    this._onDropCB(JSON.parse(event.dataTransfer.getData('text/plain')));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  UTILS METHODS  --------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _eventBehavior
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will prevent the default behavior of given event, and will stop its
   * propagation.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _eventBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
  }


  /** @method
   * @name _isTouchEventInTarget
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will compare a touch point to the target position and return true if the
   * touch point is inside the target DOM element.</blockquote>
   * @param {object} touchPosition - The touch event
   * @return {boolean} Do the touch point is included in the target DOM element **/
  _isTouchEventInTarget(touchPosition) {
    const rect = this._target.getBoundingClientRect();
    const inAxisX = touchPosition.pageX >= rect.x && (touchPosition.pageX <= rect.x + rect.width);
    const inAxisY = touchPosition.pageY >= rect.y && (touchPosition.pageY <= rect.y + rect.height);
    return (inAxisX && inAxisY);
  }


}


export default DropElement;