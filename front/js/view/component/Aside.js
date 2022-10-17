'use strict';


class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._menupage = document.getElementById('menupage-button');
    // No need to use an event on logout, as it's only href redirect in template
    this._evtIds = [];

    this._events();
  }


  /* Not meant to be destroyed */


  _events() {
    this._evtIds.push(Evts.addEvent('click', this._homepage, mzk.setView.bind(mzk, { name: 'MainPage' }), this));
    this._evtIds.push(Evts.addEvent('click', this._menupage, mzk.setView.bind(mzk, { name: 'MenuPage' }), this));
  }


}


export default Aside;
