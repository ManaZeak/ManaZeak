import SceneView from '../utils/SceneView';


class MenuPageView extends SceneView {


  constructor(options) {
    super(options);

    this._userItem = null;
    this._userClickedEvtId = -1;

    this._wishItem = null;
    this._wishClickedEvtId = -1;

    this._aboutItem = null;
    this._aboutClickedEvtId = -1;

    this._fetchWrapper('/fragment/menupage/')
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._userClickedEvtId);
    Events.removeEvent(this._wishClickedEvtId);
    Events.removeEvent(this._aboutClickedEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._userItem = this.dom.querySelector('#userpage-button');
    this._wishItem = this.dom.querySelector('#wish-button');
    this._aboutItem = this.dom.querySelector('#about-button');

    this._events();
  }


  _events() {
    this._userClickedEvtId = Events.addEvent('click', this._userItem, this._userClicked, this);
    this._wishClickedEvtId = Events.addEvent('click', this._wishItem, this._wishClicked, this);
    this._aboutClickedEvtId = Events.addEvent('click', this._aboutItem, this._aboutClicked, this);
  }


  _userClicked() {
    mzk.setView({
      name: 'UserPage'
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
