/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Stats = function(container) {
    this._createUI(container);
    this._fetchStats();
};


Stats.prototype = {

    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV"),
            totalPlayed: document.createElement("P"),
            totalPushed: document.createElement("P"),
            prefArtistsLabel: document.createElement("P"),
            prefArtists: document.createElement("OL"),
            prefTracksLabel: document.createElement("P"),
            prefTracks: document.createElement("OL")
        };

        this.ui.container.id = "stats";

        this.ui.totalPlayed.innerHTML = "Tracks played : ";
        this.ui.totalPushed.innerHTML = "Tracks uploaded : ";
        this.ui.prefArtistsLabel.innerHTML = "Top Artists : ";
        this.ui.prefTracksLabel.innerHTML = "Top Tracks : ";

        this.ui.container.appendChild(this.ui.totalPlayed);
        this.ui.container.appendChild(this.ui.totalPushed);
        this.ui.container.appendChild(this.ui.prefArtistsLabel);
        this.ui.container.appendChild(this.ui.prefArtists);
        this.ui.container.appendChild(this.ui.prefTracksLabel);
        this.ui.container.appendChild(this.ui.prefTracks);
        container.appendChild(this.ui.container);
    },


    _fetchStats: function() {
        let that = this;
        JSONParsedGetRequest(
            "ajax/getUserStats/",
            false,
            function(response) {
                that.ui.totalPlayed.innerHTML += response.NB_TRACK_LISTENED;
                that.ui.totalPushed.innerHTML += response.NB_TRACK_PUSHED + " (" +  // TODO : get from serv toptal track on serv
                    Math.round(((response.NB_TRACK_PUSHED +1) / window.app.activePlaylist.trackTotal) * 100) / 100 +
                    "% of all the music here)";
                that._updatePrefArtistsList(response.PREF_ARTISTS);
                that._updatePrefTracksList(response.PREF_TRACKS);

                console.log(response);
            }
        );
    },


    // prefartists : array
    _updatePrefArtistsList: function(prefArtists) {
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
    },


    _updatePrefTracksList: function(prefTracks) {
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
};
