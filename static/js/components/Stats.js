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
            userName: document.createElement("H1"),
            totalPlayed: document.createElement("P"),
            totalPushed: document.createElement("P"),
            prefArtistsLabel: document.createElement("P"),
            prefArtists: document.createElement("OL"),
            prefTracksLabel: document.createElement("P"),
            prefTracks: document.createElement("OL"),
            leastArtistsLabel: document.createElement("P"),
            leastArtists: document.createElement("OL"),
            leastTracksLabel: document.createElement("P"),
            leastTracks: document.createElement("OL")
        };

        this.ui.container.id = "stats";

        this.ui.totalPlayed.innerHTML = "Tracks played : ";
        this.ui.totalPushed.innerHTML = "Tracks uploaded : ";
        this.ui.prefArtistsLabel.innerHTML = "Top Artists : ";
        this.ui.prefTracksLabel.innerHTML = "Top Tracks : ";
        this.ui.leastArtistsLabel.innerHTML = "Flop Artists : ";
        this.ui.leastTracksLabel.innerHTML = "Flop Tracks : ";

        this.ui.container.appendChild(this.ui.userName);
        this.ui.container.appendChild(this.ui.totalPlayed);
        this.ui.container.appendChild(this.ui.totalPushed);
        this.ui.container.appendChild(this.ui.prefArtistsLabel);
        this.ui.container.appendChild(this.ui.prefArtists);
        this.ui.container.appendChild(this.ui.prefTracksLabel);
        this.ui.container.appendChild(this.ui.prefTracks);
        this.ui.container.appendChild(this.ui.leastArtistsLabel);
        this.ui.container.appendChild(this.ui.leastArtists);
        this.ui.container.appendChild(this.ui.leastTracksLabel);
        this.ui.container.appendChild(this.ui.leastTracks);

        container.appendChild(this.ui.container);
    },


    _fetchStats: function() {
        let that = this;
        JSONParsedGetRequest(
            "ajax/getUserStats/",
            false,
            function(response) {
                that.ui.userName.innerHTML = response.USERNAME;
                that.ui.totalPlayed.innerHTML += response.NB_TRACK_LISTENED;
                that.ui.totalPushed.innerHTML += response.NB_TRACK_PUSHED + " (" +
                    Math.round(((response.NB_TRACK_PUSHED) / response.TOTAL_TRACK) * 100) / 100 +
                    "% of all the music here)";
                that._updatePrefArtistsList(response.PREF_ARTISTS);
                that._updatePrefTracksList(response.PREF_TRACKS);
                console.log(response);
                that._updateLeastArtistsList(response.LEAST_ARTISTS);

                that._updateLeastTracksList(response.LEAST_TRACKS);
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
    },


    _updateLeastArtistsList: function(leastArtists) {
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
    },


    _updateLeastTracksList: function(leastTracks) {
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
};
