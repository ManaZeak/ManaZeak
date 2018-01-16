

class MzkObject {
    constructor() {

        this.listeners = {};
        var isPrivate = function(propName) {
            return propName[0] == '_';
        };

        var properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
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


    /**
     * method : listen (public)
     * class  : MzkObject
     * desc   : Add listener on a function
     * arg    : {string} event - the function to listen to
     *        : {function} callback
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
}