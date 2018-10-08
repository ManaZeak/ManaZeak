'use_strict';

class Player {
  /**
  * @summary Basic audio HTML music player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Provide a few features to control a playback. Should be handled in a controller
  **/
  constructor() {
    this._player = {}; // HTML audio player
    this._volume = 0.0; // Volume in range [0, 1] float
    this._isMuted = false; // Mute flag
    this._isPlaying = false; // Playback flag

    this._init(); // Init player object
    this._events(); // Listen to events
    this._attach(); // Attach HTML audio tag to the DOM
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
  * @method
  * @name _init
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Build player tag and set loop/volume values
  **/
  _init() {
    this._player = document.createElement('AUDIO'); // Create HTML audio tag
    this._player.id = 'mzk-audio-player'; // Assign player ID
    this.setVolume(1); // Initialize volume to its maximum value TODO : get value from options, from user settings in localStorage
  }

  /**
  * @method
  * @name _event
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Listen to ended track event on audio player
  **/
  _events() {
    this._player.addEventListener('ended', this._trackEnded.bind(this)); // Handle track end playback event
  }

  /**
  * @method
  * @name _attach
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Append audio player to the DOM using a fragment
  **/
  _attach() {
    let fragment = document.createDocumentFragment(); // Fragment creation
    fragment.appendChild(this._player); // Append audio player to the fragment
    document.body.appendChild(fragment); // Append fragment to the document body
  }

  /**
  * @method
  * @name _getProgress
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Compute and returns the current track progression in the player
  * @returns {number} The track progression in completion percentage in range [0, 100]
  **/
  _getProgress() {
    return Utils.precisionRound((this._player.currentTime * 100) / this._player.duration, 3) || 0; // Compute percentage from current time
  }

  /**
  * @method
  * @name _setProgress
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Set progression percentage on current track
  * @param {number} percentage - The progression percentage in range [0, 100]
  **/
  _setProgress(percentage) {
    if (typeof percentage !== 'number') { console.log('a'); return; } // Bad format for value

    if (percentage <= 0) { percentage = 0; } // Bound lower value
    if (percentage > 100) { percentage = 100; } // Bound upper value

    this._player.currentTime = (percentage * this._player.duration) / 100; // Apply percentage to total duration
  }

  /**
  * @method
  * @name _setVolume
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Set the player volume according to the given value.
  * @param {number} value - The volume value to set in range [0, 1]
  **/
  _setVolume(value) {
    if (typeof value !== 'number') { console.log('a'); return; } // Bad format for value

    if (value <= 0) { this.mute(); this._volume = 0; return; } // Bound lower value
    if (value > 1) { value = 1; } // Bound upper value

    if (this._isMuted) { // Restore mute state if needed
      this.unmute(); // Un mute playback
      this.setVolume(value); // Call again setVolume with previous value
      return;
    }

    this._player.volume = Utils.precisionRound(value, 2); // Assign new volume value (truncated with 2 decimals)
    this._volume = this._player.volume; // Store old volume value
  }

  /**
  * @method
  * @name _trackEnded
  * @private
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Action to take when the current track reaches its end
  **/
  _trackEnded() {
    this._isPlaying = false; // Update playling state
    mzk.trackEnded();
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
  * @method
  * @name toggleMute
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Toggle the mute status of the player
  **/
  toggleMute() {
    !this._isMuted ? this.mute() : this.unmute(); // Test isMuted state
  }

  /**
  * @method
  * @name togglePlay
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Toggle the playback state of the player
  **/
  togglePlay() {
    !this._isPlaying ? this.play() : this.pause(); // Test isPlaying state
  }

  /**
  * @method
  * @name adjustProgress
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Add/Substract the amount (percentage) to the current progress (percentage)
  * @param {number} amount - Percentage value to adjust progress in range [0, 100]
  **/
  adjustProgress(amount) {
    this._setProgress(this._getProgress() + amount); // Inner call with current progression
  }

  /**
  * @method
  * @name adjustVolume
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Add/Substract the amount to the current volume
  * @param {number} amount - Volume to add/substract in range [0, 1]
  **/
  adjustVolume(amount) {
    this._setVolume(this._volume + amount); // Inner call
  }

  /**
  * @method
  * @name changeTrack
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Change the player source and start the playback once ready to play
  * @param {string} url - The path to the track (local or hosted)
  * @returns {Promise} A Promise that resolves when player is operating
  **/
  changeTrack(url) {
    let that = this; // Change scope
    return new Promise((resolve) => {
      if (typeof url !== 'string') { return; } // Bad format value to be catched

      let loadedListener = () => {
        that._player.removeEventListener('loadedmetadata', loadedListener); // Remove loaded track listener
        that.play(); // Call player play method (not actually play after that line)
        resolve(); // Resolve promise
      }

      if (that._isPlaying) { that.stop(); } // Stop any previous playback
      that._player.src = url; // Set new track url
      that._player.addEventListener('loadedmetadata', loadedListener); // Add loaded track listener
    });
  }

  /**
  * @method
  * @name play
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Swap playing state and start playback at currentTime
  **/
  play() {
    if (this._player.src) { // Apply only if src is defined
      this._isPlaying = true; // Set playing state to true
      this._player.play(); // Start player efective playback
    }
  }

  /**
  * @method
  * @name pause
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Swap playing state and pause playback at currentTime
  **/
  pause() {
    if (this._player.src) { // Apply only if src is defined
      this._isPlaying = false; // Set playing state to false
      this._player.pause(); // Pause player playback
    }
  }

  /**
  * @method
  * @name stop
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Stop playback and remove source from player attributes
  **/
  stop() {
    if (this._player.src) { // Apply only if src is defined
      this._isPlaying = false; // Set playing state to false
      this._player.pause(); // Pause player playback
      this._player.removeAttribute('src'); // Remove src attribute from player (since this._player.src = null doesn't delete src)
    }
  }

  /**
  * @method
  * @name mute
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Set player effective volume to zero
  **/
  mute() {
    if (!this._isMuted) { // Avoid multi call
      this._isMuted = true; // Set mute state to true
      this._player.volume = 0; // Mute audio player
    }
  }

  /**
  * @method
  * @name unmute
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description Restore player volume to previous its value
  **/
  unmute() {
    if (this._isMuted) { // Avoid multi call
      this._isMuted = false; // Set mute state to false
      this.setVolume(this._volume === 0 ? 0.5 : this._volume); // Restore old volume value
    }
  }

  /**
  * @method
  * @name repeatTrack
  * @public
  * @memberof Player
  * @author Arthur Beaulieu
  * @since July 2018
  * @description restart immediately the current track in the player
  **/
  repeatTrack() {
    if (this._player.src) { // Apply only if src is defined
      this._player.currentTime = 0; // Reset current time
      this.play(); // Start playback
    }
  }

  //  -------------------------------  GETTERS / SETTERS  -------------------------------  //

  getIsPlaying() { return this._isPlaying; }
  getIsMuted() { return this._isMuted; }
  getVolume() { return this._volume; }
  getProgress() { return this._getProgress(); }
  getDuration() { return this._player.duration; }
  getCurrentTime() { return this._player.currentTime; }
  getSource() {return this._player.attributes.getNamedItem('src') !== null ? this._player.attributes.getNamedItem('src').value : 'None';  }

  setProgress(percentage) { this._setProgress(percentage); }
  setVolume(value) { this._setVolume(value); }

  hasSource() { return this._player.src ? true : false; }

}

export default Player;
