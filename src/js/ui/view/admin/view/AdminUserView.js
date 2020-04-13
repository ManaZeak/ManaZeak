import AdminSceneView from "../AdminSceneView";
import AdminUserEntry from "../entry/AdminUserEntry";
import ScrollBar from "../../../component/bar/ScrollBar";


class AdminUserView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._users = [];

    this._init()
      .then(this._initAdminUserView.bind(this));
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _initAdminUserView() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get('admin/getAllUsers/')
        .then(response => {
          for (let i = 0; i < response.USERS.length; ++i) {
            const user = new AdminUserEntry(response.USERS[i]);
            // Fill internal arrays of different suggestions states
            this._users.push(user.dom);
          }

          for (let i = 0; i < this._users.length; ++i) {
            this._dom.wrapper.appendChild(this._users[i]);
          }

          resolve();
        })
        .catch(reject)
    });
  }


}


export default AdminUserView;