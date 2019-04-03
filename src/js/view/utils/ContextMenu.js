'use strict';

class ContextMenu {


  constructor(options) {
    this._target = options.target;
    this._url = options.url;
    this._overlay = {};
    this._dom = {};

    this._init();
  }

  _init() {
    mzk.komunikator.getTemplate(this._url)
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        this._overlay = doc.getElementsByClassName('context-transparent-overlay')[0];
        this._dom = doc.getElementsByClassName(this._overlay.children[0].className)[0];
        this._events();
        this.setActions(doc);
      });
  }


  _events() {
    this._viewportClicked = this._viewportClicked.bind(this);
  }


  _viewportClicked(event) {
    event.stopImmediatePropagation();

    if (!event.target.closest(this._overlay.children[0].className)) {
      this.close();
    }
  }


  setActions() {
    // Mandatory to override in children class
  }


  open() {
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (this._target.contains(this._overlay)) {
      this._target.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }


  get dom() {
    return this._dom;
  }
}

export default ContextMenu;
