import ContextMenu from '../component/overlay/ContextMenu.js';
'use strict';


class UserMenuContext extends ContextMenu {


  /**
   * @summary TopBar user menu
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Hold all user links to control the main ui, logout etc.
   **/
  constructor(options) {
    super(options);

    this._container = {};

    this._admin = {};
    this._community = {};
    this._logOut = {};
  }


  setActions(doc) {
    this._container = doc.getElementsByClassName('user-menu')[0];

    this._admin = doc.getElementsByClassName('admin')[0];
    this._community = doc.getElementsByClassName('community')[0];
    this._logOut = doc.getElementsByClassName('log-out')[0];

    if (!mzk.user.hasPermission('ADMV')) {
      this._container.removeChild(this._admin);
    }

    this._userMenuEvents();
  }


  _userMenuEvents() {
    if (mzk.user.hasPermission('ADMV')) {
      this._admin.addEventListener('click', () => {
        this.close();
        mzk.ui.setSceneView({
          name: `Admin`,
          uiName: mzk.lang.adminView.title
        });
      }, true);
    }

    this._community.addEventListener('click', () => {
      this.close();
      mzk.ui.setSceneView({
        name: `Community`,
        uiName: mzk.lang.communityView.title
      });
    }, true);

    this._logOut.addEventListener('click', () => {
      // TODO Put dim (long transition) modal with confirm log out (bc context entry are tight)
      mzk.logOut();
    }, true);
  }


}


export default UserMenuContext;
