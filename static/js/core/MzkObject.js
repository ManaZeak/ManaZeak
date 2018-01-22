/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  MzkObject class                      *
 *                                         *
 *  TODO *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class MzkObject {

    constructor() {

        this.listeners = {};
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : listen (public)
     * class  : MzkObject
     * desc   : Add listener on a function
     * arg    : {string} event - the function to listen to
     *        : {function} callback - The function to callback
     *        : {} thisArg - TODO
     **/
    listen(event, callback, thisArg) {

        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; ++i) {
                if (this.listeners[event[i]] || this._hijackMethod(event[i]) == true) {
                    this.listeners[event[i]].push(new MzkListener('', '', callback, thisArg));
                }
            }
        }

        else if (this.listeners[event] || this._hijackMethod(event) == true) {
            this.listeners[event].push(new MzkListener('', '', callback, thisArg));
        }
    }

    addShortcut(shortcut) {
        window.app.getShortcutMaestro().registerShortcut(shortcut, this);
    }

    removeShortcut(shortcut) {
        window.app.getShortcutMaestro().unregisterShortcut(shortcut, this);
    }

    lockShortcuts() {
        window.app.getShortcutMaestro().lock(this);
    }

    unlockShortcurts() {
        window.app.getShortcutMaestro().unlock(this);
    }

    /**
     * method : _hijackMethod (private)
     * class  : MzkObject
     * desc   : Surround a method with the event handling code
     * arg    : {string} method - the name of the function to 'hijack'
     **/
    _hijackMethod(method) {
        if (typeof this[method] === "function" && method[0] !== '_') {
            this.listeners[method] = [];

            let oldFunc = this[method];
            this[method] = (function (pname, func) {
                return function () {
                    let r = func.apply(this, arguments);
                    for (let i = 0; i < this.listeners[pname].length; ++i) {
                        this.listeners[pname][i].runCallback(arguments);
                    }
                    return r;
                }
            }(method, oldFunc));
            return true;
        }
        return false;
    }
}