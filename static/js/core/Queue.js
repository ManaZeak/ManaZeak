/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  QueueEntry (sub) Class                         *
 *                                                 *
 *  A track entry un the queue                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let QueueEntry = function(track) {

    this.next     = null;
    this.previous = null;
    this.track    = track;
};


QueueEntry.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addNext (public)
     * class  : QueueEntry
     * desc   : TODO
     * arg    : {type} other - TODO
     **/
    addNext: function(other) {
        if (other == null) { return; }

        other.unlink();

        if (this.next) {
            this.next.previous = other;
            other.next         = this.next;
        }

        this.next      = other;
        other.previous = this;
    },


    /**
     * method : addPrev (public)
     * class  : QueueEntry
     * desc   : TODO
     * arg    : {type} other - TODO
     **/
    addPrev: function(other) {
        if (other == null) { return; }

        other.unlink();

        if (this.previous) {
            this.previous.next = other;
            other.previous     = this.previous;
        }

        this.previous = other;
        other.next    = this;
    },


    /**
     * method : moveNext (public)
     * class  : QueueEntry
     * desc   : TODO
     **/
    moveNext: function() {
        let tmp_t;

        if (this.next) {
            tmp_t           = this.track;
            this.track      = this.next.track;
            this.next.track = tmp_t;
        }
    },


    /**
     * method : movePrev (public)
     * class  : QueueEntry
     * desc   : TODO
     **/
    movePrev: function() {
        let tmp_t;

        if (this.previous) {
            tmp_t               = this.track;
            this.track          = this.previous.track;
            this.previous.track = tmp_t;
        }
    },


    /**
     * method : unlink (public)
     * class  : QueueEntry
     * desc   : TODO
     **/
    unlink: function() {
        if (this.previous) { this.previous.next = this.next;     }
        if (this.next)     { this.next.previous = this.previous; }

        this.previous = null;
        this.next     = null;
    }

};


/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Queue Class                                    *
 *                                                 *
 *  Handle the user queue, with reorder and info   *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let Queue = function() {

    this.first   = null;
    this.last    = null;
    this.reverse = false;
};


Queue.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //
    // TODO : add text saying that queue is empty when no track is loaded. Use same size as LI item, and put text at the center, same font as Track title in LI
    // TODO : Add notif when track has been added - This should be a user option (enable/disable)

    /**
     * method : dequeue (public)
     * class  : Queue
     * desc   : Remove an element in the queue
     * return : {object} TODO
     **/
    dequeue: function() {
        if (this.first == null) { return; }

        let tmp;

        if (this.reverse == true) {
            tmp       = this.last;
            this.last = this.last.previous;

            if (this.last == null) { this.first = null; }
        }

        else {
            tmp        = this.first;
            this.first = this.first.next;

            if (this.first == null) { this.last = null; }
        }

        tmp.unlink();

        return tmp.track;
    },


    /**
     * method : enqueue (public)
     * class  : Queue
     * desc   : Append a new track in the queue
     * arg    : {object} track - The track to enqueue
     **/
    enqueue: function(track) {
        let newLink = new QueueEntry(track);

        if (this.first == null) { this.first = newLink;       }
        else                    { this.last.addNext(newLink); }

        this.last = newLink;
    },


    /**
     * method : isEmpty (public)
     * class  : Queue
     * desc   : Check queue emptiness
     * return : {bool}
     **/
    isEmpty: function() {
        return this.first == null;
    },


    /**
     * method : isReverse (public)
     * class  : Queue
     * desc   : Check is reverse status
     * return : {bool}
     **/
    isReverse: function () {
        return this.reverse;
    },


    /**
     * method : setReverse (public)
     * class  : Queue
     * desc   : Set reverse status
     * arg    : {bool} newReverse - Set reverse value
     **/
    setReverse: function(newReverse) {
        this.reverse = newReverse == true;
    },


    /**
     * method : slide (public)
     * class  : Queue
     * desc   : TODO
     * arg    : {int} element - TODO
     *          {int} newPos - TODO
     **/
    slide: function(element, newPos) {
        let link = this.first;
        let diff = newPos - element;

        for (;element-- > 0 && link != null; link = link.next) {}

        if (link != null) {
            if (diff > 0) {
                for (; diff-- > 0; link = link.next) {
                    link.moveNext();
                }
            }

            else {
                for (; diff++ < 0; link = link.previous) {
                    link.movePrev();
                }
            }
        }
    }

};
