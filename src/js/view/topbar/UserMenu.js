import ContextMenu from '../../utils/feedback/ContextMenu.js';
'use strict';


class UserMenu extends ContextMenu {
  /**
   * @summary TopBar user menu
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Hold all user links to control the main view, logout etc.
   **/
  constructor(options) {
    super(options);
    // setActions is called when the template has been fetch.
  }

  setActions(doc) {
    this._logOut = doc.getElementsByClassName('log-out')[0];
    this._logOut.addEventListener('click', () => {
      mzk.logOut();
    }, true);
  }
}


export default UserMenu;
