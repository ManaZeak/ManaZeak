import TabView from '../utils/TabView';


class AdminPageView extends TabView {


  constructor(options) {
    super(options);

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
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
    this._usersClicked();
  }


  _usersClicked() {
    this._viewContainer.innerHTML = '';
    this._fetchFragment('/fragment/admin/user-list').then(response => {
      this._viewContainer.innerHTML = response;
    }).catch(error => {
      Logger.raise(error);
    });
  }


  _wishesClicked() {
    this._viewContainer.innerHTML = '';
    this._fetchFragment('/fragment/admin/wish/all').then(response => {
      this._viewContainer.innerHTML = response;
    }).catch(error => {
      Logger.raise(error);
    });
  }


}


export default AdminPageView;
