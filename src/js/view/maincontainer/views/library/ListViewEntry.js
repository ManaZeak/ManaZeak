import TrackEntry from "../utils/TrackEntry";
'use strict';


class ListViewEntry extends TrackEntry {
  /**
   * @summary ListView entry
   * @author Arthur Beaulieu
   * @since August 2018
   * @description A ListView item that aim to contain track and its interactivity
   **/
  constructor(options) {
    super(options);
    if (typeof options !== 'object') {
      return;
    }

    this.artists = options.track.artists || '';
    this.album = options.track.album.NAME || '';
    this.composers = options.track.composers || '';
    this.duration = options.track.duration || '';
    this.genre = options.track.genre || '';
    this.id = options.track.id || '';
    this.performers = options.track.performers || '';
    this.title = options.track.title || '';
    this.year = options.track.year || '';
    this.bitrate = options.track.bitrate || '';

    this._dom.container.style.gridTemplateColumns = options.gridTemplateColumns;
  }


  addColumn(column) {
    this._dom.container.appendChild(column);
  }


  getTagValue(tag) {
    return this[tag];
  }


}

export default ListViewEntry;
