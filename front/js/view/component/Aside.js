'use strict';


class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._menupage = document.getElementById('menupage-button');

    this._events();
  }


  _events() {
    // TODO: proper events
    this._homepageClicked = this._homepageClicked.bind(this);
    this._homepage.addEventListener('click', this._homepageClicked);

    this._menupageClicked = this._menupageClicked.bind(this);
    this._menupage.addEventListener('click', this._menupageClicked);
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
