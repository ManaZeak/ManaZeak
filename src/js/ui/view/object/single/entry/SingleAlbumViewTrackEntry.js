import TrackEntry from "../../../../component/entry/TrackEntry";
'use strict';


class SingleAlbumViewTrackEntry extends TrackEntry {


  constructor(options) {
    super({
      datasetId: options.trackNumber - 1
    });

    this._id = options.track.id;
    this._track = options.track;
    this._trackNumber = options.trackNumber;

    this._init();
  }


  _init() {
    let number = document.createElement('P');
    number.innerHTML = this._trackNumber;

    let duration = document.createElement('P');
    duration.innerHTML = Utils.secondsToTimecode(this._track.duration);
    duration.style.gridColumn = "3";
    duration.style.gridRow = "1 / span 2";
    duration.style.textAlign = "center";

    let title = document.createElement('P');
    title.innerHTML = this._track.title;

    let artist = document.createElement('P');
    artist.innerHTML = this._track.artists;
    artist.style.gridColumn = "2";
    artist.style.marginTop = "0";

    this._dom.container.appendChild(number);
    this._dom.container.appendChild(title);
    this._dom.container.appendChild(duration);
    this._dom.container.appendChild(artist);
  }


  get id() {
    return this._id;
  }


}


export default SingleAlbumViewTrackEntry;