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
    // Event binding
    this._setOverview = this._setOverview.bind(this);
    this._setDatabase = this._setDatabase.bind(this);
    this._setUser = this._setUser.bind(this);
    this._setSuggestion = this._setSuggestion.bind(this);

    this._fetchWrapper()
      .then(this._addAdminViewEvents.bind(this))
      .then(this._viewReady);
  }


  destroy() {
    if (this._activeAdminView) {
      this._activeAdminView.destroy();
    }

    super.destroy();
    this._removeAdminViewEvents();
    Utils.removeAllObjectKeys(this);
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


  _addAdminViewEvents() {
    this._dom.menu.overview.addEventListener('click', this._setOverview, false);
    this._dom.menu.database.addEventListener('click', this._setDatabase, false);
    this._dom.menu.user.addEventListener('click', this._setUser, false);
    this._dom.menu.suggestion.addEventListener('click', this._setSuggestion, false);
  }


  _removeAdminViewEvents() {
    this._dom.menu.overview.removeEventListener('click', this._setOverview, false);
    this._dom.menu.database.removeEventListener('click', this._setDatabase, false);
    this._dom.menu.user.removeEventListener('click', this._setUser, false);
    this._dom.menu.suggestion.removeEventListener('click', this._setSuggestion, false);
  }


  _setOverview() {
    this._setAdminView('overview');
  }


  _setDatabase() {
    this._setAdminView('database');
  }


  _setUser() {
    this._setAdminView('user');
  }


  _setSuggestion() {
    this._setAdminView('suggestion');
  }


  _setAdminView(view) {
    if (this._activeAdminView) { // Clean previous view if any
      this._activeAdminView.destroy(); // Call for destructor
      this._activeAdminView = null; // Un-reference previous view
    }

    this._dom.menu[this._activeAdminViewLabel].classList.remove('active');
    this._dom.menu[view].classList.add('active');
    this._activeAdminViewLabel = view; // Save new active view label
    this._dom.scene.innerHTML = ''; // Clear admin scene inner html
    this._activeAdminView = new AdminViewFactory(this._activeAdminViewLabel, this._dom.scene);
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AdminView;
