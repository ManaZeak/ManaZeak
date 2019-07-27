'use strict';


class Player {


  /**
   * @summary <h1>Basic audio HTML music player</h1>
   * @author Arthur Beaulieu
   * @since July 2018
   * @description <blockquote>Provide a few features to control an audio playback. Should be handled in a controller.</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The HTML audio player */
    this._player = {};
    /** @private
     * @member {number} - The player's volume in range float[0, 1] */
    this._volume = 0.0;
    /** @private
     * @member {boolean} - The player's mute flag */
    this._isMuted = false;
      /** @private
       * @member {boolean} - The player's is playing flag */
    this._isPlaying = false; // Playback flag
      /** @private
       * @member {number} - The player's playback rate float[0.25, 2] */
    this._playbackRate = 1; // Playback flag

    this._init(); // Init player object
    this._events(); // Listen to events
    this._attach(); // Attach HTML audio tag to the DOM
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
    this.volume = 1; // Initialize volume to its maximum value, prefs
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
    this._player.addEventListener('error', this._handleErrors.bind(this));
  }


  /**
   * @method
   * @name _handleErrors
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since January 2019
   * @description Handle all the player's media errors
   **/
  _handleErrors(event) {
    const error = event.target.error;

    if (error.code === error.MEDIA_ERR_DECODE) {
      Logger.raise({
        code: 'MEDIA_DECODE_ERROR',
        frontend: true
      });
    } else if (error.code === error.MEDIA_ERR_ABORTED) {
      Logger.raise({
        code: 'MEDIA_ABORT_ERROR',
        frontend: true
      });
    } else if (error.code === error.MEDIA_ERR_NETWORK) {
      Logger.raise({
        code: 'MEDIA_NETWORK_ERROR',
        frontend: true
      });
    } else if (error.code === error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      Logger.raise({
        code: 'MEDIA_SRC_NOT_SUPPORTED_ERROR',
        frontend: true
      });
    } else {
      Logger.raise({
        code: 'MEDIA_UNKNOWN_ERROR',
        frontend: true
      });
    }
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


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  PLAYBACK METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
        Logger.raise({
          code: 'INVALID_TRACK_URL',
          frontend: true
        });
        return;
      }

      const startPlayback = () => {
        this.play(); // Call player play method (not actually play after that line)
        resolve(); // Resolve promise
      };

      const loadedListener = () => {
        this._player.removeEventListener('loadedmetadata', loadedListener); // Remove loaded track listener
        startPlayback();
      };

      const tmpPlaybackRate = this._playbackRate;

      if (this._isPlaying) { // Stop any previous playback
        this.stop();
      }

      this._player.src = url; // Set new track url
      this._player.playbackRate = tmpPlaybackRate;

      if (Utils.isMobileDevice()) {
        startPlayback();
      } else {
        this._player.addEventListener('loadedmetadata', loadedListener); // Add loaded track listener
      }
    });
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


  //  ------------------------------------------------------------------------------------------------//
  //  --------------------------------------  VOLUME METHODS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
      this.volume = volume; // Restore old volume value
    }
  }


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
      Logger.raise({
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
      this.volume = value; // Call again setVolume with previous value
      return;
    }

    this._player.volume = Utils.precisionRound(value, 2); // Assign new volume value (truncated with 2 decimals)
    this._volume = this._player.volume; // Store old volume value
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  PROGRESS METHODS  -------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
      Logger.raise({
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
      this._trackEnded();
      return;
    }

    this._player.currentTime = (percentage * this._player.duration) / 100; // Apply percentage to total duration
  }


  setPlaybackRate(percentage) {
    const _setPlaybackRate = (value) => {
      this._playbackRate = value;
      this._player.playbackRate = value;
    };

    return new Promise(resolve => {
      percentage *= 100;

      if (percentage === 0) {
        _setPlaybackRate(0.5);
      } else if (percentage > 0 && percentage < 50) {
        /* Result := ((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow */
        const formattedPercentage = percentage * 2; // Format [0, 50] to [0, 100]
        const value = (formattedPercentage / 100) * (1 - 0.5) + 0.5;
        _setPlaybackRate(value);
      } else if (percentage === 50) {
        _setPlaybackRate(1);
      } else if (percentage > 50 && percentage < 100) {
        /* Result := ((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow */
        const formattedPercentage = (percentage * 2) - 100; // Format [0, 50] to [0, 100]
        const value = (formattedPercentage / 100) + 1;
        _setPlaybackRate(value);

      } else if (percentage === 100) {
        _setPlaybackRate(2);
      }

      resolve(percentage / 100);
    });
  }


  //  ------------------------------------------------------------------------------------------------//
  //  --------------------------------------  SOURCE METHODS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


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
    if (this._player.src !== null) {
      return this._player.src;
    } else {
      return 'None';
    }
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
    return !!this._player.src;
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  GETTER / SETTER  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @public
   * @member {boolean} - The player's playing state public accessor */
  get playing() {
    return this._isPlaying;
  }


  /** @public
   * @member {boolean} - The player's muted state public accessor */
  get muted() {
    return this._isMuted;
  }


  /** @public
   * @member {number} - The player's volume value in range float[0, 1] */
  get volume() {
    return this._volume;
  }


  /** @public
   * @member {number} - The player's progress percentage in range int[0, 100] */
  get progress() {
    return this._getProgress();
  }


  /** @public
   * @member {number} - The current loaded track's float duration */
  get duration() {
    return this._player.duration;
  }


  /** @public
   * @member {number} - The player's playback rate */
  get playbackRate() {
    return this._playbackRate;
  }


  /** @public
   * @member {number} - The player's progress percentage in range int[0, 100] */
  set progress(percentage) {
    this._setProgress(percentage);
  }


  /** @public
   * @member {number} - The player's volume value in range float[0, 1] */
  set volume(value) {
    this._setVolume(value);
  }


}


export default Player;
