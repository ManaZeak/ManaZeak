class Modal {


  constructor(options) {
    this._url = options.url;
    this._rootElement = null;

    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'loading-overlay';

    this._openEvtId = -1;

    this._loadTemplate();
  }


  _loadTemplate() {
    mzk.kom.getText(this._url).then(response => {
      this._rootElement = Utils.parseHTMLFragment(response);
      this._loadingOverlay.appendChild(this._rootElement);
      this.open();
      this._fillAttributes();
    });
  }


  _fillAttributes() {
    // Must be overriden in child class
  }


  open() {
    document.body.appendChild(this._loadingOverlay);
    this._openEvtId = Events.addEvent('click', this._loadingOverlay, this.close, this);
  }


  close(event) {
    if ((event && event.target === this._loadingOverlay) || !event) {
      document.body.removeChild(this._loadingOverlay);
      Events.removeEvent(this._openEvtId);
      this._openEvtId = -1;
    }
  }


}


export default Modal;