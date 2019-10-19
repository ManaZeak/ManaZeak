import Overlays from '../Overlays.js';
'use strict';


class Modal extends Overlays {


  constructor(options) {
    super(options);
    this._callback = options.callback;
  }


  open() {
    Shortcut.pauseAll(); // Pause all shortcuts (especially the stop propagation)
    document.body.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (document.body.contains(this._overlay)) {
      Shortcut.resumeAll();
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default Modal;
