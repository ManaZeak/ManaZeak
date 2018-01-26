/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  MzkListener class                      *
 *                                         *
 *  Class for handling app event listeners *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class MzkListener {

    constructor(name, description, callback, thisArg) {
        this.name     = name;
        this.desc     = description;
        this.callback = callback;
        this.thisArg  = thisArg;
        this.active   = true;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : runCallback (public)
     * class  : MzkListener
     * desc   : Run the callback
     * arg    : {array} args - the arguments to be applied to the callback
     **/
    runCallback(args) {
        if (this.active == true) {
            this.callback.apply(this.thisArg, args);
        }
    }


    /**
     * method : setActive (public)
     * class  : MzkListener
     * desc   : Set whether the callback should be run
     * arg    : {bool} active - the new state
     **/
    setActive(active) {
        this.active = active;
    }

}

export default MzkListener