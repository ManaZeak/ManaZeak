class DragElement {


  constructor(options) {
    this._target = options.target;
    this._data = options.data;

    this._dragStartEvtId = -1;

    this._touchStartEvtId = -1;
    this._touchMoveEvtId = -1;
    this._touchEndEvtId = -1;
    this._touchStarted = false;
    this._touchPhantomDom = null;

    this._buildElements();
    this._events();
  }


  destroy() {
    Events.removeEvent(this._dragStartEvtId);
    Events.removeEvent(this._touchStartEvtId);
    Events.removeEvent(this._touchMoveEvtId);
    Events.removeEvent(this._touchEndEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _buildElements() {
    this._touchPhantomDom = this._target.cloneNode(true);
    this._touchPhantomDom.style.position = 'fixed';
    this._touchPhantomDom.style.opacity = '.5';
    this._target.setAttribute('draggable', 'true');
  }


  _events() {
    this._dragStartEvtId = Events.addEvent('dragstart', this._target, this._dragStart, this);
    this._touchStartEvtId = Events.addEvent('touchstart', this._target, this._dragStart, this);
    this._touchMoveEvtId = Events.addEvent('touchmove', this._target, this._dragTouchMove, this);
    this._touchEndEvtId = Events.addEvent('touchend', this._target, this._dragTouchEnd, this);
  }


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
      this._touchPhantomDom.dataset.startX = event.targetTouches[0].pageX - rect.left + leftMargin;
      this._touchPhantomDom.dataset.startY = event.targetTouches[0].pageY - rect.top + topMargin;
      // Append to DOM parent to have the exact same style
      this._target.parentNode.appendChild(this._touchPhantomDom);
    }
  }


  _dragTouchMove(event) {
    if (this._touchStarted === true) {
      this._touchPhantomDom.style.top = `${event.targetTouches[0].pageY - this._touchPhantomDom.dataset.startY}px`;
      this._touchPhantomDom.style.left = `${event.targetTouches[0].pageX - this._touchPhantomDom.dataset.startX}px`;
      // Attach the
      event.touchDragging = true;
    }
  }


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