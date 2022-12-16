import SceneView from '../utils/SceneView';


class MenuPageView extends SceneView {


  constructor() {
    super({
      type: 'menu',
      url: '/fragment/menupage/',
      css: 'static/dist/css/menu.bundle.css'
    });

    this._adminItem = null;
    this._userItem = null;
    this._wishItem = null;
    this._aboutItem = null;

    this._evtIds = [];

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .catch(error => Logger.raise(error));
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
    this._evtIds.push(Evts.addEvent('click', this._adminItem, mzk.setView.bind(mzk, { name: 'AdminPage' }), this));
    this._evtIds.push(Evts.addEvent('click', this._userItem, mzk.setView.bind(mzk, { name: 'AccountPage' }), this));
    this._evtIds.push(Evts.addEvent('click', this._wishItem, mzk.setModal.bind(mzk, { name: 'Wish' }), this));
    this._evtIds.push(Evts.addEvent('click', this._aboutItem, mzk.setModal.bind(mzk, { name: 'About' }), this));
  }


  getDisplayName() {
    return 'ManaZeak menu';
  }


}


export default MenuPageView;
