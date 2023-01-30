import PlayableView from '../utils/PlayableView';
import ScrollBar from '../../navigation/ScrollBar';
import TrackContext from '../../context/TrackContext';


class AlbumView extends PlayableView {


  constructor(options) {
    super({
      type: 'item',
      url: `/fragment/library/album/${options.id}/`
    });

    this._id = options.id;
    this._artist = '';
    this._title = '';
    this._performers = [];

    this._allExpander = null;
    this._isExpanded = false;

    this._scrolls = [];
    this._scrollTrack = null; /* Required to be individual, see refs in file */

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
      // Global view scroll
      this._scrolls.push(new ScrollBar({
        target: this.dom,
        style: {
          color: '#56D45B'
        }
      }));

      this._artist = this.dom.querySelector('#release-artist').innerHTML;
      this._title = this.dom.querySelector('#album-title').innerHTML;
      this._performers = this.dom.querySelector('#album-performers').children;
      this._tracks = this.dom.querySelector('#album-tracks').children;

      this.dom.querySelector('#album-duration').innerHTML = Utils.secondsToTimecode(parseFloat(this.dom.querySelector('#album-duration').innerHTML)); 

      const date = this.dom.querySelector('#album-release-date').innerHTML;
      this.dom.querySelector('#album-release-date').innerHTML = Utils.formatDate(date);
      this.dom.querySelector('#album-year').innerHTML = (new Date(date)).getFullYear();

      for (let i = 0; i < this._tracks.length; ++i) {
        const duration = this._tracks[i].getElementsByClassName('track-duration')[0];
        duration.innerHTML = Utils.secondsToTimecode(parseFloat(duration.innerHTML));
      }
      // Scroll on track must be separated from other scrolls
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
        this.dom.querySelector('#album-performers').style.height = '200px';
        // Ensure height is properly applied before creating scroll on performers
        requestAnimationFrame(() => {
          this._scrolls.push(new ScrollBar({
            target: this.dom.querySelector('#album-performers'),
            style: {
              color: '#56D45B'
            }
          }));
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

      this._allExpander = this.dom.querySelector('#album-all-expander');
      // Update playing track if necessary
      if (mzk.ctrl.playingId) {
        this._updatePlaying({
          id: mzk.ctrl.playingId
        });
      }
      /* Build albums */
      const sortArtistReleases = this.dom.querySelector('#sort-artist-releases');
      sortArtistReleases.addEventListener('click', () => {
        sortArtistReleases.classList.toggle('active');
        let elements = [].slice.call(this._albums.children);
        elements = elements.reverse();
        for (let i = 0; i < this._albums.children.length; ++i) {
          this._albums.children[i].remove();
        }
        for (let i = 0; i < elements.length; ++i) {
          this._albums.appendChild(elements[i]);
        }
      });
      this._albums = this.dom.querySelector('#released-albums');
      if (this._albums && this._albums.children) {
        for (let i = 0; i < this._albums.children.length; ++i) {
          let title = this._albums.children[i].lastElementChild.lastElementChild.innerHTML;
          if (title.includes(' EP')) {
            title = title.replace(' EP', '');
            this._albums.children[i].querySelector('.ep-sp').innerHTML = 'SP';
          }

          if (title.includes(' - Single')) {
            title = title.replace(' - Single', '');
            this._albums.children[i].querySelector('.ep-sp').innerHTML = 'SP';
          }
          // Update album title if needed
          this._albums.children[i].lastElementChild.lastElementChild.innerHTML = title;
          this._albums.children[i].addEventListener('click', this._albumClicked);
        }

        this._scrolls.push(new ScrollBar({
          target: this._albums,
          horizontal: true,
          style: {
            color: '#56D45B'
          }
        }));

        this._albums = this._albums.children[0].children[0];
        this.updateScrollbars();
        resolve();
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

      this._evtIds.push(Evts.addEvent('click', this._allExpander, this._toggleAllTracks, this));

      for (let i = 0; i < this._albums.children.length; ++i) {
        if (this._id === this._albums.children[i].dataset.id) {
          setTimeout(() => {
            this._albums.scrollLeft = this._albums.children[i].offsetLeft - (this._albums.clientWidth / 2) + (this._albums.children[i].clientWidth / 2);
            this._albums.children[i].classList.add('selected');
          });
          break;
        }
      }

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


  _trackTitleClicked(e) {
    e.stopPropagation();
    // This as special this scope, see event definition
    mzk.setModal({
      name: 'TrackDetail',
      tracks: this.tracks,
      index: this.index,
      id: this.tracks[this.index].dataset.id
    });
  }


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


  _albumClicked() {
    mzk.setView({
      name: 'Album',
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
      this.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
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


  _toggleAllTracks() {
    if (this._isExpanded === false) {
      this._expandAllTracks();
    } else {
      this._collapseAllTracks();
    }
  }


  _collapseAllTracks() {
    this._isExpanded = false;
    this._allExpander.src = '/static/img/navigation/nav-down.svg';
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
    this._isExpanded = true;
    this._allExpander.src = '/static/img/navigation/nav-up.svg';
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
      title: this.dom.querySelector('#album-title').textContent,
      artist: this.dom.querySelector('#release-artist').textContent,
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
      title: track.children[0].children[0].textContent,
      // TODO track artist instead of release artist
      artist: this.dom.querySelector('#release-artist').textContent,
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
