import ScrollBar from '../../navigation/ScrollBar';
import SceneView from '../utils/SceneView';

/*TODO extend TrackBiew  */
class GenreView extends SceneView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/genre/${options.id}/`
    });

    this._genre = '';

    this._artists = [];
    this._albums = [];
    this._tracks = [];
    this._scrolls = [];

    this._changeTrackEvt = -1;

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
      .then(this._prepareUi.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(this._viewFailed);
  }


  destroy() {
    super.destroy();
    Utils.clearAllEvents(this._evtIds);
    Evts.unsubscribe(this._changeTrackEvt);
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
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#expand-all'), this._expandAll, this));
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#collapse-all'), this._collapseAll, this));

      for (let i = 0; i < this._artists.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._artists[i], this._artistClicked, this._artists[i]));
      }

      for (let i = 0; i < this._albums.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._albums[i], this._albumClicked, this._albums[i]));
      }

      for (let i = 0; i < this._tracks.length; ++i) {
        this._tracks[i]._buildPlaybackObject = this._buildPlaybackObject.bind(this);
        this._evtIds.push(Evts.addEvent('click', this._tracks[i], this._trackClicked, this._tracks[i]));
      }

      const collapsers = this.dom.querySelectorAll('.collapse-artist');
      for (let i = 0; i < collapsers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', collapsers[i], this._toggleArtistExpansion.bind(this, collapsers[i]), this));
      }

      const expanders = this.dom.querySelectorAll('.expand-artist');
      for (let i = 0; i < expanders.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', expanders[i], this._expandArtist.bind(this, expanders[i]), this));
      }

      this._changeTrackEvt = Evts.subscribe('ChangeTrack', this._trackChanged.bind(this));

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


  _trackClicked() {
    mzk.changeTrack({
      playObject: this._buildPlaybackObject(this.dataset.id)
    });
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


  _buildPlaybackObject(currentId) {
    const genre = {
      type: 'genre',
      cover: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      genre: this.dom.querySelector('#genre-name').innerHTML,
      tracks: []
    };

    let currentReached = false;
    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].dataset.id === currentId) {
        currentReached = true;
      }

      if (currentReached === true) {
        genre.tracks.push({
          name: this._tracks[i].children[0].children[0].innerHTML,
          duration: this._tracks[i].children[0].children[1].innerHTML,
          id: this._tracks[i].dataset.id,
          mood: this._tracks[i].dataset.mood
        });
      }
    }

    return genre;
  }


  _trackChanged(data) {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('playing');
      if (this._tracks[i].dataset.id === data.id) {
        this._tracks[i].classList.add('playing');
        // Not breaking to properly remove playing on next tracks
      }
    }
  }


}


export default GenreView;
