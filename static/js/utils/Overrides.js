/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  This file is for overriding vanilla JS *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

Event.prototype.stop = function() {
    this.stopPropagation();
    this.stopImmediatePropagation();
    this.preventDefault();
};


(function forceStop() {
    let addEvent = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(type, handler, options) {
        addEvent.call(this, type, function(event) {
            if (options !== true) {
                event.stop();
            }

            handler.apply(this, arguments);
        }, options);
    }
}());


//Disable default loading of dropped files
window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
},false);


window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
},false);
