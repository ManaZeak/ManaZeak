'use strict';


class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._menupage = document.getElementById('menupage-button');

    this._evtIds = [];

    this._events();
  }


  /* Not meant to be destroyed */


  _events() {
    this._evtIds.push(Events.addEvent('click', this._homepage, this._homepageClicked, this));
    this._evtIds.push(Events.addEvent('click', this._menupage, this._menupageClicked, this));
  }


  _homepageClicked() {
    mzk.setView({
      name: 'MainPage'
    });
  }


  _menupageClicked() {
    mzk.setView({
      name: 'MenuPage'
    });
  }


}


export default Aside;
