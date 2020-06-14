import AdminSceneView from "../AdminSceneView";


class AdminOverviewView extends AdminSceneView {


  constructor(options) {
    super(options);

    this._init();
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


}


export default AdminOverviewView;