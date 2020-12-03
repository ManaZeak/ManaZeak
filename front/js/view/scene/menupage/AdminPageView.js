import TabView from '../utils/TabView';


class AdminPageView extends TabView {


  constructor(options) {
    super(options);

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .then(this._usersClicked.bind(this))
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    super._fillAttributes();
    this._events();
  }


  _events() {
    super._events();
  }


  _usersClicked() {
    this._fetchViewFragment('/fragment/admin/user-list');
  }


  _wishesClicked() {
    this._fetchViewFragment('/fragment/admin/wish/all');
  }


}


export default AdminPageView;
