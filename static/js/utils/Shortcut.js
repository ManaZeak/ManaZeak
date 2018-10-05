'use_strict';

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
    if (!(event.ctrlKey && event.shiftKey && event.key === 'R')) {
      event.preventDefault();
    }

    if (event.ctrlKey || event.altKey || event.shiftKey) { // Multi key shortcut
      for (let i = 0; i < this._multiKey.length; ++i) {
        let shortcut = this._multiKey[i];

        if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
          switch (shortcut.modifierCount) {
            case 1:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey)
              || (shortcut.modifiers.altKey && event.altKey)
              || (shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
            case 2:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.altKey && event.altKey)
              || (shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.shiftKey && event.shiftKey)
              || (shortcut.modifiers.altKey && event.altKey && shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
            case 3:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey
              && shortcut.modifiers.altKey && event.altKey
              && shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
          }
        }
      }
    }

    else { // Single key shortcut
      for (let i = 0; i < this._singleKey.length; ++i) {
        let shortcut = this._singleKey[i];

        if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
          shortcut.fire(this);
          return;
        }
      }
    }
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
    let modifiers = {
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
      this._setPauseStatus(this._singleKey[i].keyString, value);
    }

    for (i = 0; i < this._multiKey.length; ++i) {
      this._setPauseStatus(this._multiKey[i].keyString, value);
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
    }

    else {
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
    let shortcut = {
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

    (!shortcut.modifiers.ctrlKey && !shortcut.modifiers.shiftKey && !shortcut.modifiers.altKey && !shortcut.modifiers.metaKey) ?
      this._singleKey.push(shortcut):
      this._multiKey.push(shortcut);
  }

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
    }

    else {
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
    this._setAllPauseFlag(true);
  }
}

export default Shortcut;
