import Overlays from '../Overlays.js';
'use strict';


class ContextMenu extends Overlays {


  constructor(options) {
    super(options);
    this._target = options.target;
  }


  open(options) {
    if (this._open) {
      this._open(options);
    }

    document.body.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
    window.addEventListener('resize', this.close.bind(this), false);
  }


  close(options) {
    if (this._close) {
      this._close(options);
    }

    if (document.body.contains(this._overlay)) {
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
      window.removeEventListener('resize', this.close.bind(this), false);
    }
  }


  isOpen() {
    return document.body.contains(this._overlay);
  }


}

export default ContextMenu;
