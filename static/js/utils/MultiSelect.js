/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  MultiSelect class                              *
 *                                                 *
 *  A class that handles selecting items ala OS    *
 *                                                 *
 *                                                 *
 *                                                 *
 *                                                 *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import MzkObject from '../core/MzkObject.js'

class MultiSelect extends MzkObject {

    constructor(purgeThreshold) {
        super();
        this.selection = {};
        this.size = 0;
        this.maxSize = 0;
        this.purgeThreshhold = purgeThreshold ? purgeThreshold : 25;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : add (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    add(value, append) {
        if (append == false) {
            if (this.size == 1 && this.selection[value] == true) {
                this.clear();
                return false;
            }

            else {
                this.clear();
                this.selection[value]     = true;
                this.size                 = 1;
                this.maxSize              = 1;
            }
        }

        else {
            if (this.selection[value] != null) {
                if (this.selection[value]) {
                    this.selection[value] = false;
                    --this.size;
                }

                else {
                    this.selection[value] = true;
                    ++this.size;
                }
            }

            else {
                this.selection[value]     = true;
                ++this.size;
                ++this.maxSize;
            }
        }

        if (this.maxSize - this.size > this.purgeThreshhold) {
            let that = this;
            window.setTimeout(function() {
                that.purge();
            }, 0);
        }

        return this.selection[value];
    }


    /**
     * method : addBulk (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    addBulk(values, append) {
        for (let i = 0; i < values.length; ++i) {
            this.add(values[i], append | i != 0);
        }
    }


    /**
     * method : clear (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    clear() {
        this.selection = {};
        this.size      = 0;
        this.maxSize   = 0;
    }


    /**
     * method : get (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    get() {
        let result = new Array(this.size);
        let ix = 0;
        for (let i in this.selection)
            if (this.selection[i])
                result[ix++] = i;

        return result;
    }


    /**
     * method : getSize (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    getSize() {
        return this.size;
    }


    /**
     * method : purge (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    purge() {
        for (let i in this.selection) {
            if (this.selection[i] == false) {
                delete this.selection[i];
            }
        }
        this.maxSize = this.size;
    }

}

export default MultiSelect