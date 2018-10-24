'use_strict';


class UserMenu {
  /**
   * @summary TopBar user menu
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Hold all user links to control the main view, logout etc.
   **/
  constructor(options) {
    this._target = options.target;
    this._userMenu = {};
    this._overlay = {};
    this._logOut = {};

    this._init();
  }


  _init() {
    mzk.komunikator.getTemplate('modals/usermenu/')
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        this._overlay = doc.getElementsByClassName('transparent-overlay')[0];
        this._userMenu = doc.getElementsByClassName('user-menu')[0];
        this._logOut = this._userMenu.childNodes[1];

        //        console.log(this._userMenu.firstElementChild.dataset.perm)
        this._events();
      });
  }


  _events() {
    this._viewportClicked = this._viewportClicked.bind(this);

    this._logOut.addEventListener('click', () => {
      mzk.logOut();
    }, true);
  }


  _viewportClicked(event) {
    event.stopPropagation();

    if (!event.target.closest(`.user-menu`)) {
        this.close();
    }
  }


  open() {
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    this._target.removeChild(this._overlay);
    this._overlay.removeEventListener('click', this._viewportClicked, false);
  }


  get dom() {
    return this._userMenu;
  }
}


export default UserMenu;
