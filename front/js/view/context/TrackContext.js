import ContextMenu from './ContextMenu.js';


class TrackContext extends ContextMenu {


constructor(options) {
    super(options);

    this._targetId = -1;
    this._targetName = -1;

    this._commands = {
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


  _download() {
    mzk.download({
      id: this._targetId,
      name: this._targetName
    });
    this.close();
  }


  _addToQueue(event) {
    event.stopImmediatePropagation();
    mzk.queue({
      type: 'track',
      id: this._targetId
    });
    this.close();
  }


  _tapBpm() {
    mzk.tapBpmForId(this._targetId);
    this.close();
  }


  setActions(doc) {
    this._commands.download = doc.getElementsByClassName('download')[0];
    this._commands.queue = doc.getElementsByClassName('add-to-queue')[0];
    this._commands.tapBpm = doc.getElementsByClassName('tap-bpm')[0];

    this._text.download = doc.getElementsByClassName('track-download')[0];
    this._text.queue = doc.getElementsByClassName('track-queue')[0];
    this._commands.download.addEventListener('click', this._download.bind(this), false);
    this._commands.queue.addEventListener('click', this._addToQueue.bind(this), false);

    if (true/*mzk.user.hasPermission('TAGE')*/) {
      this._text.tapBpm = doc.getElementsByClassName('track-tap-bpm')[0];
      this._commands.tapBpm.addEventListener('click', this._tapBpm.bind(this), false);
    } else {
      this._commands.tapBpm.parentNode.removeChild(this._commands.tapBpm);
    }
  }


  _open(event, options) {
    this._targetId = options.id;
    this._targetName = options.name;
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
/*
    this._text.download.innerHTML = mzk.lang.context.track.download;
    this._text.queue.innerHTML = mzk.lang.context.track.queue;
*/
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
