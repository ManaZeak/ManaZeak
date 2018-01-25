/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  QueueEntry (sub) Class                         *
 *                                                 *
 *  A track entry un the queue                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class QueueEntry {

    constructor(track) {
        this.next     = null;
        this.previous = null;
        this.track    = track;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addNext (public)
     * class  : QueueEntry
     * desc   : append a new QueueEntry after this one
     * arg    : {type} other - the new entry
     **/
    addNext(other) {
        if (other == null) {
            return;
        }

        other.unlink();

        if (this.next) {
            this.next.previous = other;
            other.next         = this.next;
        }

        this.next              = other;
        other.previous         = this;
    }


    /**
     * method : addPrev (public)
     * class  : QueueEntry
     * desc   : append a new QueueEntry before this one
     * arg    : {type} other - the new entry
     **/
    addPrev(other) {
        if (other == null) {
            return;
        }

        other.unlink();

        if (this.previous) {
            this.previous.next = other;
            other.previous     = this.previous;
        }

        this.previous          = other;
        other.next             = this;
    }


    /**
     * method : moveNext (public)
     * class  : QueueEntry
     * desc   : change positions with the next QueueEntry if there is one
     **/
    moveNext() {
        let tmp_t;

        if (this.next) {
            tmp_t           = this.track;
            this.track      = this.next.track;
            this.next.track = tmp_t;
        }
    }


    /**
     * method : movePrev (public)
     * class  : QueueEntry
     * desc   : change positions with the previous QueueEntry if there is one
     **/
    movePrev() {
        let tmp_t;

        if (this.previous) {
            tmp_t               = this.track;
            this.track          = this.previous.track;
            this.previous.track = tmp_t;
        }
    }


    /**
     * method : unlink (public)
     * class  : QueueEntry
     * desc   : remove this entry from the list
     **/
    unlink() {
        if (this.previous) {
            this.previous.next = this.next;
        }

        if (this.next) {
            this.next.previous = this.previous;
        }

        this.previous          = null;
        this.next              = null;
    }

}


/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Queue Class                                    *
 *                                                 *
 *  Handle the user queue, with reorder and info   *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import Notification from '../utils/Notification.js'
import MzkObject from './MzkObject.js'

class Queue extends MzkObject {

    constructor(showNotificationOnAdd) {
        super();
        this.first   = null;
        this.last    = null;
        this.reverse = false;
        this.notif   = showNotificationOnAdd;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : dequeue (public)
     * class  : Queue
     * desc   : Remove an element in the queue
     * return : {object} The track to be played
     **/
    dequeue() {
        if (this.first == null) {
            return;
        }

        let tmp;

        if (this.reverse == true) {
            tmp            = this.last;
            this.last      = this.last.previous;

            if (this.last == null) {
                this.first = null;
            }
        }

        else {
            tmp            = this.first;
            this.first     = this.first.next;

            if (this.first == null) {
                this.last  = null;
            }
        }

        tmp.unlink();

        return tmp.track;
    }


    /**
     * method : enqueue (public)
     * class  : Queue
     * desc   : Append a new track in the queue
     * arg    : {object} track - The track to enqueue
     **/
    enqueue(track) {
        let newLink    = new QueueEntry(track);

        if (this.first == null) {
            this.first = newLink;
        }

        else {
            this.last.addNext(newLink);
        }

        this.last      = newLink;

        if (this.notif) {
            new Notification('INFO', 'Track added to Queue', track.title + 'was added to the queue');
        }
    }


    /**
     * method : isEmpty (public)
     * class  : Queue
     * desc   : Check queue emptiness
     * return : {bool}
     **/
    isEmpty() {
        return this.first == null;
    }


    /**
     * method : isReverse (public)
     * class  : Queue
     * desc   : Check is reverse status
     * return : {bool}
     **/
    isReverse() {
        return this.reverse;
    }


    /**
     * method : setReverse (public)
     * class  : Queue
     * desc   : Set reverse status
     * arg    : {bool} newReverse - Set reverse value
     **/
    setReverse(newReverse) {
        this.reverse = newReverse == true;
    }


    /**
     * method : slide (public)
     * class  : Queue
     * desc   : Move the nth element to another position in the queue
     * arg    : {int} element - the index of the track to move
     *          {int} newPos - the new desired index
     **/
    slide(element, newPos) {
        let link = this.first;
        let diff = newPos - element;

        for (; --element > 0 && link != null; link = link.next) {}

        if (link != null) {
            if (diff > 0) {
                for (; --diff > 0; link = link.next) {
                    link.moveNext();
                }
            }

            else {
                for (; ++diff < 0; link = link.previous) {
                    link.movePrev();
                }
            }
        }
    }

}

export default Queue