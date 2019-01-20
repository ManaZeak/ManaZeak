import ContextMenu from '../../../utils/feedback/ContextMenu.js';
'use strict';


class TrackContext extends ContextMenu {
  constructor(options) {
    super(options);

    this._targetId = -1;

    this._commands = {
      playPause: {},
      stop: {},
      queue: {}
    };
  }


  _togglePlay() {
    mzk.changeTrack(this._targetId);
    this.close();
  }


  _stop() {
    mzk.stopPlayback();
    this.close();
  }


  _addToQueue(event) {
    event.stopImmediatePropagation();

    mzk.addTrackToQueue(this._targetId);
    this.close();
  }


  setActions(doc) {
    this._commands.playPause = doc.getElementsByClassName('play-pause')[0];
    this._commands.stop = doc.getElementsByClassName('stop')[0];
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];

    this._commands.playPause.addEventListener('click', this._togglePlay.bind(this), false);
    this._commands.stop.addEventListener('click', this._stop.bind(this), false);
    this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);
  }


  open(event, id) {
    this._targetId = id;
    this._dom.style.left = `${event.clientX}px`;
    this._dom.style.top = `${event.clientY}px`;
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._targetId = -1;
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default TrackContext;
