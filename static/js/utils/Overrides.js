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
            handler.apply(this, arguments);
            if (options !== true)
                event.stop();
        }, options);
    }
}());
