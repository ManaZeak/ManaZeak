/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistView - Abstract view for the playlists' views                              *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let PlaylistView = function(data) {
    View.call(this, data);
};

PlaylistView.prototype = {

    getEntryById: function(id) {
        return null;
    },

    getFirstEntry: function() {
        return null;
    },


    getNextEntry: function() {
        return null;
    },


    getPreviousEntry: function() {
        return null;
    },

    isLastEntry: function() {
        return true;
    },

    setSelected: function(track) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) { //  Un-selecting all
                this.entries[i].setIsSelected(false);
            }
            if (this.entries[i].track.id.track === track.id.track) { // Selecting the one
                this.entries[i].setIsSelected(true);
            }
        }
    },


    unSelectAll: function() {
        this.entriesSelected = {};

        for (let i = 0; i < this.entries.length ;++i) {
            if (this.entries[i].getIsSelected()) {
                this.entries[i].setIsSelected(false);
            }
        }
    }
};

extendClass(View, PlaylistView);
