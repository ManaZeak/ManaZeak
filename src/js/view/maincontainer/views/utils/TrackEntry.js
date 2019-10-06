class TrackEntry {


  constructor(options) {
    this._dom = {
      container: document.createElement('DIV')
    };

    this._dom.container.classList.add('track');
    this._dom.container.dataset.id = options.datasetId;

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


  get playing() {
    return this._isPlaying;
  }


  set selected(status) {
    this._setIsSelected(status);
  }



  set playing(status) {
    this._setIsPlaying(status);
  }


}


export default TrackEntry;