import UserMenuContext from '../context/UserMenuContext.js';
'use strict';


class TopBar {


  /**
   * @summary ManaZeak TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>Handle all components in the TopBar and all related events</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The TopBar DOM element */
    this._topbar = {};
    /** @private
     * @member {object} - The button to display the main page in scene */
    this._mainPage = {};
    /** @private
     * @member {object} - The user avatar image DOM element */
    this._avatar = {};
    /** @private
     * @member {object} - The user context menu object */
    this._userMenu = {};

    this._init();
    this._events();
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name _init
   * @private
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fill TopBar object with DOM object and create the UserMenu context
   **/
  _init() {
    this._topbar = document.getElementById('topbar');
    this._mainPage = document.getElementById('topbar-main-page');
    this._avatar = document.getElementById('topbar-avatar');
    this._spinner = document.getElementById('topbar-spinner');

    this._userMenu = new UserMenuContext({
      target: this._topbar,
      url: 'context/userMenu/'
    });

    if (Utils.imageUrlExists(`../../${mzk.user.avatarPath}`) === true) {
      this._avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
    }
  }


  /**
   * @method
   * @name _events
   * @private
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the UserMenu toggle state on avatar clicked
   **/
  _events() {
    this._avatar.addEventListener('click', this.toggleUserMenu.bind(this), false);

    Events.register({
      name: 'MzkInitDone'
    }, () => {
      this._mainPage.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
    });
  }


  startSpinner() {
    return new Promise(resolve => {
      this._spinner.style.opacity = '1';
      resolve();
    });
  }


  stopSpinner() {
    return new Promise(resolve => {
      this._spinner.style.opacity = '0';
      resolve();
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ----------------------------------------  USER MENU  -----------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name toggleUserMenu
   * @public
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the UserMenu
   **/
  toggleUserMenu() {
    if (this._topbar.contains(this._userMenu.dom)) {
      this._userMenu.close();
    } else {
      this._userMenu.open();
    }
  }


  /**
   * @method
   * @name toggleUserMenu
   * @public
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since August 2019
   * @description Set the main page button visibility (hidden when main page is current ui, visible otherwise)
   **/
  set mainPageButtonVisibility(visible) {
    if (visible === true) {
      this._mainPage.style.opacity = '1';
    } else {
      this._mainPage.style.opacity = '0';
    }
  }


}


export default TopBar;
