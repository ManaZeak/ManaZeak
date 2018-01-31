/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListViewEntry sub class                *
 *                                         *
 *  A list view entry                      *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { secondsToTimecode } from '../../utils/Utils.js'

class ListViewEntry {

    constructor(track, listView) {
        this.track           = track;
        this.isSelected      = false;

        this.entry           = document.createElement("DIV");
        this.info = {
            duration: document.createElement("DIV"),
            title: document.createElement("DIV"),
            artist: document.createElement("DIV"),
            composer: document.createElement("DIV"),
            performer: document.createElement("DIV"),
            album: document.createElement("DIV"),
            genre: document.createElement("DIV"),
            bitRate: document.createElement("DIV"),
            year: document.createElement("DIV")
        };

        this.entry.className = "trackContainer";
        this.info.duration.className   = "col-duration";
        this.info.title.className      = "col-title";
        this.info.artist.className     = "col-artist";
        this.info.composer.className   = "col-composer";
        this.info.performer.className  = "col-performer";
        this.info.album.className      = "col-album";
        this.info.genre.className      = "col-genre";
        this.info.bitRate.className    = "col-bitRate";
        this.info.year.className       = "col-year";

        this.entry.appendChild(this.info.duration);
        this.entry.appendChild(this.info.title);
        this.entry.appendChild(this.info.artist);
        this.entry.appendChild(this.info.composer);
        //this.entry.appendChild(this.info.performer);
        this.entry.appendChild(this.info.album);
        this.entry.appendChild(this.info.genre);
        this.entry.appendChild(this.info.bitRate);
        this.entry.appendChild(this.info.year);

        this._setInfo();
        this._eventListener();
        this.insert(listView);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : insert (public)
     * class  : ListViewEntry
     * desc   : Insert the entry in the list
     * return : {object} listView - The HTML container
     **/
    insert(listView) {
        this.entry.dataset.childID = listView.children.length;

        if (this.entry.dataset.childID % 2 === 0) {
            this.entry.classList.add("evenLin");
        }

        listView.appendChild(this.entry);
    }


    /**
     * method : setBackground (public)
     * class  : ListViewEntry
     * desc   : Change entry BG color if seed is even
     * arg    : {int} seed - The value to test is even
     **/
    setBackground(seed) {
        this.entry.classList.remove("evenLin");

        if (seed % 2 === 0) {
            this.entry.classList.add("evenLin");
        }
    }


    /**
     * method : setIsSelected (public)
     * class  : ListViewEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) {
            this.entry.classList.add("mzk-selected");
        }

        else {
            this.entry.classList.remove("mzk-selected");
        }
    }

//  -------------------------------  PRIVATE METHODS  ---------------------------------  //

    /**
     * TODO
     */
    _eventListener() {
        let that = this;
        this.track.listen('updateMetadata', function() {
            that._setInfo();
        });
    }

    /**
     * TODO remove zeaz and implement a track bank
     */
    _setInfo() {
        this.info.duration.innerHTML   = secondsToTimecode(this.track.duration);
        this.info.title.innerHTML      = this.track.title;
        this.info.artist.innerHTML     = this.track.artist;
        this.info.composer.innerHTML   = this.track.composer;
        this.info.performer.innerHTML  = this.track.performer;
        this.info.album.innerHTML      = this.track.album;
        this.info.genre.innerHTML      = this.track.genre;
        this.info.bitRate.innerHTML    = Math.round(this.track.bitRate / 1000) + " kbps";
        this.info.year.innerHTML       = this.track.year;
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsSelected() { return this.isSelected; }

}

export default ListViewEntry