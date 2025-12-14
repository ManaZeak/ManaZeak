class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._newplaylist = document.getElementById('newplaylist-button');
    this._menupage = document.getElementById('menupage-button');
    this._logout = document.getElementById('logout-button');
    this._evtIds = [];

    this._playlistWrapper = document.getElementById('playlist-wrapper');
    this._playlistContainer = document.getElementById('playlist-container');

    this._initPlaylistWrapper();
    this._events();
  }


  /* Not meant to be destroyed */


  _initPlaylistWrapper() {
    let wrapperDimensions = this._playlistWrapper.getBoundingClientRect();
    const playlistAmount = this._playlistContainer.children.length;
    let dimension = 'width'; // Mobile intended, horizontal aside
/*
    if (playlistAmount === 0) {
      document.getElementById('playlist-navigation-previous').style.display = 'none';
      document.getElementById('playlist-navigation-next').style.display = 'none';
      return; // No need to do anything here until some playlists exists.
    }
*/
    // This is the CSS mobile breakpoint, handling the wrapper in vertical mode (desktop)
    if (window.innerWidth > 800) {
      // First update prev/next icons to be vertical
      document.getElementById('playlist-navigation-previous').children[0].src = '/static/img/navigation/nav-up.svg';
      document.getElementById('playlist-navigation-next').children[0].src = '/static/img/navigation/nav-down.svg';
      dimension = 'height';
    }

    // Not enough playlists to keep prev/next navigators
    const asideDimensions = document.getElementById('aside').getBoundingClientRect();
    const previousGroup = this._playlistWrapper.previousElementSibling.getBoundingClientRect();
    const nextGroup = this._playlistWrapper.nextElementSibling.getBoundingClientRect();
    const availableSpace = asideDimensions[dimension] - (previousGroup[dimension] + nextGroup[dimension]);
    if (availableSpace - ((playlistAmount) * 40) >= 0) { // Add 2 to pl amount to consider prev/next items, 40 must match --aside-size
      wrapperDimensions = this._playlistContainer.getBoundingClientRect(); // Must compute again dimensions
      this._playlistWrapper.style[dimension] = 'calc(100% - (4 * var(--aside-size)) - (2 * var(--margin-tiny)))'; // We have 4 buttons in total on aside
    } else {
      // Display previous/next playlist
      document.getElementById('playlist-navigation-previous').style.display = 'flex';
      document.getElementById('playlist-navigation-next').style.display = 'flex';
      // Disable previous as playslit are always displayed start-aligned
      document.getElementById('playlist-navigation-previous').classList.add('disabled');

      const step = playlistAmount - (Math.round(availableSpace / 40) - 2) ; // Max allowed next before last element is fully visible
      let pos = 0; // Current scroll position
      const _movePlaylists = shift => {
        // Re-enable navigators
        document.getElementById('playlist-navigation-previous').classList.remove('disabled');
        document.getElementById('playlist-navigation-next').classList.remove('disabled');
        // Check if navigator needs to be disabled
        if (pos + shift === step + 1) {
          document.getElementById('playlist-navigation-next').classList.add('disabled');
        } else if (pos + shift === 0) {
          document.getElementById('playlist-navigation-previous').classList.add('disabled');
        } else if (pos + shift < 0 || pos + shift > step) { // OOB
          return;
        }
        // Increment (or decrement) current pos
        pos += shift
        // Perform scroll into view
        this._playlistContainer.children[pos].scrollIntoView({
          behavior: 'smooth',
          bloc: 'start',
          inline: 'start'
        }); 
      };

      this._playlistWrapper.style[dimension] = 'calc(100% - (7 * var(--aside-size)) - 1px - (2 * var(--margin-tiny)))'; // We have 4 buttons in total on aside, and the bar separator
      document.getElementById('playlist-navigation-previous').addEventListener('click', _movePlaylists.bind(this, -1));
      document.getElementById('playlist-navigation-next').addEventListener('click', _movePlaylists.bind(this, 1));
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
