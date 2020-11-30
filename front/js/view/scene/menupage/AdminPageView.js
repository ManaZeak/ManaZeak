import SceneView from '../utils/SceneView';


class AdminPageView extends SceneView {


  constructor(options) {
    super(options);

    this._tabs = null;
    this._tabClickedEvtIds = [];

    this._viewContainer = null;

    this._fetchWrapper('/fragment/admin/')
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    for (let i = 0; i < this._tabClickedEvtIds.length; ++i) {
      Events.removeEvent(this._tabClickedEvtIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._tabs = this.dom.querySelector('#admin-tabs');
    this._viewContainer = this.dom.querySelector('#admin-view');

    this._events();
    this._usersClicked();
  }


  _events() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      const eventId = Events.addEvent('click', this._tabs.children[i], this._tabClicked, this);
      this._tabClickedEvtIds.push(eventId);
    }
  }


  _tabClicked(event) {
    this._unselectTabs();
    event.target.classList.add('selected');
    this[`_${event.target.dataset.view}Clicked`]();
  }


  _unselectTabs() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      this._tabs.children[i].classList.remove('selected');
    }
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


  _fetchFragment(url) {
    return new Promise((resolve, reject) => {
      mzk.getFragment(url)
        .then(resolve)
        .catch(reject);
    });
  }


}


export default AdminPageView;
