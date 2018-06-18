/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  StatsView class                        *
 *                                         *
 *  Handle stats                           *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedGetRequest, precisionRound } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import View from '../../core/View.js'

class StatsView extends View {

    constructor() {
        super();

        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('    StatsView construction');
        }

        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : StatsView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _clearSpace call');
        }

        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : StatsView
     * desc   : Build UI elements
     **/
    _createUI() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _createUI call');
        }

        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuTrack:   document.createElement("LI"),
            menuArtist:  document.createElement("LI"),
            menuGenre:   document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.classList.add("mzk-statsview");
        this.ui.menu.className       = "mzk-left-menu";
        this.ui.content.className    = "mzk-content";
        this.ui.menuTitle.innerHTML  = window.app.nls.statsView.panel;
        this.ui.menuArtist.innerHTML = window.app.nls.statsView.artist.entry;
        this.ui.menuTrack.innerHTML  = window.app.nls.statsView.track.entry;
        this.ui.menuGenre.innerHTML  = window.app.nls.statsView.genre.entry;

        this.ui.menuList.appendChild(this.ui.menuArtist);
        this.ui.menuList.appendChild(this.ui.menuTrack);
        this.ui.menuList.appendChild(this.ui.menuGenre);
        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestArtistPage();
    }


    /**
     * method : _eventListener (private)
     * class  : StatsView
     * desc   : StatsView event listeners
     **/
    _eventListener() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _eventListener call');
        }

        this.ui.menuArtist.addEventListener("click", this._requestArtistPage.bind(this));
        this.ui.menuTrack.addEventListener("click", this._requestTrackPage.bind(this));
        this.ui.menuGenre.addEventListener("click", this._requestGenrePage.bind(this));
    }


    /**
     * method : _requestArtistPage (private)
     * class  : StatsView
     * desc   : Display the artists page
     **/
    _requestArtistPage() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _requestArtistPage call');
        }

        this._clearPageSpace();

        this.ui.menuArtist.className   = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.statsView.artist.title;

        let artistsLeft                = document.createElement("DIV");
        let artistsRight               = document.createElement("DIV");
        let prefArtistsLabel           = document.createElement("P");
        let prefArtists                = document.createElement("UL");
        let leastArtistsLabel          = document.createElement("P");
        let leastArtists               = document.createElement("UL");

        prefArtistsLabel.className     = "mzk-label";
        leastArtistsLabel.className    = "mzk-label";
        artistsLeft.className          = "mzk-col";
        artistsRight.className         = "mzk-col";

        artistsLeft.appendChild(prefArtistsLabel);
        artistsLeft.appendChild(prefArtists);
        artistsRight.appendChild(leastArtistsLabel);
        artistsRight.appendChild(leastArtists);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(artistsLeft);
        this.ui.content.appendChild(artistsRight);

        let that = this;
        JSONParsedGetRequest(
            "stats/getUserPrefArtists/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_ARTISTS      : [][]
                 *     LEAST_ARTISTS     : [][]
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    StatsView : _requestArtistPage server response');
                }

                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefArtistsLabel.innerHTML     = "";
                        leastArtistsLabel.innerHTML    = "";
                        that.ui.contentTitle.innerHTML = window.app.nls.statsView.artist.default;
                    }

                    else {
                        prefArtistsLabel.innerHTML     = window.app.nls.statsView.artist.list.topLabel;
                        leastArtistsLabel.innerHTML    = window.app.nls.statsView.artist.list.flopLabel;
                        that._updatePrefArtistsList(response.PREF_ARTISTS, prefArtists);
                        that._updateLeastArtistsList(response.LEAST_ARTISTS, leastArtists);
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestGenrePage (private)
     * class  : StatsView
     * desc   : Display the genres page
     **/
    _requestGenrePage() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _requestGenrePage call');
        }

        this._clearPageSpace();

        this.ui.menuGenre.className    = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.statsView.genre.title;

        let genresLeft                 = document.createElement("DIV");
        let genresRight                = document.createElement("DIV");
        let prefGenresLabel            = document.createElement("P");
        let prefGenres                 = document.createElement("UL");
        let leastGenresLabel           = document.createElement("P");
        let leastGenres                = document.createElement("UL");

        prefGenresLabel.className      = "mzk-label";
        leastGenresLabel.className     = "mzk-label";
        genresLeft.className           = "mzk-col";
        genresRight.className          = "mzk-col";

        genresLeft.appendChild(prefGenresLabel);
        genresLeft.appendChild(prefGenres);
        genresRight.appendChild(leastGenresLabel);
        genresRight.appendChild(leastGenres);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(genresLeft);
        this.ui.content.appendChild(genresRight);

        let that = this;
        JSONParsedGetRequest(
            "stats/getUserPrefGenres/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_GENRES      : [][]
                 *     LEAST_GENRES     : [][]
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    StatsView : _requestGenrePage server response');
                }

                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefGenresLabel.innerHTML      = "";
                        leastGenresLabel.innerHTML     = "";
                        that.ui.contentTitle.innerHTML = window.app.nls.statsView.genre.default;
                    }

                    else {
                        prefGenresLabel.innerHTML      = window.app.nls.statsView.genre.list.topLabel;
                        leastGenresLabel.innerHTML     = window.app.nls.statsView.genre.list.flopLabel;
                        that._updatePrefGenresList(response.PREF_GENRES, prefGenres);
                        that._updateLeastGenresList(response.LEAST_GENRES, leastGenres);
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestTrackPage (private)
     * class  : StatsView
     * desc   : Display the tracks page
     **/
    _requestTrackPage() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _requestTrackPage call');
        }

        this._clearPageSpace();

        this.ui.menuTrack.className    = "mzk-selected";
        this.ui.contentTitle.innerHTML = window.app.nls.statsView.track.title;

        let tracksLeft                 = document.createElement("DIV");
        let tracksRight                = document.createElement("DIV");
        let prefTracksLabel            = document.createElement("P");
        let prefTracks                 = document.createElement("UL");
        let leastTracksLabel           = document.createElement("P");
        let leastTracks                = document.createElement("UL");

        prefTracksLabel.className      = "mzk-label";
        leastTracksLabel.className     = "mzk-label";
        tracksLeft.className           = "mzk-col";
        tracksRight.className          = "mzk-col";

        tracksLeft.appendChild(prefTracksLabel);
        tracksLeft.appendChild(prefTracks);
        tracksRight.appendChild(leastTracksLabel);
        tracksRight.appendChild(leastTracks);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(tracksLeft);
        this.ui.content.appendChild(tracksRight);

        let that = this;

        JSONParsedGetRequest(
            "stats/getUserPrefTracks/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_TRACKS      : [][]
                 *     LEAST_TRACKS     : [][]
                 * } */
                if (window.debug && that.LOG) {
                    console.log('    StatsView : _requestTrackPage server response');
                }

                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefTracksLabel.innerHTML      = "";
                        leastTracksLabel.innerHTML     = "";
                        that.ui.contentTitle.innerHTML = window.app.nls.statsView.track.default;
                    }

                    else {
                        prefTracksLabel.innerHTML      = window.app.nls.statsView.track.list.topLabel;
                        leastTracksLabel.innerHTML     = window.app.nls.statsView.track.list.flopLabel;
                        that._updatePrefTracksList(response.PREF_TRACKS, prefTracks);
                        that._updateLeastTracksList(response.LEAST_TRACKS, leastTracks);
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _unselectAllMenuEntries (private)
     * class  : StatsView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _unselectAllMenuEntries call');
        }

        this.ui.menuArtist.className = "";
        this.ui.menuTrack.className  = "";
        this.ui.menuGenre.className  = "";
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop artists list
     * arg    : {[int][int]} leastArtists - Key/Value artists array
     **/
    _updateLeastArtistsList(leastArtists, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updateLeastArtistsList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastArtists.length; ++i) {
            if (leastArtists[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastArtists[i][0] !== "") {
                    entry.innerHTML =  counter + ". " + leastArtists[i][0] + " (" + leastArtists[i][1] + (leastArtists[i][1] > 1 ? window.app.nls.statsView.artist.list.tracksPlayed : window.app.nls.statsView.artist.list.trackPlayed) + ")"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML =  counter + ". " + window.app.nls.statsView.artist.list.untagged + " (" + leastArtists[i][1] + (leastArtists[i][1] > 1 ? window.app.nls.statsView.artist.list.tracksPlayed : window.app.nls.statsView.artist.list.trackPlayed) + ")"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the favorite artists list
     * arg    : {[int][int]} prefArtists - Key/Value artists array
     **/
    _updatePrefArtistsList(prefArtists, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updatePrefArtistsList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefArtists.length; ++i) {
            if (prefArtists[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefArtists[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefArtists[i][0] + " (" + prefArtists[i][1] + (prefArtists[i][1] > 1 ? window.app.nls.statsView.artist.list.tracksPlayed : window.app.nls.statsView.artist.list.trackPlayed) + ")"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". " + window.app.nls.statsView.artist.list.untagged + " (" + prefArtists[i][1] + (prefArtists[i][1] > 1 ? window.app.nls.statsView.artist.list.tracksPlayed : window.app.nls.statsView.artist.list.trackPlayed) + ")"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastGenresList (private)
     * class  : StatsView
     * desc   : Updates the flop tracks list
     * arg    : {[][]} leastGenres - Key/Value tracks array
     **/
    _updateLeastGenresList(leastGenres, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updateLeastGenresList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastGenres.length; ++i) {
            if (leastGenres[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastGenres[i][0] !== "") {
                    entry.innerHTML = counter + ". " + leastGenres[i][0] + " (" + window.app.nls.statsView.genre.list.played + " " + leastGenres[i][1] + " " + (leastGenres[i][1] > 1 ? window.app.nls.statsView.genre.list.times : window.app.nls.statsView.genre.list.time) + " " + precisionRound(leastGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". " + window.app.nls.statsView.genre.list.untagged + " (" + window.app.nls.statsView.genre.list.played + " " + leastGenres[i][1] + " " + leastGenres[i][1] + " " + (leastGenres[i][1] > 1 ? window.app.nls.statsView.genre.list.times : window.app.nls.statsView.genre.list.time) + " " + precisionRound(leastGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updatePrefGenresList (private)
     * class  : StatsView
     * desc   : Updates the favorite tracks list
     * arg    : {[int][int]} prefTracks - Key/Value tracks array
     **/
    _updatePrefGenresList(prefGenres, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updatePrefGenresList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefGenres.length; ++i) {
            if (prefGenres[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefGenres[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefGenres[i][0] + " (" + window.app.nls.statsView.genre.list.played + " " + prefGenres[i][1] + " " + (prefGenres[i][1] > 1 ? window.app.nls.statsView.genre.list.times : window.app.nls.statsView.genre.list.time) + " " + precisionRound(prefGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". " + window.app.nls.statsView.genre.list.untagged + " (" + window.app.nls.statsView.genre.list.played + " " + prefGenres[i][1] + " " + (prefGenres[i][1] > 1 ? window.app.nls.statsView.genre.list.times : window.app.nls.statsView.genre.list.time) + " " + precisionRound(prefGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop tracks list
     * arg    : {[int][int]} leastTracks - Key/Value tracks array
     **/
    _updateLeastTracksList(leastTracks, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updateLeastTracksList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastTracks.length; ++i) {
            if (leastTracks[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastTracks[i][0]) {
                    entry.innerHTML = counter + ". " + leastTracks[i][0] + " (" + window.app.nls.statsView.track.list.played + " " + leastTracks[i][1] + " " + (leastTracks[i][1] > 1 ? window.app.nls.statsView.track.list.times : window.app.nls.statsView.track.list.time) + precisionRound(leastTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". " + window.app.nls.statsView.track.list.untagged + " (" + window.app.nls.statsView.track.list.played + " " + leastTracks[i][1] + " " + (leastTracks[i][1] > 1 ? window.app.nls.statsView.track.list.times : window.app.nls.statsView.track.list.time) + precisionRound(leastTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);

            }
        }
    }


    /**
     * method : _updatePrefTracksList (private)
     * class  : StatsView
     * desc   : Updates the favorite tracks list
     * arg    : {[int][int]} prefTracks - Key/Value tracks array
     **/
    _updatePrefTracksList(prefTracks, ui) {
        if (window.debug && this.LOG) {
            console.log('    StatsView : _updatePrefTracksList call');
        }

        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefTracks.length; ++i) {
            if (prefTracks[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefTracks[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefTracks[i][0] + " (" + window.app.nls.statsView.track.list.played + " " + prefTracks[i][1] + " " + (prefTracks[i][1] > 1 ? window.app.nls.statsView.track.list.times : window.app.nls.statsView.track.list.time) + precisionRound(prefTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". " + window.app.nls.statsView.track.list.untagged + " (" + window.app.nls.statsView.track.list.played + " " + prefTracks[i][1] + " " + (prefTracks[i][1] > 1 ? window.app.nls.statsView.track.list.times : window.app.nls.statsView.track.list.time) + precisionRound(prefTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }
                ++counter;
                ui.appendChild(entry);

            }
        }
    }

}

export default StatsView
