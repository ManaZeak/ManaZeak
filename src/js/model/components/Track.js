'use strict';

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
    this.album = options.album;
    this.artist = options.artist;
    this.bitrate = options.rawTrack.BITRATE;
    this.composersArray = options.rawTrack.COMPOSERS;
    this.composers = '';
    this.cover = options.rawTrack.COVER;
    this.duration = options.rawTrack.DURATION;
    this.genre = options.rawTrack.GENRE;
    this.id = options.rawTrack.ID;
    this.moodbar = options.rawTrack.MOODBAR;
    this.performersArray = options.rawTrack.PERFORMERS;
    this.performers = '';
    this.title = options.rawTrack.TITLE;
    this.year = options.rawTrack.YEAR;

    this._joinPerfoCompo();
  }


  _joinPerfoCompo() {
    let composers = '';
    let performers = '';

    for (let i = 0; i < this.composersArray.length - 1; ++i) {
      composers += `${this.composersArray[i].NAME}, `;
    }
    composers += this.composersArray[this.composersArray.length - 1].NAME;
    this.composers = composers;

    for (let i = 0; i < this.performersArray.length - 1; ++i) {
      performers += `${this.performersArray[i].NAME}, `;
    }
    performers += this.performersArray[this.performersArray.length - 1].NAME;
    this.performers = performers;
  }
}

export default Track;
