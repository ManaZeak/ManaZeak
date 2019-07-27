'use strict';

class ListViewEntry {
  /**
   * @summary ListView entry
   * @author Arthur Beaulieu
   * @since August 2018
   * @description A ListView item that aim to contain track and its interactivity
   **/
  constructor(options) {
    if (typeof options !== 'object') {
      return;
    }

    this.artist = options.track.artist || '';
    this.album = options.track.album.NAME || '';
    this.composer = options.track.composers || '';
    this.duration = options.track.duration || '';
    this.genre = options.track.genre || '';
    this.id = options.track.id || '';
    this.performer = options.track.performers || '';
    this.title = options.track.title || '';
    this.year = options.track.year || '';
    this.bitrate = options.track.bitrate || '';

    this._dom = {
      container: {}
    };

    this._dom.container = document.createElement('DIV');
    this._dom.container.classList.add('track');
    this._dom.container.dataset.id = options.datasetId;
    this._dom.container.style.gridTemplateColumns = options.gridTemplateColumns;

    this._isSelected = false;
    this._isPlaying = false;
  }


  _setIsPlaying(status) {
    this._isPlaying = status;

    if (!status) {
      this._dom.container.classList.remove('playing');
    } else {
      this._dom.container.classList.add('playing');
    }
  }


  _setIsSelected(status) {
    this._isSelected = status;

    if (!status) {
      this._dom.container.classList.remove('selected');
    } else {
      this._dom.container.classList.add('selected');
    }
  }


  addColumn(column) {
    this._dom.container.appendChild(column);
  }


  getTagValue(tag) {
    return this[tag];
  }


  get dom() {
    return this._dom.container;
  }


  get domFragment() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom.container);
    return fragment;
  }


  get selected() {
    return this._isSelected;
  }


  set playing(status) {
    this._setIsPlaying(status);
  }


  set selected(status) {
    this._setIsSelected(status);
  }
}

export default ListViewEntry;
