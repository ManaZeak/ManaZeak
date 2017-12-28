/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  AppListener class                      *
 *                                         *
 *  Class for handling app event listeners *
 *                                         *
 *                                         *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class AppListener {
    constructor(name, description, callback, thisArg) {
        this.name = name;
        this.desc = description;
        this.callback = callback;
        this.thisArg = thisArg;
        this.active = true;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : setActive (public)
     * class  : AppListener
     * desc   : Set whether the callback should be run
     * arg    : {bool} active - the new state
     **/
    setActive(active) {
        this.active = active;
    }


    /**
     * method : runCallback (public)
     * class  : AppListener
     * desc   : Run the callback
     * arg    : {array} args - the arguments to be applied to the callback
     **/
    runCallback(args) {
        if(this.active == true)
            this.callback.apply(this.thisArg, args);
    }

}
