import ContextMenu from '../../../utils/feedback/ContextMenu.js';
'use strict';


class TrackContext extends ContextMenu {
  constructor(options) {
    super(options);

    this._commands = {
      queue: {}
    };
  }

  setActions(doc) {
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];
  }

  open(event) {
    this._dom.style.left = `${event.clientX}px`;
    this._dom.style.top = `${event.clientY}px`;

    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default TrackContext