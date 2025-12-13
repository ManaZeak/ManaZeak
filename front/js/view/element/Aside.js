class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._newplaylist = document.getElementById('newplaylist-button');
    this._menupage = document.getElementById('menupage-button');
    this._logout = document.getElementById('logout-button');
    this._evtIds = [];

    this._playlistWrapper = document.getElementById('playlist-wrapper');

    this._initPlaylistWrapper();
    this._events();
  }


  /* Not meant to be destroyed */


  _initPlaylistWrapper() {
    let dimensions = this._playlistWrapper.getBoundingClientRect();
    const playlistAmount = this._playlistWrapper.children.length;
/*
    if (playlistAmount === 0) {
      document.getElementById('playlist-navigation-previous').style.display = 'none';
      document.getElementById('playlist-navigation-next').style.display = 'none';
      return; // No need to do anything here until some playlists exists.
    }
*/
    // This is the CSS mobile breakpoint, handling the wrapper in horizontal mode
    if (window.innerWidth <= 800) {
      // Not enough playlists to keep prev/next navigators
      if (dimensions.width - ((playlistAmount + 2) * 40) > 0) { // Add 2 to pl amount to consider prev/next items, 40 must match --aside-size
        document.getElementById('playlist-navigation-previous').style.display = 'none';
        document.getElementById('playlist-navigation-next').style.display = 'none';
        dimensions = this._playlistWrapper.getBoundingClientRect(); // Must compute again dimensions
        this._playlistWrapper.style.width = 'calc(100% - (4 * var(--aside-size)) - (2 * var(--margin-tiny)))'; // We have 4 buttons in total on aside
      } else {
        this._playlistWrapper.style.width = 'calc(100% - (7 * var(--aside-size)) - 1px - (2 * var(--margin-tiny)))'; // We have 4 buttons in total on aside, and the bar separator
      }
    } else {
      // First update prev/next icons to be vertical
      document.getElementById('playlist-navigation-previous').children[0].src = '/static/img/navigation/nav-up.svg';
      document.getElementById('playlist-navigation-next').children[0].src = '/static/img/navigation/nav-down.svg';
      // Not enough playlists to keep prev/next navigators
      if (dimensions.height - ((playlistAmount + 2) * 40) > 0) { // Add 2 to pl amount to consider prev/next items, 40 must match --aside-size
        document.getElementById('playlist-navigation-previous').style.display = 'none';
        document.getElementById('playlist-navigation-next').style.display = 'none';
        dimensions = this._playlistWrapper.getBoundingClientRect(); // Must compute again dimensions
        this._playlistWrapper.style.height = 'calc(100% - (4 * var(--aside-size)) - (2 * var(--margin-tiny)))'; // We have 4 buttons in total on aside
      } else {
        this._playlistWrapper.style.height = 'calc(100% - (6 * var(--aside-size)) - (2 * var(--margin-tiny)))'; // We have 6 buttons in total on aside
      }
    }
  }


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
