import AdminSceneView from "../AdminSceneView";
import ScrollBar from "../../../component/bar/ScrollBar";


class AdminUserView extends AdminSceneView {


  constructor(options) {
    super(options);

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
          console.log(response)
          resolve();
        })
        .catch(reject)
    });
  }


}


export default AdminUserView;