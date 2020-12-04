class DragElement {


  constructor(options) {
    this._target = options.target;
    this._data = options.data;
    this._dragStartEvtId = -1;
    this._target.setAttribute('draggable', 'true');
    this._events();
  }


  destroy() {
    Events.removeEvent(this._dragStartEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _events() {
    this._dragStartEvtId = Events.addEvent('dragstart', this._target, this._dragStart, this);
  }


  _dragStart(event) {
    event.dataTransfer.setData('text/plain', JSON.stringify(this._data));
  }


}


export default DragElement;