import Overlays from '../Overlays.js';
'use strict';


class ContextMenu extends Overlays {


  constructor(options) {
    super(options);
    this._target = options.target;
  }


  open() {
    document.body.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (document.body.contains(this._overlay)) {
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }


  isOpen() {
    return document.body.contains(this._overlay);
  }


}

export default ContextMenu;
