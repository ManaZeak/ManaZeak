import SceneView from "../SceneView";
import AdminViewFactory from './AdminViewFactory';
'use strict';


class AdminView extends SceneView {
  constructor() {
    super();

    this._dom = {
      wrapper: null,
      menu: {
        overview: null,
        database: null,
        user: null,
        suggestion: null
      },
      scene: null
    };

    this._activeAdminViewLabel = null;
    this._activeAdminView = null;

    this._fetchWrapper()
      .then(this._adminViewEvents.bind(this))
      .then(this._viewReady);
  }


  _fetchWrapper() {
    return new Promise(resolve => {
      mzk.komunikator.getTemplate('view/admin/layout/')
        .then(response => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');

          this._dom.wrapper = doc.getElementsByClassName('admin-view-wrapper')[0];
          // Save menu buttons
          this._dom.menu.overview = doc.getElementById('admin-menu-overview');
          this._dom.menu.database = doc.getElementById('admin-menu-database');
          this._dom.menu.user = doc.getElementById('admin-menu-user');
          this._dom.menu.suggestion = doc.getElementById('admin-menu-suggestion');

          this._dom.scene = doc.getElementsByClassName('admin-scene')[0];

          this._activeAdminViewLabel = 'overview'; // Label must be initialized first
          this._setAdminView('overview');

          resolve();
        });
    });
  }


  _adminViewEvents() {
    this._dom.menu.overview.addEventListener('click', this._setAdminView.bind(this, 'overview'), false);
    this._dom.menu.database.addEventListener('click', this._setAdminView.bind(this, 'database'), false);
    this._dom.menu.user.addEventListener('click', this._setAdminView.bind(this, 'user'), false);
    this._dom.menu.suggestion.addEventListener('click', this._setAdminView.bind(this, 'suggestion'), false);
  }


  _setAdminView(view) {
    this._dom.menu[this._activeAdminViewLabel].classList.remove('active');
    this._dom.menu[view].classList.add('active');
    this._activeAdminViewLabel = view; // Save new active view
    this._dom.scene.innerHTML = '';
    this._activeAdminView = new AdminViewFactory(this._activeAdminViewLabel, this._dom.scene);
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AdminView;
