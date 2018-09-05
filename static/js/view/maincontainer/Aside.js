import AsideEntry from './AsideEntry.js'

class Aside {

  constructor(options) {
    this.side = options.side; // TODO sanitize options
    this.dom = {};
    this._open = {};
    this._close = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this.dom = document.getElementById(this.side + '-aside');
    this.dom.style[this.side] = 0; // TODO verifier val this side

    this._close = document.getElementById(this.side + '-aside-close');
    this._open = document.getElementById(this.side + '-aside-open');

//    let a = new AsideEntry({ title: 'Links' });
//    this.dom.appendChild(a.getDom());

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this._events();
  }

  _events() {
    this._close.addEventListener('click', this.hide);
    this._open.addEventListener('click', this.show);
  }

  hide() {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.dom.style[this.side] = '-' + ((this.dom.offsetWidth * 100) / viewportWidth) + '%';
    this._close.style.opacity = 0;
    this._open.style.opacity = 1;
  }

  show() {
    this.dom.style[this.side] = '0%';
    this._close.style.opacity = 1;
    this._open.style.opacity = 0;
  }
}

export default Aside;
