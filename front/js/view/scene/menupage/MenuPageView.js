import SceneView from '../utils/SceneView';


class MenuPageView extends SceneView {


  constructor(options) {
    super(options);

    this._adminItem = null;
    this._userItem = null;
    this._wishItem = null;
    this._aboutItem = null;

    this._evtIds = [];

    this._fetchWrapper('/fragment/menupage/')
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._adminItem = this.dom.querySelector('#admin-button');
    this._userItem = this.dom.querySelector('#userpage-button');
    this._wishItem = this.dom.querySelector('#wish-button');
    this._aboutItem = this.dom.querySelector('#about-button');

    this._events();
  }


  _events() {
    this._evtIds.push(Events.addEvent('click', this._adminItem, this._adminClicked, this));
    this._evtIds.push(Events.addEvent('click', this._userItem, this._userClicked, this));
    this._evtIds.push(Events.addEvent('click', this._wishItem, this._wishClicked, this));
    this._evtIds.push(Events.addEvent('click', this._aboutItem, this._aboutClicked, this));
  }


  _adminClicked() {
    mzk.setView({
      name: 'AdminPage', // To use in ViewFactory
      type: 'admin', // To retrieve DOM elements
      url: '/fragment/admin'
    });
  }


  _userClicked() {
    mzk.setView({
      name: 'AccountPage',
      type: 'account',
      url: '/fragment/account'
    });
  }


  _wishClicked() {
    mzk.setModal({
      name: 'Wish',
      url: '/fragment/wish'
    });
  }


  _aboutClicked() {
    mzk.setModal({
      name: 'About',
      url: '/fragment/modal/about'
    });
  }


}


export default MenuPageView;
