'use strict';


class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._userpage = document.getElementById('userpage-button');

    this._events();
  }


  _events() {
    this._homepageClicked = this._homepageClicked.bind(this);
    this._homepage.addEventListener('click', this._homepageClicked);

    this._userpageClicked = this._userpageClicked.bind(this);
    this._userpage.addEventListener('click', this._userpageClicked);
  }


  _homepageClicked() {
    mzk.setView({
      name: 'MainPage'
    });
  }


  _userpageClicked() {
    mzk.setView({
      name: 'UserPage'
    });
  }


}


export default Aside;
