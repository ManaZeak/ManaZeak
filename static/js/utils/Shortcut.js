/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  Shortcut class                         *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import MzkObject from '../core/MzkObject.js'

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

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : run (public)
     * class  : Shortcut
     * desc   : run the shortcut
     */
    run() {
        this.callback();
    }


    /**
     * method : getType (public)
     * class  : Shortcut
     * desc   : TODO
     */
    getType() {
        return this.eventType;
    }


    /**
     * method : getKey (public)
     * class  : Shortcut
     * desc   : TODO
     */
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

export default Shortcut