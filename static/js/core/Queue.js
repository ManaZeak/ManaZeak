/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Queue class - handle the user current tracks queue                                 *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let QueueEntry = function(track) {
    this.next = null;
    this.previous = null;
    this.track = track;
};

QueueEntry.prototype = {

    addNext: function(other) {
        if (other == null) { return; }

        other.unlink();

        if (this.next) {
            this.next.previous = other;
            other.next = this.next;
        }

        this.next = other;
        other.previous = this;
    },


    addPrev: function(other) {
        if(other == null) { return; }

        other.unlink();

        if(this.previous) {
            this.previous.next = other;
            other.previous = this.previous;
        }

        this.previous = other;
        other.next = this;
    },


    moveNext: function() {
        let tmp_t;

        if (this.next) {
            tmp_t = this.track;
            this.track = this.next.track;
            this.next.track = tmp_t;
        }
    },


    movePrev: function() {
        let tmp_t;

        if (this.previous) {
            tmp_t = this.track;
            this.track = this.previous.track;
            this.previous.track = tmp_t;
        }
    },


    unlink: function() {
        if (this.previous) { this.previous.next = this.next;     }
        if (this.next)     { this.next.previous = this.previous; }

        this.previous = null;
        this.next = null;
    }
};

//========================================================================================

let Queue = function() {
    this.first = null;
    this.last = null;
    this.reverse = false;
};


Queue.prototype = {
    // TODO : add text saying that queue is empty when no track is loaded. Use same size as LI item, and put text at the center, same font as Track title in LI
    // TODO : ? Add notif when track has been added ? To discuss if useful or not
    enqueue: function(track) {
        let newLink = new QueueEntry(track);

        if (this.first == null) { this.first = newLink;       }
        else                    { this.last.addNext(newLink); }

        this.last = newLink;
    },


    dequeue: function() {
        if (this.first == null) { return; }

        let tmp;

        if (this.reverse == true) {
            tmp = this.last;
            this.last = this.last.previous;

            if (this.last == null) { this.first = null; }
        }

        else {
            tmp = this.first;
            this.first = this.first.next;

            if (this.first == null) { this.last = null; }
        }

        tmp.unlink();

        return tmp.track;
    },


    slide: function(element, newPos) {
        let link = this.first;
        let diff = newPos - element;

        for (;element-- > 0 && link != null; link = link.next) {}

        if (link != null) {
            if(diff > 0) {
                for(; diff-- > 0; link = link.next) {
                    link.moveNext();
                }
            }

            else {
                for (; diff++ < 0; link = link.previous) {
                    link.movePrev();
                }
            }
        }
    },


    isEmpty: function() {
        return this.first == null;
    },


    setReverse: function(newReverse) {
        this.reverse = newReverse == true;
    },


    isReverse: function () {
        return this.reverse;
    }
};
