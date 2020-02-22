import ContextMenu from '../component/overlay/ContextMenu.js';
'use strict';


class TrackContext extends ContextMenu {


  constructor(options) {
    super(options);

    this._targetId = -1;
    this._commands = {
      controls: {
        playPause: {},
        stop: {},
        next: {},
        previous: {}
      },
      download: {},
      queue: {},
      tapBpm: {}
    };

    this._text = {
      download: {},
      queue: {},
      tapBpm: {}
    };
  }


  _previous() {
    mzk.previousTrackInView();
    this.close();
  }


  _togglePlay() {
    mzk.changeTrack(mzk.ui.getTrackById(this._targetId).id);
    this.close();
  }


  _stop() {
    mzk.stopPlayback();
    this.close();
  }


  _next() {
    mzk.next();
    this.close();
  }


  _download() {
    mzk.download(this._targetId);
    this.close();
  }


  _addToQueue(event) {
    event.stopImmediatePropagation();
    mzk.addTrackToQueue(this._targetId);
    this.close();
  }


  _tapBpm() {
    mzk.tapBpmForId(this._targetId);
    this.close();
  }


  setActions(doc) {
    this._commands.controls.previous = doc.getElementsByClassName('previous')[0];
    this._commands.controls.playPause = doc.getElementsByClassName('play-pause')[0];
    this._commands.controls.stop = doc.getElementsByClassName('stop')[0];
    this._commands.controls.next = doc.getElementsByClassName('next')[0];
    this._commands.download = doc.getElementsByClassName('download')[0];
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];
    this._commands.tapBpm = doc.getElementsByClassName('tap-bpm')[0];

    this._text.download = doc.getElementsByClassName('track-download')[0];
    this._text.queue = doc.getElementsByClassName('track-queue')[0];
    this._text.tapBpm = doc.getElementsByClassName('track-tap-bpm')[0];

    this._commands.controls.previous.addEventListener('click', this._previous.bind(this), false);
    this._commands.controls.playPause.addEventListener('click', this._togglePlay.bind(this), false);
    this._commands.controls.stop.addEventListener('click', this._stop.bind(this), false);
    this._commands.controls.next.addEventListener('click', this._next.bind(this), false);
    this._commands.download.addEventListener('click', this._download.bind(this), false);
    this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);
    this._commands.tapBpm.addEventListener('click', this._tapBpm.bind(this), false);
  }


  _open(event, id) {
    this._targetId = id;
    const pos = {
      x: event.clientX,
      y: event.clientY
    };

    this._dom.style.left = '0';
    this._dom.style.top = '0';
    this._target.appendChild(this._overlay);
    const contextWidth = getComputedStyle(this._overlay.children[0]).width;
    const offset = parseInt(contextWidth.substring(0, contextWidth.length - 2)); // Removing px from string

    // Avoid X overflow : X pos + context width
    if (event.clientX + offset > document.body.clientWidth) {
      pos.x -= offset;
    }
    // Avoid Y overflow : Y pos + context height + footbar height
    if (event.clientY + (Object.keys(this._commands).length * 30) + 80 > document.body.clientHeight) {
      pos.y -= (Object.keys(this._commands).length * 30);
    }

    this._text.download.innerHTML = mzk.lang.context.track.download;
    this._text.queue.innerHTML = mzk.lang.context.track.queue;

    this._dom.style.left = `${pos.x}px`;
    this._dom.style.top = `${pos.y}px`;
    this._target.appendChild(this._overlay);
  }


  _close() {
    if (this._target.contains(this._overlay)) {
      this._targetId = -1;
      this._target.removeChild(this._overlay);
    }
  }
}

export default TrackContext;
