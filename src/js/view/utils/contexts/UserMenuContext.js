import ContextMenu from '../overlays/ContextMenu.js';
'use strict';


class UserMenuContext extends ContextMenu {


  /**
   * @summary TopBar user menu
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Hold all user links to control the main view, logout etc.
   **/
  constructor(options) {
    super(options);

    this._logOut = null;
    this._logOutText = null;
  }


  setActions(doc) {
    this._logOut = doc.getElementsByClassName('log-out')[0];
    this._logOutText = doc.getElementsByClassName('log-out-text')[0];

    this._logOutText.innerHTML = mzk.lang.user.logout;

    this._logOut.addEventListener('click', () => {
      mzk.logOut();
    }, true);
  }


}


export default UserMenuContext;
