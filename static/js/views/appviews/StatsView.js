/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  StatsView class                        *
 *                                         *
 *  Handle stats                           *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class StatsView extends View {
    constructor() {

        super();
        this._createUI();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : _fetchStats (public)
     * class  : StatsView
     * desc   : Fetch statistics from server
     **/
    fetchStats() {
        let that = this;
        let modal = new Modal("fetchStats");
        modal.open();

        JSONParsedGetRequest(
            "ajax/getUserStats/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     USERNAME          : string
                 *     NB_TRACK_LISTENED : int
                 *     NB_TRACK_PUSHED   : int
                 *     TOTAL_TRACK       : int
                 *     PREF_ARTISTS      : [][]
                 *     PREF_TRACKS       : [][]
                 *     LEAST_ARTISTS     : [][]
                 *     LEAST_TRACKS      : [][]
                 * } */
                modal.close();

                if (response.DONE) {
                    that.ui.userName.innerHTML     = response.USERNAME;
                    that.ui.totalPlayed.innerHTML += response.NB_TRACK_LISTENED;
                    that.ui.totalPushed.innerHTML += response.NB_TRACK_PUSHED + " (" +  // TODO : get from serv toptal track on serv
                        Math.round(((response.NB_TRACK_PUSHED) / response.TOTAL_TRACK) * 100) / 100 +
                        "% of all the music here)";
                    that._updatePrefArtistsList(response.PREF_ARTISTS);
                    that._updatePrefTracksList(response.PREF_TRACKS);
                    that._updateLeastArtistsList(response.LEAST_ARTISTS);
                    that._updateLeastTracksList(response.LEAST_TRACKS);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR.MSG);
                }
            }
        );
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : StatsView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container: this.container,
            userName: document.createElement("H1"),
            totalPlayed: document.createElement("P"),
            totalPushed: document.createElement("P"),

            artistsLeft: document.createElement("DIV"),
            artistsRight: document.createElement("DIV"),
            prefArtistsLabel: document.createElement("P"),
            prefArtists: document.createElement("OL"),
            leastArtistsLabel: document.createElement("P"),
            leastArtists: document.createElement("OL"),

            tracksLeft: document.createElement("DIV"),
            tracksRight: document.createElement("DIV"),
            prefTracksLabel: document.createElement("P"),
            prefTracks: document.createElement("OL"),
            leastTracksLabel: document.createElement("P"),
            leastTracks: document.createElement("OL")
        };

        this.ui.container.id = "stats";
        this.ui.prefArtistsLabel.id = "label";
        this.ui.leastArtistsLabel.id = "label";
        this.ui.prefTracksLabel.id = "label";
        this.ui.leastTracksLabel.id = "label";

        this.ui.artistsLeft.className = "col";
        this.ui.artistsRight.className = "col";
        this.ui.tracksLeft.className = "col";
        this.ui.tracksRight.className = "col";

        this.ui.totalPlayed.innerHTML = "Tracks played : ";
        this.ui.totalPushed.innerHTML = "Tracks uploaded : ";
        this.ui.prefArtistsLabel.innerHTML = "Top Artists : ";
        this.ui.prefTracksLabel.innerHTML = "Top Tracks : ";
        this.ui.leastArtistsLabel.innerHTML = "Flop Artists : ";
        this.ui.leastTracksLabel.innerHTML = "Flop Tracks : ";

        this.ui.container.appendChild(this.ui.userName);
        this.ui.container.appendChild(this.ui.totalPlayed);
        this.ui.container.appendChild(this.ui.totalPushed);

        this.ui.artistsLeft.appendChild(this.ui.prefArtistsLabel);
        this.ui.artistsLeft.appendChild(this.ui.prefArtists);
        this.ui.artistsRight.appendChild(this.ui.leastArtistsLabel);
        this.ui.artistsRight.appendChild(this.ui.leastArtists);
        this.ui.container.appendChild(this.ui.artistsLeft);
        this.ui.container.appendChild(this.ui.artistsRight);
        this.ui.tracksLeft.appendChild(this.ui.prefTracksLabel);

        this.ui.tracksLeft.appendChild(this.ui.prefTracks);
        this.ui.tracksRight.appendChild(this.ui.leastTracksLabel);
        this.ui.tracksRight.appendChild(this.ui.leastTracks);
        this.ui.container.appendChild(this.ui.tracksLeft);
        this.ui.container.appendChild(this.ui.tracksRight);
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop artists list
     * arg    : {[int][int]} leastArtists - Key/Value artists array
     **/
    _updateLeastArtistsList(leastArtists) {
        while (this.ui.leastArtists.firstChild) {
            this.ui.leastArtists.removeChild(this.ui.leastArtists.firstChild);
        }

        for (let i = 0; i < leastArtists.length; ++i) {
            if (leastArtists[i][0] !== null) {
                let entry = document.createElement("LI");
                entry.innerHTML = leastArtists[i][0] + " (" + leastArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                this.ui.leastArtists.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the favorite artists list
     * arg    : {[int][int]} prefArtists - Key/Value artists array
     **/
    _updatePrefArtistsList(prefArtists) {
        while (this.ui.prefArtists.firstChild) {
            this.ui.prefArtists.removeChild(this.ui.prefArtists.firstChild);
        }

        for (let i = 0; i < prefArtists.length; ++i) {
            if (prefArtists[i][0] !== null) {
                let entry = document.createElement("LI");
                entry.innerHTML = prefArtists[i][0] + " (" + prefArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                this.ui.prefArtists.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop tracks list
     * arg    : {[int][int]} leastTracks - Key/Value tracks array
     **/
    _updateLeastTracksList(leastTracks) {
        while (this.ui.leastTracks.firstChild) {
            this.ui.leastTracks.removeChild(this.ui.leastTracks.firstChild);
        }

        for (let i = 0; i < leastTracks.length; ++i) {
            if (leastTracks[i][0] !== null) {
                let entry = document.createElement("LI");
                entry.innerHTML = leastTracks[i][0] + " (" + leastTracks[i][1] + " tracks played)"; // 0 = name, 1 = counter
                this.ui.leastTracks.appendChild(entry);

            }
        }
    }


    /**
     * method : _updatePrefTracksList (private)
     * class  : StatsView
     * desc   : Updates the favorite tracks list
     * arg    : {[int][int]} prefTracks - Key/Value tracks array
     **/
    _updatePrefTracksList(prefTracks) {
        while (this.ui.prefTracks.firstChild) {
            this.ui.prefTracks.removeChild(this.ui.prefTracks.firstChild);
        }

        for (let i = 0; i < prefTracks.length; ++i) {
            if (prefTracks[i][0] !== null) {
                let entry = document.createElement("LI");
                entry.innerHTML = prefTracks[i][0] + " (" + prefTracks[i][1] + " tracks played)"; // 0 = name, 1 = counter
                this.ui.prefTracks.appendChild(entry);

            }
        }
    }

}
