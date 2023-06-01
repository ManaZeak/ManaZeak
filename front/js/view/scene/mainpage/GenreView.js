import PlayableView from '../utils/PlayableView';
import ScrollBar from '../../navigation/ScrollBar';
import TrackContext from '../../context/TrackContext';
import ItemViewHelperMixin from '../utils/ItemViewHelperMixin';


class GenreView extends ItemViewHelperMixin(PlayableView) {


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

    this._allExpander = null;
    this._isExpanded = true;

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

      this._allExpander = this.dom.querySelector('#all-expander');

      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].getElementsByClassName('track-duration')[0];
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
    return new Promise(resolve => {
      this._evtIds.push(Evts.addEvent('click', this._allExpander, this._toggleAll, this));

      for (let i = 0; i < this._artists.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._artists[i], this._artistClicked, this._artists[i]));
      }

      for (let i = 0; i < this._albums.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._albums[i], this._albumClicked, this._albums[i]));
      }

      // On each track, listen to click evts, 
      this._trackEvts();

      this.dom.querySelector('#genre-content').addEventListener('contextmenu', event => {
        event.preventDefault();
        console.log(event)
        if (this.dom.querySelector('#genre-content').contains(this._trackContext.dom)) {
          this._trackContext.close();
        } else {
          this._contextClicked(event);
        }
      });

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


  _trackEvts() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._evtIds.push(Evts.addEvent('click', this._tracks[i].querySelector('.track-title').children[0], this._trackTitleClicked, {
        tracks: this._tracks,
        index: i
      }));

      this.__evtArtistsList('performers', this._tracks[i]);
      this.__evtArtistsList('composers', this._tracks[i]);
      this.__evtArtistsList('lyricists', this._tracks[i]);
      this.__evtArtistsList('producers', this._tracks[i]);
      this.__evtArtistsList('engineers', this._tracks[i]);

      const isrc = this._tracks[i].querySelector('.track-isrc');
      if (isrc.textContent.replaceAll('\n', '').replaceAll(' ', '') === '') {
        isrc.parentNode.remove();
      }

      const bpmKey = this._tracks[i].querySelector('.track-bpm-key');
      if (bpmKey.textContent.replaceAll('\n', '').replaceAll(' ', '') === '') {
        bpmKey.parentNode.remove();
      }

      const genres = this._tracks[i].querySelector('.track-genres');
      for (let i = 0; i < genres.children.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', genres.children[i], this._genreClicked, genres.children[i]));
      }
      if (genres.children.length === 0) {
        genres.parentNode.remove();
      }

      const expander = this._tracks[i].getElementsByClassName('toggle-track-expand')[0];
      this._evtIds.push(Evts.addEvent('click', expander, this._expandTrackClicked, this._tracks[i]));
    }
  }


  __evtArtistsList(type, track) {
    const list = track.querySelector(`.track-${type}`);
    for (let i = 0; i < list.children.length; ++i) {
      this._evtIds.push(Evts.addEvent('click', list.children[i], this._artistClicked, list.children[i]));
    }

    if (list.children.length === 0) {
      list.parentNode.remove();
    }
  }


  _expandTrackClicked(e) {
    e.stopPropagation();
    this.classList.toggle('expanded');
    if (this.classList.contains('expanded')) {
      const height = this.querySelector('.track-detailed-info').getBoundingClientRect().height;
      this.style.height = `calc(5rem + ${height}px + var(--padding))`; // Here padding is expanded moodbar height
      this.getElementsByClassName('toggle-track-expand-img')[0].src = '/static/img/navigation/nav-up.svg';
    } else {
      this.style.height = '5rem'; // Restore to css value
      this.getElementsByClassName('toggle-track-expand-img')[0].src = '/static/img/navigation/nav-down.svg';
    }
    // Update scrollbar height
    setTimeout(() => {
      this.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }, 200); /* Match height transition duration in _mainpage.scss */
  }  


  _contextClicked(event) {
    if (event.target.closest('.track')) {
      let title = '';
      let artist = '';
      let id = event.target.dataset.id;
      if (event.target.className !== 'track') {
        if (event.target.parentNode.className === 'track') { // First lvl children
          title = event.target.parentNode.children[0].children[0];
          artist = event.target.parentNode.children[0].children[3];
          id = event.target.parentNode.dataset.id;
        } else if (event.target.parentNode.className === 'track-info' || event.target.parentNode.className === 'track-detailed-info') { // Second level children
          title = event.target.parentNode.parentNode.children[0].children[0];
          artist = event.target.parentNode.parentNode.children[0].children[3];
          id = event.target.parentNode.parentNode.dataset.id;
        } else { // Third level children
          title = event.target.parentNode.parentNode.parentNode.children[0].children[0];
          artist = event.target.parentNode.parentNode.parentNode.children[0].children[3];
          id = event.target.parentNode.parentNode.parentNode.dataset.id;
        }
        this._trackContext.open(event, {
          id: id,
          name: `${artist.textContent} - ${title.textContent}`
        });
      } else {
        title = event.target.children[0].children[0];
        artist = event.target.children[0].children[3];
        this._trackContext.open(event, {
          id: id,
          name: `${artist.textContent} - ${title.textContent}`
        });
      }
    }
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
        genre.tracks.push(this._buildTrackObject(this._tracks[i]));
      }
    }

    return genre;
  }


  _buildTrackObject(track) {
    return {
      id: track.dataset.id,
      title: track.children[0].children[0].textContent,
      // TODO track artist instead of release artist
      artist: track.parentNode.parentNode.parentNode.parentNode.querySelector('.artist-info').firstElementChild.textContent,
      cover: track.parentNode.parentNode.parentNode.parentNode.querySelector('.artist-info').lastElementChild.src,
      duration: track.children[0].children[2].innerHTML,
      mood: track.dataset.mood
    };
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


  _toggleAll() {
    if (this._isExpanded === false) {
      this._expandAll();
    } else {
      this._collapseAll();
    }
  }


  _collapseAll() {
    this._isExpanded = false;
    this._allExpander.src = '/static/img/navigation/nav-down.svg';
    for (let i = 0; i < this._artists.length; ++i) {
      this._artists[i].parentNode.children[0].children[0].src = 'static/img/navigation/nav-down.svg';
      this._artists[i].parentNode.classList.add('collapsed');
    }
  }


  _expandAll() {
    this._isExpanded = true;
    this._allExpander.src = '/static/img/navigation/nav-up.svg';
    for (let i = 0; i < this._artists.length; ++i) {
      this._artists[i].parentNode.children[0].children[0].src = 'static/img/navigation/nav-up.svg';
      this._artists[i].parentNode.classList.remove('collapsed');
    }
  }


  getDisplayName() {
    return `Genre <b>${this._genre}</b>`;
  }


}


export default GenreView;
