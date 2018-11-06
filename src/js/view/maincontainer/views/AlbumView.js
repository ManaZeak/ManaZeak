import SceneView from '../SceneView';
import AlbumViewEntry from "./AlbumViewEntry";
import ScrollBar from "../../../utils/ScrollBar";

'use_strict';


class AlbumView extends SceneView {


  constructor(options) {
    super(options);

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
}

export default AlbumView;