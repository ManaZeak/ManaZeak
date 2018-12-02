'use strict';

class Shortcut {
  /**
   * @summary Basic keyboard Shortcut handler
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handler callbacks set on keyboard bindings
   **/
  constructor() {
    this._singleKey = [];
    this._multiKey = [];

    this._testShortcuts = this._testShortcuts.bind(this);
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _addEvents
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add key down and key press events to the DOM
   **/
  _addEvents() {
    document.addEventListener('keydown', this._testShortcuts);
    document.addEventListener('keypress', this._testShortcuts);
  }

    /**
     * @method
     * @name register
     * @public
     * @memberof Shortcut
     * @author Arthur Beaulieu
     * @since September 2018
     * @description Register a new shortcut and bind it to a callback
     * @param {string} keyString - The keys string
     * @param {function} fire - The shortcut callback to trigger
     **/
    register(keyString, fire) {
      const shortcut = {
        keyString: keyString,
        modifiers: {
          ctrlKey: /ctrl/i.test(keyString),
          altKey: /alt/i.test(keyString),
          shiftKey: /shift/i.test(keyString)
        },
        modifierCount: this._getModifiersCount(keyString),
        key: keyString.substr(keyString.lastIndexOf('+') + 1).toLowerCase(),
        paused: false,
        fire: fire
      };

      if (this._singleKey.length === 0 || this._multiKey.length === 0) {
        this._addEvents();
      }

      if (!shortcut.modifiers.ctrlKey && !shortcut.modifiers.shiftKey && !shortcut.modifiers.altKey && !shortcut.modifiers.metaKey) {
        this._singleKey.push(shortcut);
      } else {
        this._multiKey.push(shortcut);
      }
    }

  /**
   * @method
   * @name _removeEvents
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Remove key down and key press events to the DOM
   **/
  _removeEvents() {
    document.removeEventListener('keydown', this._testShortcuts);
    document.removeEventListener('keypress', this._testShortcuts);
  }

  /**
   * @method
   * @name _testShortcuts
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Test keyboard event to fire stored shortcut accordingly
   * @param {object} event - The Keyboard event from this._addEvents()
   **/
  _testShortcuts(event) {
    if (!(event.ctrlKey && event.shiftKey && event.key === 'R')) { // DEVELOPEMENT test to keep hard refresh available
      event.preventDefault(); // This is for PRODUCTION only, to prevent that browser shortcuts collide with user one
    }

    if (event.ctrlKey || event.altKey || event.shiftKey) { // Multi key shortcut
      this._multiKeyTest(event);
    } else { // Single key shortcut
      this._singleKeyTest(event);
    }
  }

  _singleKeyTest(event) {
    for (let i = 0; i < this._singleKey.length; ++i) {
      const shortcut = this._singleKey[i];

      if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
        shortcut.fire(this);
        return;
      }
    }
  }

  _multiKeyTest(event) {
    for (let i = 0; i < this._multiKey.length; ++i) {
      const shortcut = this._multiKey[i];

      if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
        if (shortcut.modifierCount === 1 && this._singleModifierTrigger(event, shortcut) === true) {
          return;
        } else if (shortcut.modifierCount === 2 && this._doubleModifiersTrigger(event, shortcut) === true) {
          return;
        } else if (shortcut.modifierCount === 3 && this._tripleModifiersTrigger(event, shortcut) === true) {
          return;
        }
      }
    }
  }

  _singleModifierTrigger(event, shortcut) {
    if ((shortcut.modifiers.ctrlKey && event.ctrlKey) ||
        (shortcut.modifiers.altKey && event.altKey) ||
        (shortcut.modifiers.shiftKey && event.shiftKey)) {
      shortcut.fire();
      return true;
    }

    return false;
  }

  _doubleModifiersTrigger(event, shortcut) {
    if ((shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.altKey && event.altKey) ||
        (shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.shiftKey && event.shiftKey) ||
        (shortcut.modifiers.altKey && event.altKey && shortcut.modifiers.shiftKey && event.shiftKey)) {
      shortcut.fire();
      return true;
    }

    return false;
  }

  _tripleModifiersTrigger(event, shortcut) {
    if ((shortcut.modifiers.ctrlKey && event.ctrlKey &&
        shortcut.modifiers.altKey && event.altKey &&
        shortcut.modifiers.shiftKey && event.shiftKey)) {
      shortcut.fire();
      return true;
    }

    return false;
  }

  /**
   * @method
   * @name _getModifiersCount
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Count the amount of modifiers in given shortcut binding
   * @param {string} keyString - The keys string
   * @return {number} - The number of modifiers in the keys string
   **/
  _getModifiersCount(keyString) {
    let count = 0;
    const modifiers = {
      ctrlKey: /ctrl/i.test(keyString),
      altKey: /alt/i.test(keyString),
      shiftKey: /shift/i.test(keyString)
    };

    if (modifiers.ctrlKey) ++count;
    if (modifiers.altKey) ++count;
    if (modifiers.shiftKey) ++count;

    return count;
  }

  /**
   * @method
   * @name _setAllPauseFlag
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause/Resume all shortcuts currently registered
   * @param {boolean} value - The pause value to set
   **/
  _setAllPauseFlag(value) {
    for (let i = 0; i < this._singleKey.length; ++i) {
      this._setOnePauseFlag(this._singleKey[i].keyString, value);
    }

    for (let i = 0; i < this._multiKey.length; ++i) {
      this._setOnePauseFlag(this._multiKey[i].keyString, value);
    }
  }

  /**
   * @method
   * @name _setOnePauseFlag
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause/Resume given shortcuts currently registered
   * @param {string} keyString - The keys string
   * @param {boolean} value - The pause value to set
   **/
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

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name unregister
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description UnRegister a shortcut via its keys string
   * @param {string} keyString - The keys string
   **/
  unregister(keyString) {
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = this._singleKey.length - 1; i >= 0; i--) {
        if (this._singleKey[i].key === keyString.toLowerCase()) {
          this._singleKey.splice(i, 1);
        }
      }
    } else {
      for (let i = this._multiKey.length - 1; i >= 0; i--) {
        if (this._multiKey[i].key === keyString.toLowerCase()) {
          this._multiKey.splice(i, 1);
        }
      }
    }

    if (this._singleKey.length === 0 && this._multiKey.length === 0) {
      this._removeEvents();
    }
  }

  /**
   * @method
   * @name unregisterAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Unregister every active shortcut
   **/
  unregisterAll() {
    this._singleKey = [];
    this._multiKey = [];
    this._removeEvents();
  }

  /**
   * @method
   * @name resume
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Resume the given shortcut callback
   * @param {string} keyString - The keys string
   **/
  resume(keyString) {
    this._setOnePauseFlag(keyString, false);
  }

  /**
   * @method
   * @name pause
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause the given shortcut callback
   * @param {string} keyString - The keys string
   **/
  pause(keyString) {
    this._setOnePauseFlag(keyString, true);
  }

  /**
   * @method
   * @name resumeAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Resume all shortcuts callback
   **/
  resumeAll() {
    this._addEvents();
    this._setAllPauseFlag(false);
  }


  /**
   * @method
   * @name pauseAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause all shortcuts callback
   **/
  pauseAll() {
    this._removeEvents();
    this._setAllPauseFlag(true);
  }
}

export default Shortcut;
