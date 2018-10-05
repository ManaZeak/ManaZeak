'use_strict';

class Track {
  /**
	* @summary ManaZeak Track class
	* @author Arthur Beaulieu
	* @since September 2018
	* @description Stores all metadata from a raw format
  * @param {object} options - The track metadata
  * @param {string} options.album - Track album
  * @param {string} options.artist - Track artist
  * @param {object} options.rawTrack - Raw track server response
  * @param {number} options.rawTrack.BITRATE - Track bitrate (kbps)
  * @param {string} options.rawTrack.COMPOSER - Track composer
  * @param {string} options.rawTrack.COVER - Track cover url
  * @param {number} options.rawTrack.DURATION - Track duration
  * @param {string} options.rawTrack.GENRE - Track genre
  * @param {number} options.rawTrack.ID - Track id
  * @param {string} options.rawTrack.PERFORMER - Track performer
  * @param {string} options.rawTrack.TITLE - Track title
  * @param {number} options.rawTrack.YEAR - Track year
	**/
  constructor(options) {
    this.album = options.album;
    this.artist = options.artist;
    this.bitrate = options.rawTrack.BITRATE;
    this.composer = options.rawTrack.COMPOSER;
    this.cover = options.rawTrack.COVER;
    this.duration = options.rawTrack.DURATION;
    this.genre = options.rawTrack.GENRE;
    this.id = options.rawTrack.ID;
    this.performer = options.rawTrack.PERFORMER;
    this.title = options.rawTrack.TITLE;
    this.year = options.rawTrack.YEAR;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getId() { return this._id; }
}

export default Track;
