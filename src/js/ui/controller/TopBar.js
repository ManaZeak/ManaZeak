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
     * @member {object} - The suggestion button */
    this._suggestion = {};
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
    this._getElementsFromDocument();
    this._setLangFeedback();
  }


  _getElementsFromDocument() {
    this._topbar = document.getElementById('topbar');
    this._spinner = document.getElementById('topbar-spinner');
    this._home = document.getElementById('topbar-home-button');
    this._suggestion = document.getElementById('topbar-suggestion-button');
    this._breadcrumbs = document.getElementsByClassName('topbar-view-breadcrumbs')[0];

    if (!mzk.user.hasPermission('WISH')) {
      this._breadcrumbs.style.left = window.getComputedStyle(this._suggestion.parentNode).left;
      this._topbar.removeChild(this._suggestion.parentNode);
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
    // Bind listeners when app is initialized
    Events.subscribe('MzkInitDone', () => {
      this._home.addEventListener('click', mzk.ui.setSceneView.bind(mzk.ui, { name: 'MainPage' }), false);

      if (mzk.user.hasPermission('WISH')) {
        this._suggestion.addEventListener('click', mzk.ui.setModal.bind(mzk.ui, {name: 'Suggestion'}), false);
      }
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


  updateViewBreadcrumbs(views) {
    this._breadcrumbs.innerHTML = '';
    // Only process if there are sceneviews in history
    if (views.length > 0) {
      for (let i = 0; i < views.length - 1; ++i) {
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
      // Last element should not be clickable to avoid reloading the same page in breadcrumbs path
      const text = document.createElement('P');
      text.innerHTML = views[views.length - 1].uiName;
      this._breadcrumbs.appendChild(text);
    }
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ----------------------------------------  USER MENU  -----------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  _setLangFeedback() {
    // TODO handle proper tooltips in corner
    //this._home.parentNode.classList.add('tooltip-right');
    //this._home.parentNode.dataset.tooltip = mzk.lang.mainpage.reroll;
  }


  set homeButtonSrcOnMainPage(mainPageOn) {
    if (mainPageOn === true) {
      this._home.src = '/static/img/navigation/home.svg';
    } else {
      this._home.src = '/static/img/actions/random-roll.svg';
    }
  }


}


export default TopBar;
