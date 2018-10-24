'use_strict';

class Utils {
  /**
   * @summary Miscelaneous utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Miscelaneous utils function and prototypes for mzk
   **/
  constructor() {
    this._prototypes();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _prototypes
   * @private
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Overrides some useful type prototypes
   **/
  _prototypes() {
    // https://www.redips.net/javascript/array-move/ <- Da real MVP
    Array.prototype.move = function(pos1, pos2) {
      // local variables
      let i, tmp;
      // cast input parameters to integers
      pos1 = parseInt(pos1, 10);
      pos2 = parseInt(pos2, 10);
      // if positions are different and inside array
      if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
          for (i = pos1; i < pos2; i++) {
            this[i] = this[i + 1];
          }
        }
        // move element up and shift other elements down
        else {
          for (i = pos1; i > pos2; i--) {
            this[i] = this[i - 1];
          }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
      }
    };
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name precisionRound
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Do a Math.round with a given precision (ie amount of integers after the coma)
   * @param {nunmber} value - The value to precisely round
   * @param {number} precision - The number of integers after the coma
   * @return {number} - The rounded value
   **/
  precisionRound(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * @method
   * @name secondsToTimecode
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Convert a time in seconds into a time DD HH MM SS
   * @param {nunmber} time - The time in seconds to convert
   * @return {string} - The output string according to time duration
   **/
  secondsToTimecode(time) {
    const transformedTime = {
      d: 0,
      h: 0,
      m: 0,
      s: 0
    };

    // Cutting total seconds
    transformedTime.d = Math.floor(time / 86400);
    transformedTime.h = Math.floor((time - (transformedTime.d * 86400)) / 3600);
    transformedTime.m = Math.floor((time - (transformedTime.d * 86400) - (transformedTime.h * 3600)) / 60);
    transformedTime.s = Math.floor(time - (transformedTime.d * 86400) - (transformedTime.h * 3600) - (transformedTime.m * 60));

    // Adding an extra 0 for values inferior to 10
    if (transformedTime.d < 10) {
      transformedTime.d = `0${transformedTime.d}`;
    }

    if (transformedTime.h < 10) {
      transformedTime.h = `0${transformedTime.h}`;
    }

    if (transformedTime.m < 10) {
      transformedTime.m = `0${transformedTime.m}`;
    }

    if (transformedTime.s < 10) {
      transformedTime.s = `0${transformedTime.s}`;
    }

    // Formatting output
    if (transformedTime.d > 0) {
      return `${transformedTime.d}d ${transformedTime.h}h ${transformedTime.m}m ${transformedTime.s}s`;
    } else if (transformedTime.h > 0) {
      return `${transformedTime.h}:${transformedTime.m}:${transformedTime.s}`;
    } else {
      return `${transformedTime.m}:${transformedTime.s}`;
    }
  }

  /**
   * @method
   * @name idGenerator
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Hash the seed to generate an ID, inspired from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   * @param {string} seed   - The seed string to hash
   * @param {number} length - The length of the returned ID
   **/
  idGenerator(seed, length) {
    let hash = 0,
      character = '';

    if (seed.length === 0 || length > 12) {
      return undefined;
    }

    for (let i = 0; i < seed.length; ++i) {
      character = seed.charCodeAt(i);

      hash = ((hash << 5) - hash) + character;
      hash |= 0; // Convert to 32bit integer
    }

    return (Math.abs(hash).toString(36) + '' + Math.abs(hash / 2).toString(36).split('').reverse().join('')).substring(0, length).toUpperCase(); // Here is the twekead line
  }

  /**
   * @method
   * @name getCookies
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get all session cookies
   * @return {object} - The cookies object
   **/
  getCookies() {
    const cookies = {};
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function(cookie) {
        const m = cookie.trim().match(/(\w+)=(.*)/);
        if (m !== undefined) {
          cookies[m[1]] = decodeURIComponent(m[2]);
        }
      });
    }
    return cookies;
  }


  addStyleSheet(filename) {
    var head = document.head;
    var link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filename;

    head.appendChild(link);
  }
}

export default Utils;
