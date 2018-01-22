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

class MultiSelect extends MzkObject {
    constructor(purgeThreshold) {
        super();
        this.selection = {};
        this.size = 0;
        this.maxSize = 0;
        this.purgeThreshhold = purgeThreshold ? purgeThreshold : 25;
    }

    add(value, append) {
        if(append == false) {
            if(this.size == 1 && this.selection[value] == true) {
                this.clear();
                return false;
            } else {
                this.clear();
                this.selection[value] = true;
                this.size = 1;
                this.maxSize = 1;
            }
        } else {
            if(this.selection[value] != null) {
                if(this.selection[value]) {
                    this.selection[value] = false;
                    this.size--;
                } else {
                    this.selection[value] = true;
                    this.size++;
                }
            } else {
                this.selection[value] = true;
                this.size++;
                this.maxSize++;
            }
        }

        if(this.maxSize - this.size > this.purgeThreshhold)
        {
            let that = this;
            window.setTimeout(function() {
                that.purge();
            }, 0);
        }

        return this.selection[value];
    }

    addBulk(values, append) {
        for(let i = 0; i < values.length; ++i)
            this.add(values[i], append | i != 0);
    }

    get() {
        let result = new Array(this.size);
        let ix = 0;
        for(var i in this.selection)
            if(this.selection[i])
                result[ix++] = i;
        return result;
    }

    getSize() {
        return this.size;
    }

    purge() {
        for(let i in this.selection)
            if(this.selection[i] == false)
                delete this.selection[i];
        this.maxSize = this.size;
    }

    clear() {
        this.selection = {};
        this.size = 0;
        this.maxSize = 0;
    }
}