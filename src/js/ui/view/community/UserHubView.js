import SceneView from "../SceneView";


class UserHubView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      wrapper: null,
      logout: null,
      admin: null,
      community: null,
      userid: null,
      about: null
    };

    this._setAdmin = this._setAdmin.bind(this);
    this._setCommunity = this._setCommunity.bind(this);
    this._setUserId = this._setUserId.bind(this);
    this._setAbout = this._setAbout.bind(this);
    this._setLogout = this._setLogout.bind(this);

    this._fetchWrapper()
      .then(this._addEvents.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    super.destroy();
    this._removeEvents();
    Utils.removeAllObjectKeys(this);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/community/userhub/layout')
        .then(response => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementById('user-hub-wrapper');
          this._dom.admin = doc.getElementById('user-hub-admin');
          this._dom.community = doc.getElementById('user-hub-community');
          this._dom.userid = doc.getElementById('user-hub-userid');
          this._dom.about = doc.getElementById('user-hub-about');
          this._dom.logout = doc.getElementById('user-hub-logout');

          resolve();
        });
    });
  }


  _addEvents() {
    if (mzk.user.hasPermission('ADMV')) {
      this._dom.admin.addEventListener('click', this._setAdmin, false);
    } else {
      this._dom.wrapper.removeChild(this._dom.admin);
    }

    this._dom.community.addEventListener('click', this._setCommunity, false);

    if (mzk.user.hasPermission('SPON')) {
      this._dom.userid.addEventListener('click', this._setUserId, false);
    } else {
      this._dom.wrapper.removeChild(this._dom.userid);
    }

    this._dom.about.addEventListener('click', this._setAbout, false);
    this._dom.logout.addEventListener('click', this._setLogout, false);
  }


  _removeEvents() {
    if (mzk.user.hasPermission('ADMV')) {
      this._dom.admin.removeEventListener('click', this._setAdmin, false);
    }

    this._dom.community.removeEventListener('click', this._setCommunity, false);

    if (mzk.user.hasPermission('SPON')) {
      this._dom.userid.removeEventListener('click', this._setUserId, false);
    }

    this._dom.about.removeEventListener('click', this._setAbout, false);
    this._dom.logout.removeEventListener('click', this._setLogout, false);
  }


  _setAdmin() {
    mzk.ui.setSceneView({
      name: `Admin`,
      uiName: mzk.lang.adminView.title
    });
  }


  _setCommunity() {
    mzk.ui.setSceneView({
      name: `Community`,
      uiName: mzk.lang.communityView.title
    });
  }


  _setUserId() {
    mzk.ui.setModal({
      name: `UserID`
    });
  }


  _setAbout() {
    mzk.ui.setModal({
      name: `About`
    });
  }


  _setLogout() {
    mzk.logOut();
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default UserHubView;