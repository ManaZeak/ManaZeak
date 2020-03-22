import AdminSceneView from "../AdminSceneView";


class AdminDatabaseView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._rescanButton = null;

    this._init()
      .then(this._getInternals.bind(this))
      .then(this._events.bind(this));
  }


  _getInternals() {
    this._rescanButton = this._dom.wrapper.getElementsByClassName('database-rescan')[0];
  }


  _events(doc) {
    this._rescanButton.addEventListener('click', this._rescan.bind(this), false);
  }


  _rescan() {
    mzk.komunikator.get('admin/reset')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }


}


export default AdminDatabaseView;