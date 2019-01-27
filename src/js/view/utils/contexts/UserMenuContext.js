import ContextMenu from '../ContextMenu.js';
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
  }


  setActions(doc) {
    this._logOut = doc.getElementsByClassName('log-out')[0];
    this._logOut.addEventListener('click', () => {
      mzk.logOut();
    }, true);
  }


}


export default UserMenuContext;
