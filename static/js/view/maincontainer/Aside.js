import AsideEntry from './AsideEntry.js';
'use_strict';

class Aside {
  /**
   * @summary A components container
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Can be filled with various AsideEntries and is meant to be both sides of a Mzk scene
   * @param {object} options - The Aside options object
   * @param {string} options.side - The Aside position on screen (`left` or `right` only)
   **/
  constructor(options) {
    this.dom = {};
    this._open = {};
    this._close = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the Aside according to its side
   **/
  _init() {
    this.dom = document.getElementById('aside');
    this.dom.style.left = 0;

    this._close = document.getElementById('aside-close');
    this._open = document.getElementById('aside-open');

    const a = new AsideEntry({
      title: 'Links'
    });
    this.dom.appendChild(a.getDom());

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this._events();
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle Aside mouse click events (show and hide)
   **/
  _events() {
    this._close.addEventListener('click', this.hide);
    this._open.addEventListener('click', this.show);
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name hide
   * @public
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Hide the aside with animation
   **/
  hide() {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.dom.style.left = `-${((this.dom.offsetWidth * 100) / viewportWidth)}%`;
    this._close.style.opacity = 0;
    this._open.style.opacity = 1;
    mzk.view.extendScene();
  }

  /**
   * @method
   * @name show
   * @public
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Show the aside with animation
   **/
  show() {
    this.dom.style.left = 0;
    this._close.style.opacity = 1;
    this._open.style.opacity = 0;
    mzk.view.retractScene();
  }

  toggleHideShow() {
    if (this.dom.style.left === '0px') {
      this.hide();
    } else {
      this.show();
    }
  }
}

export default Aside;
