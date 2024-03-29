import TabView from '../utils/TabView';
import UsersFragment from './admin/UsersFragment';
import ThumbsFragment from './admin/ThumbsFragment';
import WishesFragment from './admin/WishesFragment';
import SyncThingFragment from './admin/SyncThingFragment';
import CommandsFragment from './admin/CommandsFragment';


class AdminPageView extends TabView {


  constructor() {
    super({
      type: 'admin',
      url: '/fragment/admin/',
      css: 'static/dist/css/admin.bundle.css'
    });

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._usersClicked.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
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
    this._fetchViewFragment('/fragment/admin/user-list/').then(() => {
      this._activeFragment = new UsersFragment({
        target: this._viewContainer,
        refresh: this._usersClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  _thumbsClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/thumb/layout/').then(() => {
      this._activeFragment = new ThumbsFragment({
        target: this._viewContainer,
        refresh: this._wishesClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  _wishesClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/wish/all/').then(() => {
      this._activeFragment = new WishesFragment({
        target: this._viewContainer,
        refresh: this._wishesClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  _syncthingClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/syncthing/').then(() => {
      this._activeFragment = new SyncThingFragment({
        target: this._viewContainer,
        refresh: this._syncthingClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  _commandsClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/commands/').then(() => {
      this._activeFragment = new CommandsFragment({
        target: this._viewContainer,
        refresh: this._commandsClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  getDisplayName() {
    return 'Administration';
  }


}


export default AdminPageView;
