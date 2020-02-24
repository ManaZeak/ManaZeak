import LibraryViews from '../LibraryViews';
import TrackContext from '../../../context/TrackContext.js';
import AlbumViewEntry from "../entry/AlbumViewEntry";
import ScrollBar from "../../../component/bar/ScrollBar";
'use strict';


class AlbumView extends LibraryViews {


  constructor(options) {
    super(options);

    this._playlist = options.playlist;

    this._dom = {
      fragment: {},
      container: {},
      wrapper: {}
    };

    this._trackContext = {};

    this._init();
  }


  _init() {
    this.buildDom() // Pare nt class call
      .then((container) => {
        this._dom.fragment = document.createDocumentFragment();
        this._dom.wrapper = document.createElement('DIV');
        this._dom.container = document.createElement('DIV');
        this._dom.container.classList.add('albumview');

        container.appendChild(this._dom.container);
        container.appendChild(this._dom.wrapper);

        this._dom.fragment.appendChild(container);

        this._trackContext = new TrackContext({
          target: this._dom.container,
          url: 'context/trackcontext/'
        });

        this.addTracks(this._playlist.artists);
        this._albumViewEvents();
        Events.fire('SceneViewReady');
      });
  }


  _albumViewEvents() {
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


  _buildAlbum(album) {
    // Create album container
    const uiAlbum = document.createElement('DIV');
    uiAlbum.classList.add('album');
    // Set cover for album entry
    const albumCover = document.createElement('IMG');
    if (album.tracks[0].cover) {
      albumCover.src = `/static/covers/${album.tracks[0].cover}`;
    } else {
      albumCover.src = '/static/img/default/cover.svg';
    }
    uiAlbum.appendChild(albumCover);
    // Right side of layout container (year, title, tracks)
    const albumInfo = document.createElement('DIV');
    albumInfo.classList.add('album-info');
    // Album title concatenated with its year
    const albumName = document.createElement('H1');
    albumName.innerHTML = `${album.name} - ${album.tracks[0].year}`;
    albumInfo.appendChild(albumName);
    // Create album tracks container
    const albumTracks = document.createElement('DIV');
    albumTracks.classList.add('tracks-container');
    // Create genres container (spans in it are automatically taken into a single genre)
    const genres = document.createElement('DIV');
    genres.classList.add('genre-badges');
    // Genre object will store all unique album's track genre
    const genresObject = {};
    let isHq = true;
    // Iterate over album tracks to create track entry and compute album genres
    for (let k = 0; k < album.tracks.length; ++k) {
      const albumViewEntry = new AlbumViewEntry({
        track: album.tracks[k],
        datasetId: this._trackDatasetId,
        trackNumber: k
      });
      this._tracks.push(albumViewEntry);
      albumTracks.appendChild(albumViewEntry.domFragment);
      ++this._trackDatasetId;
      // Split genre into array and try to insert them if not already existing in genres
      if (album.tracks[k].genreArray.length > 0) {
        // Iterate over splited array
        for (let j = 0; j < album.tracks[k].genreArray.length; ++j)  {
          if (album.tracks[k].genreArray[j] && !genresObject[album.tracks[k].genreArray[j].NAME]) {
            genresObject[album.tracks[k].genreArray[j].NAME] = 1;
            const genreBadge = document.createElement('SPAN');
            genreBadge.innerHTML = album.tracks[k].genreArray[j].NAME;
            genres.appendChild(genreBadge);
          }
        }
      }
      // Do not append the hq badge if at least one file is under or equal to 320 kbps
      if (album.tracks[k].bitrate <= 320000) {
        isHq = false;
      }
    }
    // Append the hq badge if album if higher than mp3 320kbps
    if (isHq === true) {
      const hq = document.createElement('IMG');
      hq.classList.add('hq-badge');
      hq.src = '/static/img/object/hq.svg';
      uiAlbum.appendChild(hq);
    }
    // Set layout configuration depending on track count and build layout into album container
    albumTracks.setAttribute('style', `grid-template-rows: repeat(${Math.round(album.tracks.length / 2)}, auto);`);
    albumInfo.appendChild(albumTracks);
    uiAlbum.appendChild(genres);
    uiAlbum.appendChild(albumInfo);

    return uiAlbum;
  }


  addTracks(artists) {
    this._trackDatasetId = 0; // Need to be attached to this, and must be deleted after user (at the end of this method)
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

    this.initViewState();
    delete this._trackDatasetId;
  }


}

export default AlbumView;
