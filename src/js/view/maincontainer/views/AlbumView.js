import AlbumViewEntry from "./AlbumViewEntry";
import ScrollBar from "../../../utils/ScrollBar";

'use_strict';


class AlbumView {
  constructor(options) {
    this._dom = {
      fragment: {},
      wrapper: {}
    };

    this._tracks = [];
    this._scrollBar = {};

    this._selection = [];
    this._click = { // Object to handle click events on track entries
      dbclick: false,
      targetId: -1,
      timeoutId: -1
    };

    this._playingTrackIndex = -1;

    this._init();
    this._events();
  }

  _init() {
    this._dom.fragment = document.createDocumentFragment();
    this._dom.wrapper = document.createElement('DIV');
    this._dom.wrapper.classList.add('albumview');
    this._dom.fragment.appendChild(this._dom.wrapper);
  }

  _events() {
    this._dom.wrapper.addEventListener('click', event => {
      this._trackClicked(event);
    });
  }

  _trackClicked(event) {
    event.stopPropagation(); // Block window click listener

    const closest = event.target.closest('.track');
    let targetId = 0;

    if (closest === null) {
      this.unselectAll();
      return;
    } else {
      targetId = closest.dataset.id;
    }

    if (!this._click.dbclick || this._click.targetId !== targetId) { // Second test force dbclick to occur on same track
      this._click.dbclick = true;
      this._click.targetId = targetId;

      if (!event.ctrlKey) { // Simple click unselects all
        const isTargetSelected = this._tracks[targetId].getIsSelected(); // Saving target selection state before unselecting all
        this.unselectAll();
        this._tracks[targetId].setSelected(isTargetSelected); // Restore previous state to properly use in Normal click behavior condition
        this._selection.push(parseInt(targetId, 10));
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        mzk.view.startLoading()
          .then(() => {
            // TODO : différence entre target et le dernier endroit ou on click
            let start = 0;
            let end = 0;

            if (parseInt(targetId, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
              start = parseInt(targetId, 10);
              end = this._selection[0];
            } else if (parseInt(targetId, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
              start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
              end = parseInt(targetId, 10) + 1; // +1 to not forget the targetId too
            }

            for (let i = start; i < end; ++i) { // Loop to fill in between items
              this._tracks[i].setSelected(true);
              this._selection.push(i);
            }

            mzk.view.stopLoading();
          });
      } else { // Normal click behavior
        mzk.view.startLoading()
          .then(() => {
            if (this._tracks[targetId].getIsSelected()) {
              this._tracks[targetId].setSelected(false);
              this._selection.splice(this._selection.indexOf(targetId), 1);
            } else {
              this._tracks[targetId].setSelected(true);
              this._selection.push(parseInt(targetId, 10));
            }

            mzk.view.stopLoading();
          });
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false;
      }, 300); // Double click speed lower than 300ms
    } else {
      clearTimeout(this._click.timeoutId);
      this.stopPlayback();
      this._tracks[targetId].setSelected(true);
      this._selection.push(parseInt(targetId, 10));
      mzk.changeTrack(this._tracks[targetId].id);
    }

    this._selection.sort((a, b) => {
      return (a - b);
    });
  }

  changeTrack(id) {
    let targetId = 0;

    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        targetId = i;
        break;
      }
    }

    mzk.view.startLoading()
      .then(() => {
        this._playingTrackIndex !== -1 ? this._tracks[this._playingTrackIndex].setPlaying(false) : undefined;

        this._playingTrackIndex = targetId;
        this._click.dbclick = false;
        this._tracks[targetId].setPlaying(true);
        mzk.view.stopLoading();
      });
  }

  optionsClicked() {

  }

  _fillOptionsContext(context) {

  }

  addTracks(artists) {
    let tracks = [];

    const firstCall = (this._tracks.length === 0);
    let index = 0;

    for (let i = 0; i < artists.length; ++i) {
      let artist = document.createElement('DIV');
      artist.classList.add('artist');

      let artistName = document.createElement('H1');
      artistName.innerHTML = artists[i].name;

      artist.appendChild(artistName);

      for (let j = 0; j < artists[i].albums.length; ++j) {
        let album = document.createElement('DIV');
        album.classList.add('album');

        let albumCover = document.createElement('IMG');

        if (artists[i].albums[j].tracks[0].cover !== '') {
          albumCover.src = `/static/img/covers/${artists[i].albums[j].tracks[0].cover}`;
        } else {
          albumCover.src = '/static/img/default/cover.svg';
        }

        album.appendChild(albumCover);

        let albumInfo = document.createElement('DIV');
        albumInfo.classList.add('album-info');

        let albumName = document.createElement('H1');
        albumName.innerHTML = `${artists[i].albums[j].name} - ${artists[i].albums[j].tracks[0].year}`;

        albumInfo.appendChild(albumName);

        let albumTracks = document.createElement('DIV');
        albumTracks.classList.add('tracks-container');

        let genres = document.createElement('DIV');
        genres.classList.add('genre-badges');
        let genresObject = {};

        for (let k = 0; k < artists[i].albums[j].tracks.length; ++k) {
          const albumViewEntry = new AlbumViewEntry({
            track: artists[i].albums[j].tracks[k],
            datasetId: index,
            trackNumber: k
          });
          this._tracks.push(albumViewEntry);
          albumTracks.appendChild(albumViewEntry.getDom());
          ++index;

          if (!genresObject[artists[i].albums[j].tracks[k].genre] && artists[i].albums[j].tracks[k].genre !== '') {
            genresObject[artists[i].albums[j].tracks[k].genre] = 1;
            let genreBadge = document.createElement('SPAN');
            genreBadge.innerHTML = artists[i].albums[j].tracks[k].genre;
            genres.appendChild(genreBadge);
          }
        }

        albumTracks.setAttribute('style', `grid-template-rows: repeat(${Math.round(artists[i].albums[j].tracks.length / 2)}, auto);`);
        albumInfo.appendChild(albumTracks);

        album.appendChild(genres);
        album.appendChild(albumInfo);
        artist.appendChild(album);
      }

      this._dom.wrapper.appendChild(artist);
    }

    if (firstCall) {
      this._scrollBar = new ScrollBar({
        target: this._dom.wrapper
      });
      this._dom.wrapper = this._dom.wrapper.firstChild.firstChild; // ScrollBar creates two wrappers
    }
  }

  centerOn(id) {
    let index = -1;
    for (let i = 0; i < this._tracks.length; ++i) {
      if (parseInt(this._tracks[i].container.dataset.id) === id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      Errors.raise({
        code: 'CANT_CENTER_TRACK',
        frontend: true
      });
      return;
    }

    const relativeDelta = this._dom.container.childNodes[index].offsetTop + this._dom.container.childNodes[index].scrollHeight / 2;
    this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
  }

  unselectAll() {
    this._selection = [];

    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].setSelected(false);
    }
  }

  stopPlayback() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].setPlaying(false); // Remove the flag
      this._playingTrackIndex = -1;
    }
  }

  refreshView() {

  }

  getDOMFragment() {
    return this._dom.fragment;
  }

  getNextTrackId() {
    return this._tracks[(this._playingTrackIndex + 1) % this._tracks.length].id;
  }

  getPreviousTrackId() {
    return this._tracks[(this._playingTrackIndex + this._tracks.length - 1) % this._tracks.length].id;
  }

  getFirstTrackId() {
    return this._tracks[0].id;
  }

  isLastTrack() {
    return this._playingTrackIndex === this._tracks.length - 1;
  }
}

export default AlbumView;