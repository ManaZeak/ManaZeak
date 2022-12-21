import TrackView from '../utils/TrackView';
import ScrollBar from '../../navigation/ScrollBar';
import TrackContext from '../../context/TrackContext';


class AlbumView extends TrackView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/album/${options.id}/`
    });

    this._id = options.id;
    this._artist = '';
    this._title = '';
    this._performers = [];

    this._collapseAll = null;
    this._expandAll = null;

    this._scrollPerformers = null;
    this._scrollTrack = null;

    this._fetchWrapper(this._url)
      .then(this._buildNavigation.bind(this))
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
      this._artist = this.dom.querySelector('#release-artist').innerHTML;
      this._title = this.dom.querySelector('#album-title').innerHTML;
      this._performers = this.dom.querySelector('#album-performers').children;
      this._tracks = this.dom.querySelector('#album-tracks').children;

      this.dom.querySelector('#album-duration').innerHTML = Utils.secondsToTimecode(parseFloat(this.dom.querySelector('#album-duration').innerHTML)); 

      const date = this.dom.querySelector('#album-release-date').innerHTML;
      this.dom.querySelector('#album-release-date').innerHTML = Utils.formatDate(date);

      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].getElementsByClassName('track-duration')[0];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }

      this._scrollTrack = new ScrollBar({
        target: this.dom.querySelector('#album-tracks'),
        style: {
          color: '#56D45B'
        }
      });
      // Update tracks bc of scroll DOM
      this._tracks = this.dom.querySelector('#album-tracks').children[0].children[0].children;
      // <scrollbar to performers for better UI
      if (this._performers.length > 4) {
        this.dom.querySelector('#album-performers').style.height = '190px';
        // Ensure height is properly applied before creating scroll on performers
        requestAnimationFrame(() => {
          this._scrollPerformers = new ScrollBar({
            target: this.dom.querySelector('#album-performers'),
            style: {
              color: '#56D45B'
            }
          });
          // Update performers bc of scroll DOM
          this._performers = this.dom.querySelector('#album-performers').children[0].children[0].children;
        });        
      } else {
        this.dom.querySelector('#album-performers').style.overflow = 'hidden';        
      }
      // Track context on container
      this._trackContext = new TrackContext({
        target: this.dom.querySelector('#album-tracks') ,
        name: 'track'
      });

      this._collapseAll = this.dom.querySelector('#album-collapse-all');
      this._expandAll = this.dom.querySelector('#album-expand-all');
      // Update playing track if necessary
      if (mzk.ctrl.playingId) {
        this._updatePlaying({
          id: mzk.ctrl.playingId
        });
      }

      resolve();
    });
  }


  _events() {
    super._events();
    return new Promise((resolve, reject) => {
      this._evtIds.push(Evts.addEvent('click', this.dom.querySelector('#album-picture'), this._coverClicked, this));
      // On each trakc, listen to click evts, 
      for (let i = 0; i < this._tracks.length; ++i) {
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

        const expander = this._tracks[i].getElementsByClassName('toggle-track-expand')[0];
        this._tracks[i].scroll = this._scrollTrack;
        this._evtIds.push(Evts.addEvent('click', expander, this._expandTrackClicked, this._tracks[i]));
      }
      
      for (let i = 0; i < this._performers.length; ++i) {
        this._evtIds.push(Evts.addEvent('click', this._performers[i], this._artistClicked, this._performers[i]));
      }

      const rlArtist = this.dom.querySelector('#release-artist'); // Text artist name
      const rlArtistContainer = this.dom.querySelector('#release-artist-container'); // Artist picture
      this._evtIds.push(Evts.addEvent('click', rlArtistContainer, this._artistClicked, rlArtist));
      this._evtIds.push(Evts.addEvent('click', rlArtist, this._artistClicked, rlArtist));

      const label = this.dom.querySelector('#album-label');
      this._evtIds.push(Evts.addEvent('click', label, this._labelClicked, label));

      const queueAlbum = this.dom.querySelector('#queue-album'); // Artist picture
      this._evtIds.push(Evts.addEvent('click', queueAlbum, this._queueAlbum, this));

      this.dom.querySelector('#album-tracks').addEventListener('contextmenu', event => {
        event.preventDefault();
        if (this.dom.querySelector('#album-tracks').contains(this._trackContext.dom)) {
          this._trackContext.close();
        } else {
          this._contextClicked(event);
        }
      });

      this._evtIds.push(Evts.addEvent('click', this._collapseAll, this._collapseAllTracks, this));
      this._evtIds.push(Evts.addEvent('click', this._expandAll, this._expandAllTracks, this));

      resolve();
    });
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


  /* UI element callbacks */


  _coverClicked() {
    mzk.setModal({
      name: 'AlbumCover',
      path: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      title: this.dom.querySelector('#release-artist').nextElementSibling.innerHTML,
      artist: this.dom.querySelector('#release-artist').innerHTML
    });
  }


  _artistClicked(e) {
    e.stopPropagation();
    mzk.setView({
      name: 'ReleaseArtist',
      id: this.dataset.id
    });
  }


  _labelClicked() {
    mzk.setView({
      name: 'Label',
      id: this.dataset.id
    });
  }


  _genreClicked() {
    mzk.setView({
      name: 'Genre',
      id: this.dataset.id
    });
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
      this.scroll.updateScrollbar();
    }, 200); /* Match height transition duration in _mainpage.scss */
  }


  _contextClicked(event) {
    if (event.target.closest('.track')) {
      let title = event.target.parentNode.children[0].children;
      let id = event.target.dataset.id;
      if (event.target.className !== 'track') {
        if (title.length === 0) {
          title = event.target.parentNode.parentNode.children[0].children[0]
          id = event.target.parentNode.parentNode.dataset.id;
        } else {
          title = title[0];
          id = event.target.parentNode.dataset.id;
        }
        this._trackContext.open(event, {
          id: id,
          name: `${document.getElementById('release-artist').innerHTML} - ${title.textContent}`
        });
      } else {
        this._trackContext.open(event, {
          id: id,
          name: `${document.getElementById('release-artist').innerHTML} - ${title[0].textContent}`
        });
      }
    }
  }


  _queueAlbum() {
    const tracklist = [];
    for (let i = 0; i < this._tracks.length; ++i) {
      tracklist.push(this._tracks[i].dataset.id);
    }

    mzk.queue({
      type: 'tracklist',
      ids: tracklist
    });
  }


  _collapseAllTracks() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.remove('expanded');
      this._tracks[i].style.height = '5rem'; // Restore to css value
      this._tracks[i].getElementsByClassName('toggle-track-expand-img')[0].src = '/static/img/navigation/nav-down.svg';
    }
    // Update scrollbar height
    setTimeout(() => {
      this._scrollTrack.updateScrollbar();
    }, 200); /* Match height transition duration in _mainpage.scss */
  }


  _expandAllTracks() {
    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].classList.add('expanded');
      const height = this._tracks[i].querySelector('.track-detailed-info').getBoundingClientRect().height;
      this._tracks[i].style.height = `calc(5rem + ${height}px + var(--padding))`; // Here padding is expanded moodbar height
      this._tracks[i].getElementsByClassName('toggle-track-expand-img')[0].src = '/static/img/navigation/nav-up.svg';
    }
    // Update scrollbar height
    setTimeout(() => {
      this._scrollTrack.updateScrollbar();
    }, 200); /* Match height transition duration in _mainpage.scss */
  }


  getPlayObjectFromId(id) {
    return this._buildPlaybackObject(id);
  }


  /* Handling click on tracks and callbacks */



  _buildPlaybackObject(currentId) {
    const album = {
      id: this._id,
      type: 'Album',
      cover: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      title: this.dom.querySelector('#album-title').innerHTML,
      artist: this.dom.querySelector('#release-artist').innerHTML,
      tracks: []
    };

    let currentReached = false;
    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].dataset.id === currentId) {
        currentReached = true;
      }
      
      if (currentReached === true) {
        album.tracks.push(this._buildTrackObject(this._tracks[i]));
      }
    }

    return album;
  }


  _buildTrackObject(track) {
    return {
      id: track.dataset.id,
      title: track.children[0].children[0].innerHTML,
      // TODO track artist instead of release artist
      artist: this.dom.querySelector('#release-artist').innerHTML,
      cover: this.dom.querySelector('#album-picture').children[0].children[0].children[0].src,
      duration: track.children[0].children[2].innerHTML,
      mood: track.dataset.mood
    };
  }


  getDisplayName() {
    return `Album <b>${this._title}</b> – ${this._artist}`;
  }


}


export default AlbumView;
