import TabView from '../utils/TabView';
import UsersFragment from './admin/UsersFragment';
import WishesFragment from './admin/WishesFragment';


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
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/user-list')
      .then(() => {
        this._activeFragment = new UsersFragment({
          target: this._viewContainer,
          refresh: this._usersClicked.bind(this)
        });
      })
      .catch(error => {
        Logger.raise(error);
      });
  }


  _wishesClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/wish/all')
      .then(() => {
        this._activeFragment = new WishesFragment({
          target: this._viewContainer,
          refresh: this._wishesClicked.bind(this)
        });
      })
      .catch(error => {
        Logger.raise(error);
      });
  }


}


export default AdminPageView;
