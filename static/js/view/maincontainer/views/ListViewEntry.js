'user strict';

class ListViewEntry {
  constructor(options) {
    if (typeof options !== 'object') { return; }
    this.artist = options.track.artist || '';
    this.album = options.track.album || '';
    this.composer = options.track.composer || '';
    this.duration = options.track.duration || '';
    this.genre = options.track.genre || '';
    this.id = options.track.id || '';
    this.performer = options.track.performer || '';
    this.title = options.track.title || '';

    this._dom = document.createElement('DIV');
    this._dom.classList.add('entry');
    this._dom.dataset.id = options.datasetId;
    this._dom.style.gridTemplateColumns = options.gridTemplateColumns;

    this._isSelected = false;
  }

  addColumn(column) {
    this._dom.appendChild(column);
  }

  getTitleLowerCase() { return this.title.toLowerCase(); }
  getLowerCaseOf(tag) { return this[tag].toLowerCase(); }

  getIsSelected() { return this._isSelected; }

  getDom() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom)
    return fragment;
  }

  setSelected(status) {
    this._isSelected = status;

    if (!status) {
      this._dom.classList.remove('selected');
    }

    else {
      this._dom.classList.add('selected');
    }
  }
}

export default ListViewEntry;
