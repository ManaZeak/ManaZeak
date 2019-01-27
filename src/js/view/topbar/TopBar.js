import UserMenuContext from '../utils/contexts/UserMenuContext.js';
'use strict';


class TopBar {
  /**
   * @summary ManaZeak TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle all components in the TopBar and all related events
   **/
  constructor() {
    this._topbar = {};
    this._avatar = {};
    this._userMenu = {};

    this._init();
    this._events();
  }

  _init() {
    this._topbar = document.getElementById('topbar');
    this._avatar = document.getElementById('topbar-avatar');

    this._userMenu = new UserMenuContext({
      target: this._topbar,
      url: 'contexts/usermenu/'
    });

    this._avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
  }

  _events() {
    this._avatar.addEventListener('click', () => {
      if (this._topbar.contains(this._userMenu.dom)) {
        this._userMenu.close();
      } else {
        this._userMenu.open();
      }
    });
  }
}

export default TopBar;
