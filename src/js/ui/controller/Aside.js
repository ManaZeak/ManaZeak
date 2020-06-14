import CollectionGroup from "../component/CollectionGroup";
import ScrollBar from "../component/bar/ScrollBar";
import TrackPreview from "../component/TrackPreview";


class Aside {


  constructor() {
    this._dom = {
      container: null,
      avatar: null,
      username: null,
      collection: null,
      collapser: null,
      controls: null,
      trackPreview: null // This is the DOM element, not the component (see _trackPreview internal)
    };
    // Aside components
    this._trackPreview = null;

    this._dom.container = document.getElementsByClassName('aside')[0];
    this._dom.collection = document.getElementsByClassName('aside-content')[0];
    this._dom.controls = document.getElementsByClassName('app-controls')[0];
    this._dom.collapser = document.getElementById('aside-toggle');
    this._dom.trackPreview = document.getElementsByClassName('aside-track-preview')[0];
    this._dom.avatar = document.getElementById('aside-user-pp');
    this._dom.username = document.getElementById('aside-user-name');

    if (Utils.imageUrlExists(`../../${mzk.user.avatarPath}`) === true) {
      this._dom.avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
    }

    this._dom.username.innerHTML = mzk.user.username;

    this._isCollapsed = false; // Aside is expanded by default

    this._toggleAside = this._toggleAside.bind(this); // To add/remove event on it

    this._fillCollection();
    this._initTrackPreview();
    this._events();
  }


  _fillCollection() {
    return new Promise(resolve => {
      mzk.komunikator.get('view/mainPage/collection/')
        .then(response => {
          if (response.LIBRARY.length > 0) {
            const libraries = new CollectionGroup({
              label: 'Libraries',
              items: response.LIBRARY
            });

            new ScrollBar({
              target: libraries.elements
            });
            this._dom.collection.appendChild(libraries.dom);
          }

          if (response.PLAYLISTS.length > 0) {
            const playlists = new CollectionGroup({
              label: 'Playlists',
              items: response.PLAYLIST
            });
            this._dom.collection.appendChild(playlists.dom);
          }

          const playbackModes = new CollectionGroup({
            label: 'PlaybackModes'
          });

          new ScrollBar({
            target: playbackModes.elements
          });

          this._dom.collection.appendChild(playbackModes.dom);

          this._dom.collection = this._dom.collection.firstElementChild.firstElementChild;
          resolve();
        });
    });
  }


  _events() {
    this._dom.collapser.addEventListener('click', this._toggleAside, false);
    this._dom.avatar.addEventListener('click', () => {
      mzk.ui.setSceneView({
        name: `UserHub`,
        uiName: mzk.lang.communityView.title
      });
    }, false);
  }


  _initTrackPreview() {
    this._trackPreview = new TrackPreview({
      container: this._dom.trackPreview
    });
  }


  _toggleAside(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this._isCollapsed === true) {
      this.open();
    } else {
      this.close();
    }
  }


  open() {
    if (this._isCollapsed === true) {
      const width = '--mzk-aside-width'; // Must match variable in _variables.scss
      document.querySelector(':root').style.removeProperty(width); // Clear previous aside value
      this._isCollapsed = false;
      this._dom.container.classList.remove('collapsed');
      requestAnimationFrame(() => {
        document.querySelector(':root').style.setProperty(width, '19%');
      });
    }
  }


  close() {
    if (this._isCollapsed === false) {
      const width = '--mzk-aside-width'; // Must match variable in _variables.scss
      document.querySelector(':root').style.removeProperty(width); // Clear previous aside value
      this._isCollapsed = true;
      this._dom.container.classList.add('collapsed');
      requestAnimationFrame(() => {
        const style = getComputedStyle(document.documentElement);
        const reducedWidth = style.getPropertyValue('--mzk-topbar-height');
        document.querySelector(':root').style.setProperty(width, reducedWidth);
      });
    }
  }


  setTrackPreview(track) {
    this._trackPreview.setTrack(track);
  }


  resetTrackPreview() {
    this._trackPreview.resetTrack();
  }


  get collapsed() {
    return this._isCollapsed;
  }


  set enabled(state) {
    this._isAsideAvailable = state;
    if (this._isAsideAvailable === true) {
      this._dom.collapser.style.cursor = 'pointer';
      this._dom.collapser.addEventListener('click', this._toggleAside, false);
    } else {
      this._dom.collapser.style.cursor = 'not-allowed';
      this._dom.collapser.removeEventListener('click', this._toggleAside, false);
    }
  }


}


export default Aside;
