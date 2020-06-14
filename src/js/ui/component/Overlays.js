'use strict';


class Overlays {


  constructor(options) {
    this._url = options.url;
    this._overlay = {};
    this._dom = {};

    this._fetchTemplate();
  }


  _fetchTemplate() {
    mzk.komunikator.getTemplate(this._url)
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        this._overlay = doc.getElementsByClassName('context-transparent-overlay')[0];
        this._dom = doc.getElementsByClassName(this._overlay.children[0].className)[0];
        this._events();
        this.setActions(doc);

        if (this._url.indexOf('modal') !== -1) {
          this.open();
        }
      });
  }


  _events() {
    this._viewportClicked = this._viewportClicked.bind(this);
  }


  _viewportClicked(event) {
    event.stopImmediatePropagation();

    if (event.target === this._overlay) {
      this.close();
    }
  }


  setActions() {
    // Mandatory to override in children class
  }


  open() {
    // Mandatory to override in children class
  }


  close() {
    // Mandatory to override in children class
  }


  get dom() {
    return this._dom;
  }


}

export default Overlays;
