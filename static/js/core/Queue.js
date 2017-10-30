/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Queue class - handle the user current tracks queue                                 *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Queue = function() {
    this.queue = document.getElementById("queue");
    this.isVisible = false;
};

Queue.prototype = {

    addVisibilityLock: function() {
        this.queue.classList.add("queueLocked");
    },


    removeVisibilityLock: function() {
        this.queue.classList.remove("queueLocked");
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
