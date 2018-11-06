import SceneView from '../SceneView';
import AlbumViewEntry from "./AlbumViewEntry";
import ScrollBar from "../../../utils/ScrollBar";

'use_strict';


class AlbumView extends SceneView {


  constructor(options) {
    super(options);

    this._dom = {
      fragment: {},
      container: {}
    };

    this._init();
    this._events();
  }

  _init() {
    this._dom.fragment = document.createDocumentFragment();
    this._dom.container = document.createElement('DIV');
    this._dom.container.classList.add('albumview');
    this._dom.fragment.appendChild(this._dom.container);
  }

  _events() {
    this._dom.container.addEventListener('click', event => {
      this._trackClicked(event);
    });
  }

  optionsClicked() {

  }

  _fillOptionsContext() {

  }

  addTracks(artists) {
    const firstCall = (this._tracks.length === 0);
    let index = 0;

    for (let i = 0; i < artists.length; ++i) {
      const artist = document.createElement('DIV');
      artist.classList.add('artist');

      const artistName = document.createElement('H1');
      artistName.innerHTML = artists[i].name;

      artist.appendChild(artistName);

      for (let j = 0; j < artists[i].albums.length; ++j) {
        const album = document.createElement('DIV');
        album.classList.add('album');

        const albumCover = document.createElement('IMG');

        if (artists[i].albums[j].tracks[0].cover !== '') {
          albumCover.src = `/static/img/covers/${artists[i].albums[j].tracks[0].cover}`;
        } else {
          albumCover.src = '/static/img/default/cover.svg';
        }

        album.appendChild(albumCover);

        const albumInfo = document.createElement('DIV');
        albumInfo.classList.add('album-info');

        const albumName = document.createElement('H1');
        albumName.innerHTML = `${artists[i].albums[j].name} - ${artists[i].albums[j].tracks[0].year}`;

        albumInfo.appendChild(albumName);

        const albumTracks = document.createElement('DIV');
        albumTracks.classList.add('tracks-container');

        const genres = document.createElement('DIV');
        genres.classList.add('genre-badges');
        const genresObject = {};

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
            const genreBadge = document.createElement('SPAN');
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

      this._dom.container.appendChild(artist);
    }

    if (firstCall) {
      this._scrollBar = new ScrollBar({
        target: this._dom.container
      });
      this._dom.container = this._dom.container.firstChild.firstChild; // ScrollBar creates two wrappers
    }
  }

  stopPlayback() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].setPlaying(false); // Remove the flag
      this._playingTrackIndex = -1;
    }
  }

}

export default AlbumView;
