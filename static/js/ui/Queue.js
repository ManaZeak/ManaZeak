/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Queue class - handle the user current tracks queue                                 *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Queue = function() {
    this.queue = getById("queue");
    this.isVisible = false;
};

Queue.prototype = {

    addVisibilityLock: function() {
        if (!this.queue.className.match(/(?:^|\s)queueLocked(?!\S)/)) {
            this.queue.className += "queueLocked";
        }
    },


    removeVisibilityLock: function() {
        if (this.queue.className.match(/(?:^|\s)queueLocked(?!\S)/)) {
            this.queue.className = this.queue.className.replace(/(?:^|\s)queueLocked(?!\S)/g, '');
        }
    },


    toggleVisibilityLock: function() {
        if (!this.isVisible) {
            this.isVisible = !this.isVisible;
            this.addVisibilityLock();
        } else {
            this.isVisible = !this.isVisible;
            this.removeVisibilityLock();
        }
    }
};
