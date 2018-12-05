import ContextMenu from '../../../utils/feedback/ContextMenu.js';
'use strict';


class TrackContext extends ContextMenu {
  constructor(options) {
    super(options);

    this._targetId = -1;

    this._commands = {
      queue: {}
    };
  }

  _addToQueue(event) {
    event.stopImmediatePropagation();

    mzk.addTrackToQueue(this._targetId);
    this.close();
  }

  setActions(doc) {
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];
  }

  open(event, id) {
    this._targetId = id;
    this._dom.style.left = `${event.clientX}px`;
    this._dom.style.top = `${event.clientY}px`;
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
    this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._targetId = -1;
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
      this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);
    }
  }
}

export default TrackContext;
