/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Queue class - handle the user current tracks queue                                 *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var QueueEntry = function(track) {
    this.next = null;
    this.previous = null;
    this.track = track;
};

QueueEntry.prototype = {

    addNext: function(other) {
        if(other == null)
            return;

        other.unlink();
        if(this.next) {
            this.next.previous = other;
            other.next = this.next;
        }
        this.next = other;
        other.previous = this;
    },

    addPrev: function(other) {
        if(other == null)
            return;

        other.unlink();
        if(this.previous) {
            this.previous.next = other;
            other.previous = this.previous;
        }
        this.previous = other;
        other.next = this;
    },

    moveNext: function() {
        var tmp_t;
        if(this.next)
        {
            tmp_t = this.track;
            this.track = this.next.track;
            this.next.track = tmp_t;
        }
    },

    movePrev: function() {
        var tmp_t;
        if(this.previous)
        {
            tmp_t = this.track;
            this.track = this.previous.track;
            this.previous.track = tmp_t;
        }
    },

    unlink: function() {
        if(this.previous)
            this.previous.next = this.next;
        if(this.next)
            this.next.previous = this.previous;
        this.previous = null;
        this.next = null;
    }
};

//========================================================================================

var Queue = function() {
    this.first = null;
    this.last = null;
    this.reverse = false;
};

Queue.prototype = {

    enqueue: function(track) {
        var newLink = new QueueEntry(track);

        if(this.first == null)
            this.first = newLink;
        else
            this.last.addNext(newLink);

        this.last = newLink;
    },

    dequeue: function() {
        if(this.first == null)
            return;

        var tmp;
        if (this.reverse == true) {
            tmp = this.last;
            this.last = this.last.previous;
            if(this.last == null)
                this.first = null;
        } else {
            tmp = this.first;
            this.first = this.first.next;
            if(this.first == null)
                this.last = null;
        }
        tmp.unlink();
        return tmp.track;
    },

    isEmpty: function() {
        return this.first == null;
    },

    setReverse: function(newReverse) {
        this.reverse = newReverse == true;
    }

};
