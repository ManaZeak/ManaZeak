'use strict';


class AlbumViewEntry {
  constructor(options) {
    if (typeof options !== 'object') {
      return;
    }
    this._artist = options.track.artist || '';
    this._composer = options.track.composer || '';
    this._duration = options.track.duration || '';
    this._id = options.track.id || '';
    this._title = options.track.title || '';
    this._trackNumber = options.trackNumber;
    this._dom = {
      container: {},
      duration: {}
    };

    this._dom.container = document.createElement('DIV');
    this._dom.container.classList.add('track');
    this._dom.container.dataset.id = options.datasetId;

    this._isSelected = false;
    this._isPlaying = false;

    this._init();
  }

  _init() {
    this._dom.container.dataset.before = (this._trackNumber + 1);

    this._dom.duration = document.createElement('P');
    this._dom.duration.innerHTML = Utils.secondsToTimecode(this._duration);

    this._dom.title = document.createElement('P');
    this._dom.title.innerHTML = this._title;

    this._dom.composer = document.createElement('P');
    this._dom.composer.innerHTML = `${this._artist} - ${this._composer}`;

    this._dom.container.appendChild(this._dom.duration);
    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.composer);
  }

  getDom() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom.container);
    return fragment;
  }

  get dom() {
    return this._dom.container;
  }

  setSelected(status) {
    this._isSelected = status;

    if (!status) {
      this._dom.container.classList.remove('selected');
    } else {
      this._dom.container.classList.add('selected');
    }
  }

  setPlaying(status) {
    this._isPlaying = status;

    if (!status) {
      this._dom.container.classList.remove('playing');
    } else {
      this._dom.container.classList.add('playing');
    }
  }

  getIsSelected() {
    return this._isSelected;
  }


  get id() {
    return this._id;
  }

  get container() {
    return this._dom.container;
  }
}

export default AlbumViewEntry;
