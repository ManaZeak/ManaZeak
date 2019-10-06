import SingleTagView from "./SingleTagView";
import ScrollBar from "../../../../utils/ScrollBar";
import Track from "../../../../../model/components/Track";
'use strict';


class SingleAlbumView extends SingleTagView {


  constructor(options) {
    super({
      type: 'album'
    });

    this._id = options.id;
    this._title = options.title;
    this._cover = options.cover;

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

    this._init()
      .then(this._processAlbum.bind(this))
      .then(this._viewReady);
  }


  _processAlbum(response) {
    return new Promise(resolve => {
      console.log(response)

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
        let track = document.createElement('DIV');
        track.classList.add('album-track');
        track.dataset.id = response.ALBUM.TRACKS[i].ID;

        let number = document.createElement('P');
        number.innerHTML = i + 1;

        let duration = document.createElement('P');
        duration.innerHTML = Utils.secondsToTimecode(response.ALBUM.TRACKS[i].DURATION);

        let title = document.createElement('P');
        title.innerHTML = response.ALBUM.TRACKS[i].TITLE;

        track.appendChild(number);
        track.appendChild(title);
        track.appendChild(duration);

        var t = new Track({
          rawTrack: response.ALBUM.TRACKS[i]
        });
        track.addEventListener('click', function() {
          mzk.changeTrack(response.ALBUM.TRACKS[i].ID)
        }, false);

        this._dom.trackContainer.appendChild(track);
      }

      new ScrollBar({
        target: this._dom.trackContainer
      });

      //this._dom.wrapper.appendChild();
      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default SingleAlbumView;
