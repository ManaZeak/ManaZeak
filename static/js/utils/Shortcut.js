class Shortcut {
  /* Usefull keys :
    ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  */
  constructor() {
    this._singleKey = [];
    this._multiKey = [];

    this._testShortcuts = this._testShortcuts.bind(this);
  }

  _addEvents() {
    document.addEventListener('keydown', this._testShortcuts);
    document.addEventListener('keypress', this._testShortcuts);
  }

  _removeEvents() {
    document.removeEventListener('keydown', this._testShortcuts);
    document.removeEventListener('keypress', this._testShortcuts);
  }

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

  _setAllPauseFlag(value) {
    for (let i = 0; i < this._singleKey.length; ++i) {
      this._setPauseStatus(this._singleKey[i].keyString, value);
    }

    for (i = 0; i < this._multiKey.length; ++i) {
      this._setPauseStatus(this._multiKey[i].keyString, value);
    }
  }

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

  remove(keyString) {
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

  resume(keyString) {
    this._setOnePauseFlag(keyString, false);
  }

  pause(keyString) {
    this._setOnePauseFlag(keyString, true);
  }

  removeAll() {
    this._singleKey = [];
    this._multiKey = [];
    this._removeEvents();
  }

  resumeAll() {
    this._setAllPauseFlag(false);
  }

  pauseAll() {
    this._setAllPauseFlag(true);
  }
}

export default Shortcut;
