'use strict';


class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._userpage = document.getElementById('userpage-button');
    this._wish = document.getElementById('wish-button');

    this._events();
  }


  _events() {
    this._homepageClicked = this._homepageClicked.bind(this);
    this._homepage.addEventListener('click', this._homepageClicked);

    this._userpageClicked = this._userpageClicked.bind(this);
    this._userpage.addEventListener('click', this._userpageClicked);

    this._wishClicked = this._wishClicked.bind(this);
    this._wish.addEventListener('click', this._wishClicked);
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


  _wishClicked() {
    mzk.setModal({
      name: 'Wish'
    });
  }


}


export default Aside;
