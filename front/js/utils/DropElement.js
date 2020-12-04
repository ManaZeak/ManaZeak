class DropElement {


  constructor(options) {
    this._target = options.target; // Get given target from the DOM
    this._onDropCB = options.onDrop; // Assign the onDropFile callback to an internal
    this._movementCounter = 0;
    this._eventIds = [];
    this._borderStyle = 'dashed 3px transparent';
    this._target.style.border = this._borderStyle;
    this._events(); // Attach all drag events
  }


  destroy() {
    for (let i = 0; i < this._eventIds.length; ++i) {
      Events.removeEvent(this._eventIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  _events() {
    this._eventIds.push(Events.addEvent('dragenter', this._target, this._dragEnter, this));
    this._eventIds.push(Events.addEvent('dragover', this._target, this._dragOver, this));
    this._eventIds.push(Events.addEvent('dragleave', this._target, this._dragLeave, this));
    this._eventIds.push(Events.addEvent('drop', this._target, this._drop, this));
    this._eventIds.push(Events.addEvent('touchmove', document.body, this._dragTouchOver, this));
    this._eventIds.push(Events.addEvent('touchend', document.body, this._dragTouchEnd, this));
  }


  _eventBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
  }


  _dragEnter(event) {
    ++this._movementCounter;
    this._eventBehavior(event);
    this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
  }


  _dragOver(event) {
    this._eventBehavior(event);
    event.dataTransfer.dropEffect = 'copy';
  }


  _dragTouchOver(event) {
    if (event.touchDragging) { // This flag has been set in DragElement class to know if a touch drag is occuring
      const rect = this._target.getBoundingClientRect();
      const inAxisX = event.targetTouches[0].pageX >= rect.x && (event.targetTouches[0].pageX <= rect.x + rect.width);
      const inAxisY = event.targetTouches[0].pageY >= rect.y && (event.targetTouches[0].pageY <= rect.y + rect.height);
      if (inAxisX && inAxisY) { // Mobile equivalent to dragenter
        this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
      } else { // Same for dragleave
        this._target.style.border = this._borderStyle;
      }
    }
  }


  _dragTouchEnd(event) {
    if (event.dataTransfer) { // Touch has an emulated dataTransfer element, see DragElement
      this._drop(event);
    }
  }


  _dragLeave(event) {
    --this._movementCounter;
    this._eventBehavior(event);

    if (this._movementCounter === 0) {
      this._target.style.border = this._borderStyle;
    }
  }


  _drop(event) {
    this._eventBehavior(event);
    this._target.style.border = this._borderStyle;
    this._onDropCB(JSON.parse(event.dataTransfer.getData('text/plain')));
  }


}


export default DropElement;