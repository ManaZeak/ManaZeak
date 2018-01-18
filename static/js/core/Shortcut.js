/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  Shortcut class                         *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class Shortcut extends MzkObject {
    constructor(eventType, key, callback, ctrl, shift, alt, meta) {
        super();
        this.eventType  = eventType;
        this.key        = key;
        this.callback   = callback;
        this.ctrl       = ctrl;
        this.shift      = shift;
        this.alt        = alt;
        this.meta       = meta;
    }

    /**
     * method : run (public)
     * class  : Shortcut
     * desc   : run the shortcut
     *
     */
    run() {
        this.callback();
    }

    getType() {
        return this.eventType;
    }

    getKey() {
        return this.key;
    }

    /**
     * method : modifiersOK (public)
     * class  : Shortcut
     * desc   : Check whether the event complies with the modifier keys
     * args   : event
     */
    modifiersOK(event) {
        return  (this.ctrl  == null || this.ctrl  == event.ctrlKey) &&
                (this.shift == null || this.shift == event.shiftKey) &&
                (this.alt   == null || this.alt   == event.altKey) &&
                (this.meta  == null || this.meta  == event.metaKey);
    }
}

/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ShortcutMaestro class                  *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */
class ShortcutMaestro extends MzkObject {
    constructor() {
        super();
        this.shortcuts  = {
            keydown:  {},
            keyup:    {},
            keypress: {}
        };
        this.stack      = [];
        this._eventListener();
    }

    registerShortcut(shortcut, sourceObject) {

        let type = shortcut.getType();
        let key = shortcut.getKey();

        if(this.shortcuts[type] == null)
            return;

        if(this.shortcuts[type][key] == null)
            this.shortcuts[type][key] = [];

        this.shortcuts[type][key].push({
            src:   sourceObject,
            short: shortcut
        });
    }

    unregisterShortcut(shortcut) {

        let type = shortcut.getType();
        let key = shortcut.getKey();
        if (this.shortcuts[type] != null && this.shortcuts[type][key] != null)
            for (let i = this.shortcuts[type][key].length; i >= 0; --i)
                if (this.shortcuts[type][key][i].short == shortcut)
                    this.shortcuts[type][key].splice(i, 1);
    }

    _eventListener() {
        document.addEventListener('keydown', this._relay.bind(this));
        document.addEventListener('keyup', this._relay.bind(this));
        document.addEventListener('keypress', this._relay.bind(this));
    }

    _relay(event) {
        let fireable = this.shortcuts[event.type][event.code];
        if(fireable != null) {
            event.stop();
            for (let i = 0; i < fireable.length; ++i)
                if (this._canRun(fireable[i], event))
                    fireable[i].short.run();
        }
    }

    _canRun(shortcutCapsule, event) {
        let blocked = this.stack.length == 0 ? false : this.stack[this.stack.length - 1] != shortcutCapsule.src;
        return !blocked && shortcutCapsule.short.modifiersOK(event);
    }

}