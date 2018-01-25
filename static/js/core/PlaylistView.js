/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  PlaylistView class                     *
 *                                         *
 *  Abstract view for the playlists' views *
 *                                         *
 *  data : {int} Playlist ID in db         *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import View from './View.js'

class PlaylistView extends View {

    constructor() {
        super();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getEntryById (public)
     * class  : PlaylistView
     * desc   : Return an entry for a given id
     * arg    : {int} id - A function argument
     * return : {object} A view entry
     **/
    getEntryById(id) {
        return null;
    }


    /**
     * method : getFirstEntry (public)
     * class  : PlaylistView
     * desc   : Return the first entry in view
     * return : {object} A view entry
     **/
    getFirstEntry() {
        return null;
    }


    /**
     * method : getNextEntry (public)
     * class  : PlaylistView
     * desc   : Return the next entry in view
     * return : {object} A view entry
     **/
    getNextEntry() {
        return null;
    }


    /**
     * method : getPreviousEntry (public)
     * class  : PlaylistView
     * desc   : Return the previous entry in view
     * return : {object} A view entry
     **/
    getPreviousEntry() {
        return null;
    }


    /**
     * method : isLastEntry (public)
     * class  : PlaylistView
     * desc   : Test if a track is the last entry in view
     * arg    : {object} track - The track to test in view
     * return : {bool}
     **/
    isLastEntry(track) {
        return true;
    }


    /**
     * method : setSelected (public)
     * class  : PlaylistView
     * desc   : Select an entry in view from a track object
     * arg    : {object} track - The track to select in view
     **/
    setSelected(track) {
        // TODO : setSelected without unselecting all entries.
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) { //  Un-selecting all
                this.entries[i].setIsSelected(false);
            }
            if (this.entries[i].track.id.track === track.id.track) { // Selecting the one
                this.entries[i].setIsSelected(true);
            }
        }
    }

}

export default PlaylistView