class ContextMenu {


  constructor(options) {
    this._target = options.target;
    this._url = `/fragment/context/${options.name}/`;
    this._overlay = {};
    this._dom = {};
    this._evtIds = [];

    this._fetchTemplate();
  }


  destroy() {
    if (this._overlay?.innerHTML && document.body.contains(this._overlay)) {
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
      window.removeEventListener('resize', this.close.bind(this), false);
    }
  }


  /* TODO destroy and proper event handling */
  _fetchTemplate() {
    mzk.kom.getText(this._url)
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



  open(event, options) {
    if (this._open) {
      this._open(event, options);
    }

    document.body.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
    window.addEventListener('resize', this.close.bind(this), false);
  }


  close(event, options) {
    if (this._close) {
      this._close(event, options);
    }

    if (document.body.contains(this._overlay)) {
      document.body.removeChild(this._overlay);
      this._overlay.removeEventListener('click', this._viewportClicked, false);
      window.removeEventListener('resize', this.close.bind(this), false);
    }
  }


  isOpen() {
    return document.body.contains(this._overlay);
  }


  get dom() {
    return this._dom;
  }

  
}

export default ContextMenu;
