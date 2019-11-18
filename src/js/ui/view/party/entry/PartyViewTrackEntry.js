import TrackEntry from "../../../component/entry/TrackEntry";
'use strict';


class PartyViewTrackEntry extends TrackEntry {


  constructor(options) {
    super({
      datasetId: options.trackNumber - 1
    });

    this._id = options.trackId;
    this._trackNumber = options.trackNumber;
    this._trackTitle = options.trackTitle;
    this._trackArtist = options.trackArtist;

    this._init();
  }


  _init() {
    let trackNumberTitle = document.createElement('P');
    trackNumberTitle.innerHTML = `${this._trackNumber} – ${this._trackTitle}`;

    let artist = document.createElement('P');
    artist.innerHTML = this._trackArtist;

    this._dom.container.appendChild(trackNumberTitle);
    this._dom.container.appendChild(artist);
    this._dom.container.classList.add('pv-album-track');
  }


  get id() {
    return this._id;
  }


}


export default PartyViewTrackEntry;