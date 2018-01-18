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
        let isPrivate = function(propName) {
            return propName[0] == '_';
        };

        let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (let i = 0; i < properties.length; ++i) {
            if (typeof this[properties[i]] === "function" && isPrivate(properties[i]) == false) {
                this.listeners[properties[i]] = [];

                let oldFunc = this[properties[i]];
                this[properties[i]] = (function(pname, func) {
                    return function() {
                        let r = func.apply(this, arguments);
                        for (let i = 0; i < this.listeners[pname].length; ++i) {
                            this.listeners[pname][i].runCallback(arguments);
                        }
                        return r;
                    }
                }(properties[i], oldFunc));
            }
        }
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
                if (this.listeners[event[i]]) {
                    this.listeners[event[i]].push(new MzkListener('', '', callback, thisArg));
                }
            }
        }

        else if (this.listeners[event]) {
            this.listeners[event].push(new MzkListener('', '', callback, thisArg));
        }
    }

    addShortcut(shortcut) {
        window.app.getShortcutMaestro().registerShortcut(shortcut, this);
    }

    removeShortcut(shortcut) {
        window.app.getShortcutMaestro().registerShortcut(shortcut, this);
    }

    lockShortcuts() {
        window.app.getShortcutMaestro().lock(this);
    }

    unlockShortcurts() {
        window.app.getShortcutMaestro().unlock(this);
    }

}