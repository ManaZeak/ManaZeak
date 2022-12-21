class Shortcut {


  /** @summary <h1>JavaScript keyboard shortcut singleton to handle key strokes</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>The Shortcut class provides a singleton object to set custom keyboard shortcuts for
   * web application. It allows to register key shortcuts using a string notation (ie. <code>Ctrl+A</code>). It also exposes
   * several methods to pause/resume the callback for a given event or for all of them. With the key string, you must provide
   * a callback function to react to this shortcut fire event. That's all folks! For source code, please go to
   * <a href="https://github.com/ArthurBeaulieu/Shortcut.js" alt="shortcut-js">Shortcut.js</a></blockquote>
   * @param {object} [options={}] - The Shortcut singleton options, not mandatory
   * @param {string} [options.keyEvent=keydown] - The key event to react from
   * @param {boolean} [options.autoRepeat=true] - For <code>keydown</code> and <code>keypress</code>, auto repeat event if key is held on pushed
   * @returns {object} - The Shortcut singleton instance */
  constructor(options = {}) {
    // If an instance of Shortcut already exists, we just return it
    if (Shortcut.instance) {
      return Shortcut.instance;
    }
    // Set object instance
    Shortcut.instance = this;
    // Prevent wrong type for arguments, fallback according to attribute utility
    if (typeof options.keyEvent !== 'string' || (['keydown', 'keyup', 'keypress'].indexOf(options.keyEvent) === -1)) {
      options.keyEvent = 'keydown';
    }
    if (typeof options.autoRepeat !== 'boolean') {
      options.autoRepeat = true;
    }
    if (typeof options.noPrevention !== 'boolean') {
      options.noPrevention = false;
    }
    /** @private
     * @member {string} - Key event to use on keyboard event listener */
    this._keyEvent = options.keyEvent;
    /** @private
     * @member {boolean} - The auto repeat of an event when key is held on push */
    this._autoRepeat = options.autoRepeat;
    /** @private
     * @member {boolean} - Do not call prevent default on key event flag */
    this._noPrevention = options.noPrevention;
    /** @private
     * @member {object[]} - Single key saved shortcuts */
    this._singleKey = [];
    /** @private
     * @member {object[]} - Multi keys saved shortcuts */
    this._multiKey = [];
    /** @public
     * @member {string} - Component version */
    this.version = '1.0.3';
    // Save singleton scope for testShortcuts method to be able to properly remove event on demand
    this._testShortcuts = this._testShortcuts.bind(this);
    // Retun singleton to the caller
    return this;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Shortcut
   * @description <blockquote>Shortcut destructor. Will delete singleton instance, its events and its properties.</blockquote> */
  destroy() {
    // Remove all existing eventListener
    this._removeEvents();
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
    // Clear singleton instance
    Shortcut.instance = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  SHORTCUT JS INTERN METHODS  ------------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are made to abstract the event listeners from the JavaScript layer, so you can easily     */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _addEvents
   * @private
   * @memberof Shortcut
   * @description <blockquote>Internal private method to subscribe to DOM key stroke event, depending on which
   * key event was set in constructor, or using the <code>updateKeyEvent()</code> method. The key event is then
   * calling back the <code>_testShortcuts()</code> method to check if any event has to be fired.</blockquote> */
  _addEvents() {
    // Listen to keyboard's event
    document.addEventListener(this._keyEvent, this._testShortcuts);

  }


  /** @method
   * @name _removeEvents
   * @private
   * @memberof Shortcut
   * @description <blockquote>Internal private method to revoke DOM subscribtion to a key stroke event, depending on which
   * key event was set in constructor, or using the <code>updateKeyEvent()</code> method. The key event won't then
   * call back the <code>_testShortcuts()</code> method.</blockquote> */
  _removeEvents() {
    // Revoke listener on keyboard's event
    document.removeEventListener(this._keyEvent, this._testShortcuts);
  }


  /** @method
   * @name _testShortcuts
   * @private
   * @memberof Shortcut
   * @description <blockquote>This method needs to be called when a key event has been detected. It takes as a parameters
   * the JavaScript event object, which contains several, required, information. It will then crawl the registered shortcuts to
   * check if one needs to be fired and call back the application. It handle both single key and multi key shortcuts. Finally,
   * it will not fire any event if the event <code>repeat</code> flag is at <code>true</code>, and the singleton is not in
   * auto repeat event.</blockquote>
   * @param {event} event - The keyboard event (<code>keydown</code>, <code>keypress</code> and <code>keyup</code>) */
  _testShortcuts(event) {
    // Avoid auto repeat event if singleton is configured this way
    if (this._autoRepeat === false && event.repeat === true) {
      event.preventDefault();
      return;
    }
    // Analyze event to check proper shortcut array
    if (event.ctrlKey || event.altKey || event.shiftKey) { // Multi key shortcut
      this._multiKeyEvent(event);
    } else { // Single key shortcut
      this._singleKeyEvent(event);
    }
  }


  /** @method
   * @name _singleKeyEvent
   * @private
   * @memberof Shortcut
   * @description <blockquote>This method will parse all single key events registered in its internal attributes, and will
   * fire the call back if its registered key matches the event key. It also prevent defaults on the event only if a match
   * is found to keep browser behavior in case there is no regstered shortcut.</blockquote>
   * @param {event} event - The keyboard event (<code>keydown</code>, <code>keypress</code> and <code>keyup</code>) */
  _singleKeyEvent(event) {
    // Iterate over registered single key shortcut to fire it if one matches
    for (let i = 0; i < this._singleKey.length; ++i) {
      // Check that event is active and flatten key string to compare
      if (!this._singleKey[i].pause && event.key.toLowerCase() === this._singleKey[i].keyString.toLowerCase()) {
        if (this._noPrevention === false) {
          event.preventDefault();
        }

        this._singleKey[i].fire(this);
      }
    }
  }


  /** @method
   * @name _multiKeyEvent
   * @private
   * @memberof Shortcut
   * @description <blockquote>This method will parse all multi keys events registered in its internal attributes, and will
   * fire the call back if its registered key matches the event key. Multi key events are made using ctrl, alt and shift modifiers.
   * It also prevent defaults on the event only if a match is found to keep browser behavior in case there is no regstered
   * shortcut.</blockquote>
   * @param {event} event - The keyboard event (<code>keydown</code>, <code>keypress</code> and <code>keyup</code>) */
  _multiKeyEvent(event) {
    for (let i = 0; i < this._multiKey.length; ++i) {
      // Handy shortcut variable to work with
      const sh = this._multiKey[i];
      // Check that event is active and flatten key string to compare
      if (!sh.pause && event.key.toLowerCase() === sh.key) {
        switch (sh.modifierCount) {
          case 1: // 2 key strokes
            if ((sh.modifiers.ctrlKey && event.ctrlKey)
            || (sh.modifiers.altKey && event.altKey)
            || (sh.modifiers.shiftKey && event.shiftKey)) {
              if (this._noPrevention === false) {
                event.preventDefault();
              }

              sh.fire();
            }
            break;
          case 2: // 3 key strokes
            if ((sh.modifiers.ctrlKey && event.ctrlKey && sh.modifiers.altKey && event.altKey)
            || (sh.modifiers.ctrlKey && event.ctrlKey && sh.modifiers.shiftKey && event.shiftKey)
            || (sh.modifiers.altKey && event.altKey && sh.modifiers.shiftKey && event.shiftKey)) {
              if (this._noPrevention === false) {
                event.preventDefault();
              }

              sh.fire();
            }
            break;
          case 3: // 4 key strokes
            if ((sh.modifiers.ctrlKey && event.ctrlKey
            && sh.modifiers.altKey && event.altKey
            && sh.modifiers.shiftKey && event.shiftKey)) {
              if (this._noPrevention === false) {
                event.preventDefault();
              }

              sh.fire();
            }
            break;
          default:
            break;
        }
      }
    }
  }


  /** @method
   * @name _getModifiersCount
   * @private
   * @memberof Shortcut
   * @description <blockquote>Shorthand method to count modifiers in a given shrotcut string. It uses regex that are
   * case insensitive to avoid multi testing (and because it's what this singleton do).</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  _getModifiersCount(keyString) {
    // Build local modifiers count with regex
    const modifiers = {
      ctrlKey: /ctrl/i.test(keyString),
      altKey: /alt/i.test(keyString),
      shiftKey: /shift/i.test(keyString)
    };
    // Count modifiers that are set to true and update count with it
    return Object.values(modifiers).reduce((a, b) => a + b, 0);
  }


  /** @method
   * @name _setAllPauseFlag
   * @private
   * @memberof Shortcut
   * @description <blockquote>Parse all registered event and make them listen or not to any key event.</blockquote>
   * @param {boolean} value - The state to set, to pause/resume all registered shortcuts */
  _setAllPauseFlag(value) {
    // Iterate over both arays to update pause flag on each registered shortcut
    for (let i = 0; i < this._singleKey.length; ++i) {
      this._setOnePauseFlag(this._singleKey[i].keyString, value);
    }

    for (let i = 0; i < this._multiKey.length; ++i) {
      this._setOnePauseFlag(this._multiKey[i].keyString, value);
    }
  }


  /** @method
   * @name _setOnePauseFlag
   * @private
   * @memberof Shortcut
   * @description <blockquote>Parse all registered event and make the one that matches the key string listen or not
   * to any key event.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event
   * @param {boolean} value - The state to set, to pause/resume all registered shortcuts */
  _setOnePauseFlag(keyString, value) {
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = 0; i < this._singleKey.length; ++i) {
        if (this._singleKey[i].keyString === keyString) {
          this._singleKey[i].pause = value;
        }
      }
    } else {
      for (let i = 0; i < this._multiKey.length; ++i) {
        if (this._multiKey[i].keyString === keyString) {
          this._multiKey[i].pause = value;
        }
      }
    }
  }


  /** @method
   * @name _shortcutAlreadyExist
   * @private
   * @memberof Shortcut
   * @description <blockquote>Internal method to test if a given key string isn't already related to a registered
   * shortcut.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event
   * @returns {boolean} - The existence state of given key string */
  _shortcutAlreadyExist(keyString) {
    // Parse single or multi shortcuts depending on modifiers count to find maching one
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = 0; i < this._singleKey.length; ++i) {
        if (this._singleKey[i].keyString === keyString) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < this._multiKey.length; ++i) {
        if (this._multiKey[i].keyString === keyString) {
          return true;
        }
      }
    }
    // False by default to allow the shortcut creation
    return false;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  SHORTCUT JS PUBLIC METHOD  -------------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are made to register shortcut, to remove them, or to pause/resume all shortcuts.          */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name register
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method is the entry point to register a shortcut. The caller must send the key
   * comibination as a string (ie. <code>F</code>, <code>Ctrl+shift+r</code>). The Shortcut singleton is case insensitive,
   * which means you can write it with the case you want. For modifiers, please use <code>ctrl</code>, <code>alt</code> and
   * <code>shift</code> strings. Then the given callback will be called each time the key stroke matches the shortcut key
   * string. For fine tuning on auto repeat, see constructor options.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event
   * @param {function} fire - The callback to attach to the shortcut */
  register(keyString, fire) {
    if (typeof keyString !== 'string' || typeof fire !== 'function') {
      return;
    }

    if (!this._shortcutAlreadyExist(keyString)) {
      // First shortcut to be registered ; listen to keyboard key down event
      if (this._singleKey.length === 0 && this._multiKey.length === 0) {
        this._addEvents();
      }
      // New shortcut internals
      const shortcut = {
        keyString: keyString,
        modifiers: { // Regex insensitive to string case to search for modifiers
          ctrlKey: /ctrl/i.test(keyString),
          altKey: /alt/i.test(keyString),
          shiftKey: /shift/i.test(keyString)
        },
        modifierCount: this._getModifiersCount(keyString),
        key: keyString.toLowerCase().replace('ctrl', '').replace('alt', '').replace('shift', '').replaceAll(' ', '').replaceAll('+', ''),
        paused: false,
        fire: fire
      };
      // Save shortcut to its appropriated array
      if (this._getModifiersCount(keyString) === 0) {
        this._singleKey.push(shortcut);
      } else {
        this._multiKey.push(shortcut);
      }
    }
  }


  /** @method
   * @name remove
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will remove a registered shortcut using its key string.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  remove(keyString) {
    if (typeof keyString !== 'string') {
      return;
    }
    // Reverse parsing to ensure proper slicing of shortcut arrays
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = this._singleKey.length - 1; i >= 0; i--) {
        if (this._singleKey[i].keyString === keyString) {
          this._singleKey.splice(i, 1);
        }
      }
    } else {
      for (let i = this._multiKey.length - 1; i >= 0; i--) {
        if (this._multiKey[i].keyString === keyString) {
          this._multiKey.splice(i, 1);
        }
      }
    }
    // In case there are no remaining shortcut, we remove listener on keyboard's event
    if (this._singleKey.length === 0 && this._multiKey.length === 0) {
      this._removeEvents();
    }
  }


  /** @method
   * @name removeAll
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will remove all registered shortcut events.</blockquote> */
  removeAll() {
    // Clear all saved shortcut
    this._singleKey = [];
    this._multiKey = [];
    // Remove listener on keyboard's key down
    this._removeEvents();
  }


  /** @method
   * @name pause
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will pause a registered shortcut using its key string. The
   * shortcut won't then fire the callback when the shortcut is used.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  pause(keyString) {
    if (typeof keyString !== 'string') {
      return;
    }

    this._setOnePauseFlag(keyString, true);
  }


  /** @method
   * @name resume
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will resume a registered shortcut using its key string. The
   * shortcut will then fire the callback when the shortcut is used.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  resume(keyString) {
    if (typeof keyString !== 'string') {
      return;
    }

    this._setOnePauseFlag(keyString, false);
  }


  /** @method
   * @name pauseAll
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will pause all registered shortcuts.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  pauseAll() {
    this._setAllPauseFlag(true);
  }


  /** @method
   * @name resumeAll
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will resume all registered shortcuts.</blockquote>
   * @param {string} keyString - The raw shortcut string that is defined when registering an event */
  resumeAll() {
    this._setAllPauseFlag(false);
  }


  /** @method
   * @name updateKeyEvent
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will update the singleton's listener for a given keyboard event.</blockquote>
   * @param {string} keyEvent - The key event to apply to the DOM listener in <code>keydown</code>, <code>keypress</code> and <code>keyup</code> */
  updateKeyEvent(keyEvent) {
    // Prevent wrong type or un-existing key event
    if (typeof keyEvent !== 'string' || (['keydown', 'keyup', 'keypress'].indexOf(keyEvent) === -1)) {
      keyEvent = 'keydown';
    }
    // Key event actual update
    this._removeEvents(); // Remove previous key event value and shortcut listener
    this._keyEvent = keyEvent; // Update private attribute
    this._addEvents(); // Restore shortcut listening with knew key event
  }


  /** @method
   * @name updateAutoRepeat
   * @public
   * @memberof Shortcut
   * @description <blockquote>This method will update the auto repeat flag that makes an event continuously callback
   * when the key is hed pushed.</blockquote>
   * @param {boolean} autoRepeat - The auto repeat state to set */
  updateAutoRepeat(autoRepeat) {
    // Prevent wrong type for input
    if (typeof autoRepeat !== 'boolean') {
      autoRepeat = true;
    }
    // Update private attribute
    this._autoRepeat = autoRepeat;
  }


}


export default Shortcut;
