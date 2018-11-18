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


  //  ----  PRIVATE METHODS  ----  //


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
    this.setVolume(1); // Initialize volume to its maximum value, prefs
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
    const fragment = document.createDocumentFragment(); // Fragment creation
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
    if (typeof percentage !== 'number') { // Bad format for value
      Errors.raise({
        code: 'INVALID_PROGRESS',
        frontend: true
      });
      return;
    }

    if (this._player.currentTime === 0) { // When player is stopped, currentTime = 0. We don't do anything
      return;
    }

    if (percentage <= 0) { // Bound lower value
      percentage = 0;
    }

    if (percentage > 100) { // Bound upper value
      percentage = 100;
    }

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
    if (typeof value !== 'number') { // Bad format for value
      Errors.raise({
        code: 'INVALID_VOLUME',
        frontend: true
      });
      return;
    }

    if (value <= 0) { // Bound lower value
      this.mute();
      this._volume = 0;
      return;
    }

    if (value > 1) { // Bound upper value
      value = 1;
    }

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


  //  ----  PUBLIC METHODS  ----  //


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
    if (!this._isMuted) {
      this.mute();
    } else {
      this.unmute();
    }
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
    if (!this._isPlaying) {
      this.play();
    } else {
      this.pause();
    }
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
    return new Promise((resolve) => {
      if (typeof url !== 'string') { // Bad format value
        Errors.raise({
          code: 'INVALID_TRACK_URL',
          frontend: true
        });
        return;
      }

      const loadedListener = () => {
        this._player.removeEventListener('loadedmetadata', loadedListener); // Remove loaded track listener
        this.play(); // Call player play method (not actually play after that line)
        resolve(); // Resolve promise
      };

      if (this._isPlaying) { // Stop any previous playback
        this.stop();
      }

      this._player.src = url; // Set new track url
      this._player.addEventListener('loadedmetadata', loadedListener); // Add loaded track listener
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
      this._player.pause(); // Pause player playback
      this._isPlaying = false; // Set playing state to false
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
      let volume = 0.5; // Prevent old volume value was zero, we need to restore at half, to avoid unmuting to volume = 0

      if (this._volume !== 0) { // Old volume != 0
        volume = this._volume; // We restore the previous volume otherwise
      }

      this._isMuted = false; // Set mute state to false
      this.setVolume(volume); // Restore old volume value
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


  /**
   * @method
   * @name getSource
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Returns the player current source url if existing, otherwise returns None
   * @returns {string} - The player current source url
   **/
  getSource() {
    let source = 'None';

    if (this._player.src !== null) {
      source = this._player.src;
    }

    return source;
  }


  /**
   * @method
   * @name hasSource
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Check if player has a loaded track
   * @returns {boolean} - The presence of a source in player state
   **/
  hasSource() {
    let hasSource = false;

    if (this._player.src) {
      hasSource = true;
    }

    return hasSource;
  }


  //  ----  GETTER   ----  //


  getIsPlaying() {
    return this._isPlaying;
  }


  getIsMuted() {
    return this._isMuted;
  }


  getVolume() {
    return this._volume;
  }


  getProgress() {
    return this._getProgress();
  }


  getDuration() {
    return this._player.duration;
  }


  getCurrentTime() {
    return this._player.currentTime;
  }


  //  ----  SETTER   ----  //


  setProgress(percentage) {
    this._setProgress(percentage);
  }


  setVolume(value) {
    this._setVolume(value);
  }
}

export default Player;
