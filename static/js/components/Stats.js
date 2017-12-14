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
            prefArtistsLabel: document.createElement("P"),
            prefArtists: document.createElement("OL")
        };

        this.ui.container.id = "stats";

        this.ui.totalPlayed.innerHTML = "Tracks played : ";
        this.ui.prefArtistsLabel.innerHTML = "Top Artists : ";

        this.ui.container.appendChild(this.ui.totalPlayed);
        this.ui.container.appendChild(this.ui.prefArtistsLabel);
        this.ui.container.appendChild(this.ui.prefArtists);
        container.appendChild(this.ui.container);
    },


    _fetchStats: function() {
        let that = this;
        JSONParsedPostRequest(
            "ajax/getUserStats/",
            false,
            function(response) {
                that.ui.totalPlayed.innerHTML += response.NB_TRACK_LISTENED;
                console.log(response);
                that._updatePrefArtistsList(response.PREF_ARTISTS);
            }
        );
    },


    // prefartists : array
    _updatePrefArtistsList: function(prefArtists) {
        while (this.ui.prefArtists.firstChild) {
            this.ui.prefArtists.removeChild(this.ui.prefArtists.firstChild);
        }

        for (let i = 0; i < prefArtists.length - 1; ++i) { // -1 is here to ignore the last array entry which is w/ name = null
            let entry = document.createElement("LI");
            entry.innerHTML = prefArtists[i][1];
            this.ui.prefArtists.appendChild(entry);
        }
    }
};
