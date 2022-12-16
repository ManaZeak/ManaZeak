import TrackView from '../utils/TrackView';
import ScrollBar from '../../navigation/ScrollBar';
import TrackContext from '../../context/TrackContext';


class GenreView extends TrackView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/genre/${options.id}/`
    });

    this._id = options.id;
    this._genre = '';

    this._artists = [];
    this._albums = [];
    this._scrolls = [];

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      //.then(this._prepareUi.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Utils.removeAllObjectKeys(this);
  }


  _buildNavigation() {
    return new Promise((resolve, reject) => {
      this._genre = this.dom.querySelector('#genre-name').innerHTML;
      this._artists = this.dom.querySelectorAll('.artist-info');
      this._albums = this.dom.querySelectorAll('.album-info');
      this._tracks = this.dom.querySelectorAll('.track');

      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].children[0].children[1];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }

      this._scrolls.push(new ScrollBar({
        target: this.dom,
        style: {
          color: '#56D45B'
        }
      }));
      // Track context on container
      this._trackContext = new TrackContext({
        target: this.dom.querySelector('#genre-content'),
        name: 'track'
      });
      // Update playing track if necessary
      if (mzk.ctrl.playingId) {
        this._updatePlaying({
          id: mzk.ctrl.playingId
        });
      }

      resolve();
    });
  }


  _prepareUi() {
    return new Promise((resolve, reject) => {
      mzk.data.getGenreInfo(this._genre).then(() => {
        resolve();
      }).catch(reject);
    });
  }


  _events() {
    super._events();
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#expand-all'), this._expandAll, this));
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#collapse-all'), this._collapseAll, this));

      for (let i = 0; i < this._artists.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._artists[i], this._artistClicked, this._artists[i]));
      }

      for (let i = 0; i < this._albums.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._albums[i], this._albumClicked, this._albums[i]));
      }

      const collapsers = this.dom.querySelectorAll('.collapse-artist');
      for (let i = 0; i < collapsers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', collapsers[i], this._toggleArtistExpansion.bind(this, collapsers[i]), this));
      }

      const expanders = this.dom.querySelectorAll('.expand-artist');
      for (let i = 0; i < expanders.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', expanders[i], this._expandArtist.bind(this, expanders[i]), this));
      }

      resolve();
    });    
  }


  _artistClicked() {
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _albumClicked() {
    mzk.setView({
      name: 'Album',
      id: this.dataset.id
    });
  }


  _buildPlaybackObject(currentId) {
    const genre = {
      id: this._id,
      type: 'Genre',
      cover: this.dom.querySelector('#genre-picture').children[0].children[0].children[0].src,
      title: this.dom.querySelector('#genre-name').innerHTML,
      artist: '',
      tracks: []
    };

    let currentReached = false;
    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].dataset.id === currentId) {
        currentReached = true;
      }

      if (currentReached === true) {
        genre.tracks.push({
          title: this._tracks[i].children[0].children[0].innerHTML,
          // TODO track artist instead of release artist
          artist: this._tracks[i].parentNode.parentNode.parentNode.children[1].firstElementChild.innerHTML,
          duration: this._tracks[i].children[0].children[1].innerHTML,
          id: this._tracks[i].dataset.id,
          mood: this._tracks[i].dataset.mood
        });
      }
    }

    genre.artist = genre.tracks[0].artist;
    return genre;
  }


  /* Toggle/Collapse */


  _toggleArtistExpansion(collapser) {
    for (let i = 0; i < this._artists.length; ++i) {
      if (this._artists[i].dataset.id === collapser.dataset.id) {
        if (this._artists[i].parentNode.classList.contains('collapsed')) {
          this._expandArtist(collapser);
        } else {
          this._collapseArtist(collapser);
        }

        break;
      }
    }
  }


  _collapseArtist(collapser) {
    for (let i = 0; i < this._artists.length; ++i) {
      if (this._artists[i].dataset.id === collapser.dataset.id) {
        if (!collapser.classList.contains('expand-artist')) {
          collapser.src = 'static/img/navigation/nav-down.svg';
        }
        this._artists[i].parentNode.classList.add('collapsed');
        break;
      }
    }
  }


  _expandArtist(collapser) {
    for (let i = 0; i < this._artists.length; ++i) {
      if (this._artists[i].dataset.id === collapser.dataset.id) {
        if (!collapser.classList.contains('expand-artist')) { // Update icon if event doesn't come from expander
          collapser.src = 'static/img/navigation/nav-up.svg';
        } else { // When expanding we must ensure to restore collapser icon to initial state
          this._artists[i].parentNode.children[0].children[0].src = 'static/img/navigation/nav-up.svg';
        }
        this._artists[i].parentNode.classList.remove('collapsed');
        break;
      }
    }
  }


  _expandAll() {
    for (let i = 0; i < this._artists.length; ++i) {
      this._artists[i].parentNode.children[0].children[0].src = 'static/img/navigation/nav-up.svg';
      this._artists[i].parentNode.classList.remove('collapsed');
    }
  }


  _collapseAll() {
    for (let i = 0; i < this._artists.length; ++i) {
      this._artists[i].parentNode.children[0].children[0].src = 'static/img/navigation/nav-down.svg';
      this._artists[i].parentNode.classList.add('collapsed');
    }
  }


  getDisplayName() {
    return `Genre <b>${this._genre}</b>`;
  }


}


export default GenreView;
