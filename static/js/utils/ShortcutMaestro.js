/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ShortcutMaestro class                  *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import MzkObject from '../core/MzkObject.js'

class ShortcutMaestro extends MzkObject {

    constructor() {

        super();

        if (window.debug) {
            console.log('  ShortcutMaestro construction');
        }

        this.shortcuts  = {
            keydown:  {},
            keyup:    {},
            keypress: {}
        };
        this.stack      = [];
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : lock (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    lock(sourceObject) {
        if (window.debug) {
            console.log('  ShortcutMaestro : lock call');
        }

        this.stack.push(sourceObject);
    }


    /**
     * method : registerShortcut (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    registerShortcut(shortcut, sourceObject) {
        if (window.debug) {
            console.log('  ShortcutMaestro : registerShortcut call');
        }

        let type = shortcut.getType();
        let key  = shortcut.getKey();

        if (this.shortcuts[type] == null) {
            return;
        }

        if (this.shortcuts[type][key] == null) {
            this.shortcuts[type][key] = [];
        }

        this.shortcuts[type][key].push({
            src:   sourceObject,
            short: shortcut
        });
    }


    /**
     * method : unlock (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    unlock(sourceObject) {
        if (window.debug) {
            console.log('  ShortcutMaestro : unlock call');
        }

        for (let i = this.stack.length; i >= 0; --i) {
            if (this.stack[i] == sourceObject) {
                this.stack.splice(i, 1);
            }
        }
    }


    /**
     * method : unregisterShortcut (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    unregisterShortcut(shortcut) {
        if (window.debug) {
            console.log('  ShortcutMaestro : unregisterShortcut call');
        }

        let type = shortcut.getType();
        let key  = shortcut.getKey();
        if (this.shortcuts[type] != null && this.shortcuts[type][key] != null) {
            for (let i = this.shortcuts[type][key].length; i >= 0; --i) {
                if (this.shortcuts[type][key][i].short == shortcut) {
                    this.shortcuts[type][key].splice(i, 1);
                }
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : ShortcutMaestro
     * desc   : ShortcutMaestro event listener
     */
    _eventListener() {
        if (window.debug) {
            console.log('  ShortcutMaestro : _eventListener call');
        }

        document.addEventListener('keydown', this._relay.bind(this));
        document.addEventListener('keyup', this._relay.bind(this));
        document.addEventListener('keypress', this._relay.bind(this));
    }


    /**
     * method : _relay (private)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    _relay(event) {
        if (window.debug) {
            console.log('  ShortcutMaestro : _relay call');
        }

        let fireable = this.shortcuts[event.type][event.code];
        if (fireable != null) {
            for (let i = 0; i < fireable.length; ++i) {
                if (this._canRun(fireable[i], event)) {
                    fireable[i].short.run();
                }
            }
        }
    }


    /**
     * method : _canRun (private)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    _canRun(shortcutCapsule, event) {
        if (window.debug) {
            console.log('  ShortcutMaestro : _canRun call');
        }

        let blocked = this.stack.length == 0 ? false : this.stack[this.stack.length - 1] != shortcutCapsule.src;
        return !blocked && shortcutCapsule.short.modifiersOK(event);
    }

}

export default ShortcutMaestro