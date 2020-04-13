import AdminSceneView from "../AdminSceneView";


class AdminDatabaseView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._dom = {
      buttons: {
        rescan: null,
        regenAllThumbs: null
      }
    };
    // Event binding
    this._rescan = this._rescan.bind(this);
    this._regenAllThumbs = this._regenAllThumbs.bind(this);
    // View init sequence
    this._init()
      .then(this._getInternals.bind(this))
      .then(this._addEvents.bind(this))
      .catch(errorCode => {
        Logger.raise({
          code: errorCode,
          frontend: true
        });
      });
  }


  destroy() {
    super.destroy();
    this._removeEvents();
    this._dom = null;
    Utils.removeAllObjectKeys(this);
  }


  _getInternals() {
    return new Promise((resolve, reject) => {
      this._dom.buttons.rescan = this._dom.wrapper.getElementsByClassName('database-rescan')[0];
      this._dom.buttons.regenAllThumbs = this._dom.wrapper.getElementsByClassName('database-regen-all-thumbs')[0];
      // Check proper DOM construction or reject if missing DOM elements
      Object.keys(this._dom.buttons).forEach(key => {
        // If one of playbackRate is null, reject
        if (this._dom.buttons[key] === null) {
          reject('MISSING_DOM_ELEMENTS');
        }
      });
      resolve();
    });
  }


  _addEvents() {
    this._dom.buttons.rescan.addEventListener('click', this._rescan, false);
    this._dom.buttons.regenAllThumbs.addEventListener('click', this._regenAllThumbs, false);
  }


  _removeEvents() {
    this._dom.buttons.rescan.removeEventListener('click', this._rescan, false);
    this._dom.buttons.regenAllThumbs.removeEventListener('click', this._regenAllThumbs, false);
  }


  _rescan() {
    mzk.komunikator.get('admin/reset')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }


  _regenAllThumbs() {
    mzk.komunikator.get('admin/regenerateThumbnails')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }


}


export default AdminDatabaseView;