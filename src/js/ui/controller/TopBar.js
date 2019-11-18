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
     * @member {object} - The user avatar image DOM element */
    this._avatar = {};
    /** @private
     * @member {object} - The home button */
    this._home = {};
    /** @private
     * @member {object} - The user context menu object */
    this._userMenu = {};
    /** @private
     * @member {object} - The user context menu object */
    this._breadcrumbs = {};

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
    this._avatar = document.getElementById('topbar-avatar');
    this._spinner = document.getElementById('topbar-spinner');
    this._home = document.getElementById('topbar-home-button');
    this._breadcrumbs = document.getElementsByClassName('topbar-view-breadcrumbs')[0];

    this._userMenu = new UserMenuContext({
      target: this._topbar,
      url: 'context/userMenu/'
    });

    if (Utils.imageUrlExists(`../../${mzk.user.avatarPath}`) === true) {
      this._avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
    }

    this._setLangFeedback();
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
    Events.register({
      name: 'MzkInitDone'
    }, () => {
      this._home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);
    });

    this._avatar.addEventListener('click', this.toggleUserMenu.bind(this), false);
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


  updateViewBreadcrumbs(views) {
    this._breadcrumbs.innerHTML = '';
    for (let i = 0; i < views.length; ++i) {
      const link = document.createElement('A');
      link.innerHTML = views[i].uiName;
      link.dataset.id = views[i].id;
      link.dataset.name = views[i].name;
      link.addEventListener('click', function() {
        mzk.ui.setSceneView({
          name: this.dataset.name,
          uiName: this.innerHTML,
          id: this.dataset.id
        });
      }.bind(link), false);

      this._breadcrumbs.appendChild(link);
    }
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


  _setLangFeedback() {
    // TODO handle proper tooltips in corner
    //this._home.parentNode.classList.add('tooltip-right');
    //this._home.parentNode.dataset.tooltip = mzk.lang.mainpage.reroll;
  }


  set homeButtonSrcOnMainPage(mainPageOn) {
    if (mainPageOn === true) {
      this._home.src = '/static/img/navigation/home.svg';
      //this._home.parentNode.dataset.tooltip = mzk.lang.mainpage.goto;
    } else {
      this._home.src = '/static/img/player/shuffle-random-on.svg';
      //this._home.parentNode.dataset.tooltip = mzk.lang.mainpage.reroll;
    }
  }


}


export default TopBar;
