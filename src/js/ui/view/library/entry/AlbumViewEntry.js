import TrackEntry from "../../../component/entry/TrackEntry";
'use strict';


class AlbumViewEntry extends TrackEntry {
  constructor(options) {
    super(options);
    if (typeof options !== 'object') {
      return;
    }

    this._artists = options.track.artists || '';
    this._composer = options.track.composers || '';
    this._duration = options.track.duration || '';
    this._id = options.track.id || '';
    this._title = options.track.title || '';
    this._trackNumber = options.trackNumber;
    this._dom.duration = {};
    this._dom.title = {};
    this._dom.artists = {};
    this._dom.composer = {};

    this._init();
  }


  _init() {
    this._dom.container.dataset.before = (this._trackNumber + 1);

    this._dom.duration = document.createElement('P');
    this._dom.duration.innerHTML = Utils.secondsToTimecode(this._duration);

    this._dom.title = document.createElement('P');
    this._dom.title.classList.add('track-title');
    this._dom.title.innerHTML = this._title;

    this._dom.artists = document.createElement('P');
    this._dom.artists.classList.add('track-artist');
    this._dom.artists.dataset.label = 'Artist: ';
    this._dom.artists.innerHTML = this._artists;

    this._dom.composer = document.createElement('P');
    this._dom.composer.dataset.label = 'Composer: ';
    this._dom.composer.innerHTML = this._composer;

    this._dom.container.appendChild(this._dom.duration);
    this._dom.container.appendChild(this._dom.title);
    this._dom.container.appendChild(this._dom.artists);
    this._dom.container.appendChild(this._dom.composer);
  }


  get id() {
    return this._id;
  }


}


export default AlbumViewEntry;
