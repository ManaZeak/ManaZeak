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
        let duration         = document.createElement("DIV");
        let title            = document.createElement("DIV");
        let artist           = document.createElement("DIV");
        let composer         = document.createElement("DIV");
        let performer        = document.createElement("DIV");
        let album            = document.createElement("DIV");
        let genre            = document.createElement("DIV");
        let bitRate          = document.createElement("DIV");
        let year             = document.createElement("DIV");

        this.entry.className = "trackContainer";
        duration.className   = "col-duration";
        title.className      = "col-title";
        artist.className     = "col-artist";
        composer.className   = "col-composer";
        performer.className  = "col-performer";
        album.className      = "col-album";
        genre.className      = "col-genre";
        bitRate.className    = "col-bitRate";
        year.className       = "col-year";
        duration.innerHTML   = secondsToTimecode(track.duration);
        title.innerHTML      = track.title;
        artist.innerHTML     = track.artist;
        composer.innerHTML   = track.composer;
        performer.innerHTML  = track.performer;
        album.innerHTML      = track.album;
        genre.innerHTML      = track.genre;
        bitRate.innerHTML    = Math.round(track.bitRate / 1000) + " kbps";
        year.innerHTML       = track.year;

        this.entry.appendChild(duration);
        this.entry.appendChild(title);
        this.entry.appendChild(artist);
        this.entry.appendChild(composer);
        //this.entry.appendChild(performer);
        this.entry.appendChild(album);
        this.entry.appendChild(genre);
        this.entry.appendChild(bitRate);
        this.entry.appendChild(year);

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

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsSelected() { return this.isSelected; }

}

export default ListViewEntry