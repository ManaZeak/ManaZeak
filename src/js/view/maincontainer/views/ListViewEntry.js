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
    this.composer = options.track.composer || '';
    this.duration = options.track.duration || '';
    this.genre = options.track.genre || '';
    this.id = options.track.id || '';
    this.performer = options.track.performer || '';
    this.title = options.track.title || '';

    this._dom = document.createElement('DIV');
    this._dom.classList.add('track');
    this._dom.dataset.id = options.datasetId;
    this._dom.style.gridTemplateColumns = options.gridTemplateColumns;

    this._isSelected = false;
    this._isPlaying = false;
  }

  addColumn(column) {
    this._dom.appendChild(column);
  }

  getDom() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    return fragment;
  }

  get dom() {
    return this._dom;
  }

  setSelected(status) {
    this._isSelected = status;

    if (!status) {
      this._dom.classList.remove('selected');
    } else {
      this._dom.classList.add('selected');
    }
  }

  setPlaying(status) {
    this._isPlaying = status;

    if (!status) {
      this._dom.classList.remove('playing');
    } else {
      this._dom.classList.add('playing');
    }
  }

  getLowerCaseOf(tag) {
    return this[tag].toString().toLowerCase();
  }
  get(tag) {
    return this[tag];
  }
  getIsSelected() {
    return this._isSelected;
  }

}

export default ListViewEntry;
