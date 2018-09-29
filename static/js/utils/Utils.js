class Utils {
  constructor() {
    this._prototypes();
  }

  _prototypes() {
    Array.prototype.move = function(pos1, pos2) { // https://www.redips.net/javascript/array-move/ <- Da real MVP
       // local variables
       var i, tmp;
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
     }

  }

  precisionRound(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  secondsToTimecode(time) {
      let transformedTime = {
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
      transformedTime.d = transformedTime.d < 10 ? "0" + transformedTime.d : transformedTime.d;
      transformedTime.h = transformedTime.h < 10 ? "0" + transformedTime.h : transformedTime.h;
      transformedTime.m = transformedTime.m < 10 ? "0" + transformedTime.m : transformedTime.m;
      transformedTime.s = transformedTime.s < 10 ? "0" + transformedTime.s : transformedTime.s;
      // Formatting output
      if (transformedTime.d > 0) {
          return transformedTime.d + "d " + transformedTime.h + "h " + transformedTime.m + "m " + transformedTime.s + "s";
      }

      else if (transformedTime.h > 0) {
          return transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
      }

      else {
          return transformedTime.m + ":" + transformedTime.s;
      }
  }

  /**
	* @method
	* @name _idGenerator
	* @private
	* @memberof Notification
	*
	* @summary Generate an ID
	* @author Arthur Beaulieu
	* @since June 2018
	* @description Hash the seed to generate an ID
	*
	* @param {string} seed   - The seed string to hash
	* @param {number} length - The length of the returned ID
	**/
  idGenerator(seed, length) {
    /* Original code from:
    * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    * Tweaked to fit Notification class needs
    */
    let hash 	  = 0,
    character = '';

    if (seed.length === 0 || length > 12) { return undefined; }

    for (let i = 0; i < seed.length; ++i) {
      character = seed.charCodeAt(i);

      hash  = ((hash << 5) - hash) + character;
      hash |= 0; // Convert to 32bit integer
    }

    return (Math.abs(hash).toString(36) + '' + Math.abs(hash / 2).toString(36).split('').reverse().join('')).substring(0, length).toUpperCase(); // Here is the twekead line
  }

  getCookies() {
    let cookies = {};
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function (cookie) {
        let m = cookie.trim().match(/(\w+)=(.*)/);
        if (m !== undefined) { cookies[m[1]] = decodeURIComponent(m[2]); }
      });
    }
    return cookies;
  }
}

export default Utils;
