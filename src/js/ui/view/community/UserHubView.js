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

    this._fetchWrapper()
      .then(this._events.bind(this))
      .then(this._viewReady);
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


  _events() {
    if (mzk.user.hasPermission('ADMV')) {
      this._dom.admin.addEventListener('click', () => {
        mzk.ui.setSceneView({
          name: `Admin`,
          uiName: mzk.lang.adminView.title
        });
      }, true);
    } else {
      this._dom.wrapper.removeChild(this._dom.admin);
    }

    this._dom.community.addEventListener('click', () => {
      mzk.ui.setSceneView({
        name: `Community`,
        uiName: mzk.lang.communityView.title
      });
    }, true);

    if (mzk.user.hasPermission('SPON')) {
      this._dom.userid.addEventListener('click', () => {
        mzk.ui.setModal({
          name: `UserID`
        });

        var a = document.createElement('DIV');
        a.classList.add('worldmap');
        document.body.appendChild(a);
        new MzkWorldMap({
          assetsUrl: 'static/plugins/MzkWorldMap/',
          renderTo: a,
          countryClicked: null
        });
      }, true);
    } else {
      this._dom.wrapper.removeChild(this._dom.userid);
    }

    this._dom.about.addEventListener('click', () => {
      mzk.ui.setModal({
        name: `About`
      });
    }, true);

    this._dom.logout.addEventListener('click', () => {
      mzk.logOut();
    }, false);
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default UserHubView;