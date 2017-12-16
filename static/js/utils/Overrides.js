/*

    This file is for overriding vanilla JS

 */

Event.prototype.stop = function() {
  this.stopPropagation();
  this.stopImmediatePropagation();
  this.preventDefault();
};

(function forceStop() {
    var addEvent = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(type, handler, options)
    {
        addEvent.call(this, type, function(event) {
            handler.apply(this, arguments);
            event.stop();
        }, options);
    }
}());