'use strict';


class Modal {
  constructor(options) {
    this._callback = options.callback;
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

        this._overlay = doc.getElementsByClassName('modal-overlay')[0];
        this._dom = doc.getElementsByClassName(this._overlay.children[0].className)[0];
        this._events();
        this.setActions(doc);
        this.open();
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
    Shortcut.pauseAll(); // Pause all shortcuts (espascially the stop propagation)
    document.body.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    if (document.body.contains(this._overlay)) {
      Shortcut.resumeAll();
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
    }
  }
}

export default Modal;
