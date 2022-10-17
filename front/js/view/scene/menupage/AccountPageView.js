import TabView from '../utils/TabView';
import ProfileFragment from './account/ProfileFragment';
import PreferenceFragment from "./account/PreferenceFragment";


class AccountPageView extends TabView {


  constructor() {
    super({
      type: 'account',
      url: '/fragment/account/',
      css: 'static/dist/css/account.bundle.css'
    });

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .then(this._profileClicked.bind(this))
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


  _profileClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/account/profile').then(() => {
      this._activeFragment = new ProfileFragment({
        target: this._viewContainer,
        refresh: this._profileClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


  _preferenceClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/account/preference').then(() => {
      this._activeFragment = new PreferenceFragment({
        target: this._viewContainer,
        refresh: this._preferenceClicked.bind(this)
      });
    }).catch(error => Logger.raise(error));
  }


}


export default AccountPageView;
