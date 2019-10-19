'use strict';

class Track {
  /**
   * @summary ManaZeak Track class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Stores all metadata from a raw format
   * @param {object} options - The track metadata
   * @param {string} options.album - Track album
   * @param {string} options.albumArtist - Track artist
   * @param {object} options.rawTrack - Raw track server response
   * @param {array} options.rawTrack.ARTIST - Track arttist
   * @param {number} options.rawTrack.BITRATE - Track bitrate (bps)
   * @param {string} options.rawTrack.COMPOSERS - Track composer
   * @param {string} options.rawTrack.COVER - Track cover url
   * @param {number} options.rawTrack.DURATION - Track duration
   * @param {string} options.rawTrack.GENRE - Track genre
   * @param {number} options.rawTrack.ID - Track id
   * @param {number} options.rawTrack.MOODBAR - The track's moodbar url
   * @param {string} options.rawTrack.PERFORMERS - Track performer
   * @param {string} options.rawTrack.TITLE - Track title
   * @param {number} options.rawTrack.YEAR - Track year
   **/
  constructor(options) {
    this.title = options.rawTrack.TITLE;
    this.album = options.album;
    this.year = options.rawTrack.YEAR;
    this.albumArtist = options.albumArtist;
    this.artistsArray = options.rawTrack.ARTISTS || [];
    this.artists = '';
    this.composersArray = options.rawTrack.COMPOSERS;
    this.composers = '';
    this.performersArray = options.rawTrack.PERFORMERS;
    this.performers = '';
    this.genreArray = options.rawTrack.GENRE;
    this.genre = '';
    this.cover = options.rawTrack.COVER;
    this.id = options.rawTrack.ID;
    this.bitrate = options.rawTrack.BITRATE;
    this.moodbar = options.rawTrack.MOODBAR;
    this.duration = options.rawTrack.DURATION;

    this._joinArrayIntoString('artistsArray', 'artists');
    this._joinArrayIntoString('composersArray', 'composers');
    this._joinArrayIntoString('performersArray', 'performers');
    this._joinArrayIntoString('genreArray', 'genres');
  }


  _joinArrayIntoString(arrayKey, stringKey) {
    if (this[arrayKey].length > 0) {
      let outString = '';
      outString += this[arrayKey][0].NAME;
      for (let i = 1; i < this[arrayKey].length; ++i) {
        if (outString.indexOf(this[arrayKey][i].NAME) === -1) {
          outString += `, ${this[arrayKey][i].NAME}`;
        }
      }

      this[stringKey] = outString;
    }
  }
}

export default Track;
