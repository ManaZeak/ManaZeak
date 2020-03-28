class TrackPreview {


  constructor(options) {
    this._dom = {
      container: options.container,
      title: null,
      yearAlbum: null,
      artist: null,
      composer: null,
      cover: null
    };

    this._init();
    this._events();
  }


  _init() {
    this._dom.title = this._dom.container.getElementsByClassName('track-preview-title')[0];
    this._dom.yearAlbum = this._dom.container.getElementsByClassName('track-preview-yearalbum')[0];
    this._dom.artist = this._dom.container.getElementsByClassName('track-preview-artist')[0];
    this._dom.composer = this._dom.container.getElementsByClassName('track-preview-composer')[0];
    this._dom.cover = this._dom.container.getElementsByClassName('track-preview-cover')[0];
  }


  _events() {
    this._dom.cover.addEventListener('click', function() {
      // Preventing unexpected behavior
      if (this.src !== '' && this.dataset.id && this.dataset.name) {
        mzk.ui.setSceneView({
          name: 'SingleAlbum',
          uiName: this.dataset.name,
          id: this.dataset.id
        });
      }
    }, false);
  }


  setTrack(track) {
    this._dom.title.innerHTML = track.title;
    this._dom.yearAlbum.innerHTML = `${track.year} – ${track.album.NAME}`;
    this._dom.artist.innerHTML = track.artists;
    this._dom.composer.innerHTML = track.composers;
    this._dom.cover.src = `static/covers/${track.cover}`;
    // DOM elements updates to fit current track and to dispense proper redirection in events
    this._dom.cover.dataset.id = track.album.ID;
    this._dom.cover.dataset.name = track.album.NAME;
    // Alter DOM style
    this._dom.container.style.opacity = '1';
  }


  resetTrack() {
    // Restore DOM style, triggers a CSS animation of .2s (see timeout)
    this._dom.container.style.opacity = '0';
    // Wait for fade out animation to end before removing text content
    window.setTimeout(() => {
      this._dom.title.innerHTML = '';
      this._dom.yearAlbum.innerHTML = '';
      this._dom.artist.innerHTML = '';
      this._dom.composer.innerHTML = '';
      this._dom.cover.src = '';
      // Restore DOM initial state
      this._dom.cover.dataset.id = '';
      this._dom.cover.dataset.name = '';
    }, 200); // Tihs timeout value must properly match the var(--mzk-animation-duration) variable in _variables.scss
  }

}

export default TrackPreview;
