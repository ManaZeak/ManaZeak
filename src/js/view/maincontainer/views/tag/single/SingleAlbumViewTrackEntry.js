import TrackEntry from "../../utils/TrackEntry";
'use strict';


class SingleAlbumViewTrackEntry extends TrackEntry {


  constructor(options) {
    super({
      datasetId: options.trackNumber - 1
    });

    this._id = options.track.ID;
    this._track = options.track;
    this._trackNumber = options.trackNumber;

    this._init();
  }


  _init() {
    let number = document.createElement('P');
    number.innerHTML = this._trackNumber;

    let duration = document.createElement('P');
    duration.innerHTML = Utils.secondsToTimecode(this._track.DURATION);

    let title = document.createElement('P');
    title.innerHTML = this._track.TITLE;

    this._dom.container.appendChild(number);
    this._dom.container.appendChild(title);
    this._dom.container.appendChild(duration);
  }


  get id() {
    return this._id;
  }


}


export default SingleAlbumViewTrackEntry;