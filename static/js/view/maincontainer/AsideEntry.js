class AsideEntry {

  constructor(options) {
    this.title = options.title;
    this.dom = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this.dom.title = document.createElement('P');
    this.dom.title.innerHTML = this.title;
  }

  getDom() { return this.dom.title; }
}

export default AsideEntry;
