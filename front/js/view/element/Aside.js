class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._newplaylist = document.getElementById('newplaylist-button');
    this._menupage = document.getElementById('menupage-button');
    this._logout = document.getElementById('logout-button');
    this._evtIds = [];

    this._events();
  }


  /* Not meant to be destroyed */


  _events() {
    this._evtIds.push(Evts.addEvent('click', this._homepage, mzk.setView.bind(mzk, { name: 'MainPage' }), this));
    this._evtIds.push(Evts.addEvent('click', this._newplaylist, mzk.setModal.bind(mzk, { name: 'NewPlaylist' }), this));
    this._evtIds.push(Evts.addEvent('click', this._menupage, mzk.setView.bind(mzk, { name: 'MenuPage' }), this));
    this._evtIds.push(Evts.addEvent('click', this._logout, this._logoutSession, this));
  }


  _logoutSession() {
    localStorage.removeItem('mzk-jwt-token');
    window.location = '/logoutSuccess/';
  }


}


export default Aside;
