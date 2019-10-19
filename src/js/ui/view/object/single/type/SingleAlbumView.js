import SingleTagView from "../SingleTagView";
import ScrollBar from "../../../../component/bar/ScrollBar";
import SingleAlbumViewTrackEntry from "../entry/SingleAlbumViewTrackEntry";
'use strict';


class SingleAlbumView extends SingleTagView {


  constructor(options) {
    super({
      type: 'album'
    });

    this._id = options.id;
    this._title = options.title;
    this._cover = options.cover;

    this._playingTrackIndex = -1;
    this._tracks = [];
    this._click = { // Object to handle click events on track entry
      dbclick: false,
      index: -1,
      timeoutId: -1
    };

    this._dom = {
      cover: null,
      title: null,
      albumArtist: null,
      yearLabel: null,
      trackCompo: null,
      country: null,
      genres: null,
      tracksContainer: null
    };

    this.selection = [];

    this._init()
      .then(this._processAlbum.bind(this))
      .then(this._events.bind(this))
      .then(this._viewReady);
  }


  _processAlbum(response) {
    return new Promise(resolve => {
      this._dom.play = this._dom.wrapper.getElementsByClassName('play-album')[0];
      this._dom.cover = this._dom.wrapper.getElementsByClassName('album-cover')[0];
      this._dom.title = this._dom.wrapper.getElementsByClassName('album-title')[0];
      this._dom.albumArtist = this._dom.wrapper.getElementsByClassName('album-artist')[0];
      this._dom.yearLabel = this._dom.wrapper.getElementsByClassName('album-year-label')[0];
      this._dom.trackCompo = this._dom.wrapper.getElementsByClassName('album-track-composition')[0];
      this._dom.country = this._dom.wrapper.getElementsByClassName('album-country')[0];
      this._dom.genres = this._dom.wrapper.getElementsByClassName('album-genres')[0];
      this._dom.trackContainer = this._dom.wrapper.getElementsByClassName('album-tracks')[0];

      this._dom.cover.src = this._cover;
      this._dom.title.innerHTML = this._title;
      this._dom.albumArtist.innerHTML = response.ALBUM.ALBUM_ARTIST;
      this._dom.yearLabel.innerHTML = `<i>${response.ALBUM.YEAR} – ${response.ALBUM.LABEL}</i>`;
      this._dom.trackCompo.innerHTML = `${response.ALBUM.TRACKS.length} ${mzk.lang.playlist.tracks} – ${response.ALBUM.DURATION}`;
      this._dom.country.innerHTML = response.ALBUM.COUNTRY;
/*
      for (let i = 0; i < response.ALBUM.GENRES.length; ++i) {
        if (i + 1 === response.ALBUM.GENRES.length) {
          this._dom.genres.innerHTML += `${response.ALBUM.GENRES[i]}, `;
        } else {
          this._dom.genres.innerHTML += response.ALBUM.GENRES[i];
        }
      }
*/
      for (let i = 0; i < response.ALBUM.TRACKS.length; ++i) {
        let entry = new SingleAlbumViewTrackEntry({
          trackNumber: i + 1,
          track: response.ALBUM.TRACKS[i]
        });

        this._tracks.push(entry);
        this._dom.trackContainer.appendChild(entry.domFragment);

//        this._tracks.push(track);
//        this._dom.trackContainer.appendChild(track);
      }

      new ScrollBar({
        target: this._dom.trackContainer
      });

      resolve();
    });
  }

  _events() {
    return new Promise((resolve) => {
      this._dom.trackContainer.addEventListener('click', (event) => {
        this._trackClicked(event);
      });

      this._dom.play.addEventListener('click', () => {
        mzk.changeTrack(parseInt(this._tracks[0].dom.dataset.id))
      }, false)
      resolve();
    });
  }


  _toggleSelected(index) {
    if (this._tracks[index].selected) {
      this._removeFromSelection(index);
    } else {
      this._addToSelection(index);
    }
  }


  _controlShiftClick(index) {
    let start = 0;
    let end = 0;

    if (parseInt(index, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
      start = parseInt(index, 10);
      end = this._selection[0];
    } else if (parseInt(index, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
      start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
      end = parseInt(index, 10);
    }

    for (let i = start; i <= end; ++i) { // Loop to fill in between items
      this._addToSelection(i);
    }
  }


  _trackClicked(event) {
    event.stopPropagation(); // Block click listener

    const closest = event.target.closest('.track');
    let index = 0;

    if (closest === null) {
      this.unselectAll();
      return;
    } else {
      index = closest.dataset.id;
    }

    if (Utils.isMobileDevice()) { // Mobile Click
      this.unselectAll();
      this._playTrack(index);
      return;
    }

    if (!this._click.dbclick || this._click.index !== index) { // Second test force dbclick to occur on same track
      this._click.dbclick = true; // Activate double click lock
      this._click.index = index;

      if (!event.ctrlKey) { // Simple click
        this._simpleClick(index);
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        this._controlShiftClick(index);
      } else if (event.ctrlKey) { // Ctrl click behavior
        this._toggleSelected(index);
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false; // Deactivate double click lock
      }, 300);
    } else { // Dble click
      this._playTrack(index);
    }

    this._trimSelection();
  }


  _simpleClick(index) {
    const isTargetSelected = this._tracks[index].selected; // Saving target selection state before unselecting all
    this.unselectAll();
    // Remove selection on track if it was already selected before click
    if (isTargetSelected === true) {
      this._removeFromSelection(index);
    } else {
      this._addToSelection(index);
    }
  }


  changeTrack(id) {
    let index = 0;

    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        index = i;
        break;
      }
    }

    if (this._playingTrackIndex !== -1) {
      this._tracks[this._playingTrackIndex].playing = false;
    }

    this._playingTrackIndex = index;
    this._click.dbclick = false;
    this._tracks[index].playing = true;
  }


  stopPlayback() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].playing = false; // Remove the flag
      this._playingTrackIndex = -1;
    }
  }


  unselectAll() {
    this._selection = [];

    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].selected = false;
    }
  }


  _playTrack(index) {
    clearTimeout(this._click.timeoutId);
    this.stopPlayback();
    this._addToSelection(index);
    mzk.changeTrack(this._tracks[index].id);
  }

  _addToSelection(index) {
    this._tracks[index].selected = true;
    this._selection.push(parseInt(index, 10));
    this._trimSelection();
  }

  _removeFromSelection(index) {
    this._tracks[index].selected = false;
    this._selection.splice(this._selection.indexOf(index), 1);
    this._trimSelection();
  }

  _trimSelection() {
    // Sort selection ids
    this._selection.sort((a, b) => {
      return (a - b);
    });
    // Removing all duplicates
    this._selection = [...new Set(this._selection)];
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleAlbumView;
