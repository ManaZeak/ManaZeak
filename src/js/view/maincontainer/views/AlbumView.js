import SceneView from '../SceneView';
import TrackContext from './TrackContext.js';
import AlbumViewEntry from "./AlbumViewEntry";
import ScrollBar from "../../../utils/ScrollBar";
'use strict';


class AlbumView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      fragment: {},
      container: {}
    };

    this._trackContext = {};

    this._init();
    this._events();
  }

  _init() {
    this._dom.fragment = document.createDocumentFragment();
    this._dom.container = document.createElement('DIV');
    this._dom.container.classList.add('albumview');
    this._dom.fragment.appendChild(this._dom.container);

    this._trackContext = new TrackContext({
      target: this._dom.container,
      url: 'contexts/trackcontext/'
    });
  }

  _events() {
    this._dom.container.addEventListener('click', event => {
      this._trackClicked(event);
    });

    this._dom.container.addEventListener('contextmenu', event => {
      event.preventDefault();

      if (this._dom.container.contains(this._trackContext.dom)) {
        this._trackContext.close();
      } else {
        this._contextClicked(event);
      }
    });
  }

  _contextClicked(event) {
    if (event.target.closest('.track')) {
      if (event.target.className !== 'track') {
        this._trackContext.open(event, event.target.parentNode.dataset.id);
      } else {
        this._trackContext.open(event, event.target.dataset.id);
      }
    }
  }

  optionsClicked() {

  }

  _fillOptionsContext() {

  }

  _buildAlbum(album) {
    let index = 0;

    const uiAlbum = document.createElement('DIV');
    uiAlbum.classList.add('album');

    const albumCover = document.createElement('IMG');

    if (album.tracks[0].cover !== '') {
      albumCover.src = `/static/img/covers/${album.tracks[0].cover}`;
    } else {
      albumCover.src = '/static/img/default/cover.svg';
    }

    uiAlbum.appendChild(albumCover);

    const albumInfo = document.createElement('DIV');
    albumInfo.classList.add('album-info');

    const albumName = document.createElement('H1');
    albumName.innerHTML = `${album.name} - ${album.year}`;

    albumInfo.appendChild(albumName);

    const albumTracks = document.createElement('DIV');
    albumTracks.classList.add('tracks-container');

    const genres = document.createElement('DIV');
    genres.classList.add('genre-badges');
    const genresObject = {};

    for (let k = 0; k < album.tracks.length; ++k) {
      const albumViewEntry = new AlbumViewEntry({
        track: album.tracks[k],
        datasetId: index,
        trackNumber: k
      });
      this._tracks.push(albumViewEntry);
      albumTracks.appendChild(albumViewEntry.getDom());
      ++index;

      if (!genresObject[album.tracks[k].genre] && album.tracks[k].genre !== '') {
        genresObject[album.tracks[k].genre] = 1;
        const genreBadge = document.createElement('SPAN');
        genreBadge.innerHTML = album.tracks[k].genre;
        genres.appendChild(genreBadge);
      }
    }

    albumTracks.setAttribute('style', `grid-template-rows: repeat(${Math.round(album.tracks.length / 2)}, auto);`);
    albumInfo.appendChild(albumTracks);

    uiAlbum.appendChild(genres);
    uiAlbum.appendChild(albumInfo);

    return uiAlbum;
  }

  addTracks(artists) {
    const firstCall = (this._tracks.length === 0);

    for (let i = 0; i < artists.length; ++i) {
      const artist = document.createElement('DIV');
      artist.classList.add('artist');

      const artistName = document.createElement('H1');
      artistName.innerHTML = artists[i].name;

      artist.appendChild(artistName);

      for (let j = 0; j < artists[i].albums.length; ++j) {
        const album = this._buildAlbum(artists[i].albums[j]);
        artist.appendChild(album);
      }

      this._dom.container.appendChild(artist);
    }

    if (firstCall) {
      this._scrollBar = new ScrollBar({
        target: this._dom.container
      });
      this._dom.container = this._dom.container.firstChild.firstChild; // ScrollBar creates two wrappers
    }

    this.initTracksState();
  }

  stopPlayback() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].setPlaying(false); // Remove the flag
      this._playingTrackIndex = -1;
    }
  }

}

export default AlbumView;
