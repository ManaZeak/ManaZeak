/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Playlist class - Allow multiple tracks manipulation                                *
 *                                                                                     *
 *  id         : integer      - the playlist ID in db                                  *
 *  newLibrary : boolean      - true means user wants to create a new library,         *
 *                              false means that user wants to load existing playlist  *
 *  cookies    : DOM Obj      - user cookies                                           *
 *  tracks     : Array[Track] - Playlist tracks                                        *
 *  callback   : function     - function to call after _fillTrack on newLibrary        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//TODO: get shuffle and repeat from server
var Playlist = function(id, name, isLibrary, isLoading, cookies, rawTracks, callback) {

    // NewLibrary relative attributes, useless (if isLibrary = false && isLoading = false)
    this.ui = {
        infoLabel: null,
        name:      null,
        path:      null,
        convert:   null,
        scan:      null
    };
    this.scanModal = null;


    // Playlist internal attributes
    this.id = id;
    this.name = name;
    this.isLibrary = isLibrary;
    this.isLoading = isLoading;
    this.isShuffle = false;
    this.isRepeat  = false;
    this.cookies = cookies;

    if (typeof rawTracks !== 'undefined') {
        this.rawTracks = rawTracks;
    } else {
        this.rawTracks = [];
    }

    if (typeof callback !== 'undefined') {
        this.callback = callback;
    } else {
        this.callback = null;
    }

    // Boolean to add to know if tracks are set or not
    this.tracks = [];
    this.currentTrack = 0;
    this.getTracksIntervalId = -1; // Interval id for _getTracksFromServer_aux


    this.trackTotal    = 0;
    this.durationTotal = 0;

    this._init(); // Playlist initialization
};


Playlist.prototype = {

    _init: function() {
        //if (typeof rawTracks === undefined) { return; }

        if (this.isLoading) {
            if (this.isLibrary) { this._loadLibrary(); } // Library loading process
        }
        else {
            if (this.isLibrary) { this._newLibrary(); } // Library creation process
        }
    },


    /*  Library creation and loading  */

    _loadLibrary: function() {
        this._fillTracks(this.rawTracks);
        console.log(this);
    },


    _newLibrary: function() {
        this.isLibrary = true;
        var that = this;

        JSONParsedGetRequest(
            "components/newLibrary",
            true,
            function(response) { // TODO : create modals of procedure
                // TODO : test response to see if it's html or void
                document.getElementById("mainContainer").insertAdjacentHTML('beforeend', response);

                that.ui.infoLabel   = document.getElementById("infoLabel");
                that.ui.name        = document.getElementById("name");
                that.ui.path        = document.getElementById("path");
                that.ui.convert     = document.getElementById("convert");
                that.ui.scan        = document.getElementById("scan");

                console.log(that.newLibrary);

                // TODO : Typography style to set - Replace newLibrary bool by radiobox (must disapear in the end)

                that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
                    "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
                    "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
                    "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
                // TODO : remove path input depending on radioBox

                that.ui.scan.addEventListener("click", that._checkInputs.bind(that));
            }
        );
    },


    _checkInputs: function() {
        if (this.ui.name.value !== '' && this.ui.path.value !== '') {
            this._requestNewLibrary();
        }

        else {
            if (this.ui.name.value !== '') {
                this.ui.path.style.border = "solid 1px red";
                new Notification("Path field is empty.", "You must specify the path of your library.");
            }

            else if (this.ui.path.value !== '') {
                this.ui.name.style.border = "solid 1px red";
                new Notification("Name field is empty.", "You must give your library a name.");
            }

            else {
                this.ui.path.style.border = "solid 1px red";
                this.ui.name.style.border = "solid 1px red";
                new Notification("Both fields are empty.", "You must fill both fields to create a new library.");
            }
        }
    },


    _requestNewLibrary: function() {
        var that = this;

        JSONParsedPostRequest(
            "ajax/newLibrary/",
            this.cookies,
            JSON.stringify({
                CONVERT: this.ui.convert.checked,
                NAME:    this.ui.name.value,
                URL:     this.ui.path.value
            }),
            function(response) {
                /* response = {
                 *     DONE:       bool
                 *     LIBRARY_ID: int or undefined
                 *     ERROR_H1:   string
                 *     ERROR_MSG:  string
                 * } */
                if (response.DONE) {
                    that.name = that.ui.name.value;
                    that.scanModal = new Modal("scanLibrary");
                    that.scanModal.open();
                    that.id = response.LIBRARY_ID;
                    that._initialLibraryScan(response.LIBRARY_ID);
                }

                else {
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _initialLibraryScan: function(libraryId) {
        var that = this;
        console.log("Scanning library -- in progress");

        JSONParsedPostRequest(
            "ajax/initialScan/",
            this.cookies,
            // "{\"LIBRARY_ID\":" + libraryId + "}", TODO : test this
            JSON.stringify({
                LIBRARY_ID: libraryId
            }),
            function(response) {
                /* response = {
                 *     DONE:        bool
                 *     PLAYLIST_ID: int or undefined
                 *     ERROR_H1:    string
                 *     ERROR_MSG:   string
                 * } */
                if (response.DONE) {
                    console.log("Scanning library -- done");
                    that._getTracksFromServer(response.PLAYLIST_ID);
                }

                else {
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _getTracksFromServer: function(playlistId) {
        var that = this;

        this.getTracksIntervalId = setInterval(function() {
            console.log("Tracks received from server -- in progress");
            that._getTracksFromServer_aux(playlistId);
        }, 20000); // every 20s
    },


    _getTracksFromServer_aux: function(playlistId) {
        console.log("_getTracksFromServer_aux() called");
        var that = this;

        JSONParsedPostRequest(
            "ajax/checkLibraryScanStatus/",
            this.cookies,
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                /* response = {
                 *     DONE:        bool
                 *     ERROR_H1:    string
                 *     ERROR_MSG:   string
                 * } */
                var self = that;

                if (response.DONE) {
                    clearInterval(that.getTracksIntervalId);
                    that.getTracksIntervalId = -1;

                    JSONParsedPostRequest(
                        "ajax/getSimplifiedTracks/",
                        that.cookies,
                        JSON.stringify({
                            PLAYLIST_ID: playlistId
                        }),
                        function(response) {
                            // response = raw tracks JSON object
                            console.log("Tracks received from server -- done");
                            self.rawTracks = response;
                            self.scanModal.close();
                            self._fillTracks(self.rawTracks);

                            if (!self.isLoading) {
                                document.getElementById("mainContainer").removeChild(document.getElementById("newLibrary"));
                                self.callback();
                            }
                        }
                    );
                }
                else if (response.ERROR_H1 === "null") {
                    clearInterval(that.getTracksIntervalId);
                    that.getTracksIntervalId = -1;

                    // TODO : refresh UI to come back to Library/Playlist creation
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    getPlaylistsTracks: function(playlistId, callback) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/getSimplifiedTracks/",
            that.cookies,
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                // response = raw tracks JSON object
                that.rawTracks = response;
                that._fillTracks(that.rawTracks);
                callback();
            }
        );
    },


    /* Class utilities */

    _fillTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            ++this.trackTotal;
            this.durationTotal += tracks[i].DURATION;

            this.tracks.push(new Track(tracks[i]));
        }
    },


    playNextTrack: function() {
        var that = this;

        if (this.isShuffle) {
            JSONParsedPostRequest(
                "ajax/randomNextTrack/",
                this.cookies,
                JSON.stringify({
                    PLAYLIST_ID: that.id
                    // TODO: send isRepeat here
                }),
                function(response) {
                    console.log(response);
                    // that.currentTrack = response.TRACK_ID; // TODO : get track ID from serv heres
                    var cover = response.COVER;
                    if (cover == null) { cover = "../static/img/utils/defaultcover.jpg"; }

                    window.app.trackPreview.setVisible(true);
                    //window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], cover);
                    //window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        } else {
            this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
            JSONParsedPostRequest(
                "ajax/getTrackPathByID/",
                this.cookies,
                JSON.stringify({
                    TRACK_ID: that.tracks[that.currentTrack].id.track// TODO : get from serv
                }),
                function(response) {
                    console.log(that.currentTrack);
                    console.log(that.currentTrack);
                    var cover = response.COVER;
                    if (cover == null) { cover = "../static/img/utils/defaultcover.jpg"; }

                    console.log(response);
                    window.app.trackPreview.setVisible(true);
                    window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], cover);
                    window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        }
    },


    playPreviousTrack: function() {
        var that = this;

        if (this.isShuffle) {
            //TODO: Get from server history
            JSONParsedPostRequest(
                "ajax/randomNextTrack/",
                this.cookies,
                JSON.stringify({
                    PLAYLIST_ID: that.id
                    // TODO: send isRepeat here
                }),
                function(response) {
                    console.log(response);
                    // that.currentTrack = response.TRACK_ID; // TODO : get track ID from serv heres
                    var cover = response.COVER;
                    if (cover == null) { cover = "../static/img/utils/defaultcover.jpg"; }

                    window.app.trackPreview.setVisible(true);
                    //window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], cover);
                    //window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        } else {
            this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
            JSONParsedPostRequest(
                "ajax/getTrackPathByID/",
                this.cookies,
                JSON.stringify({
                    TRACK_ID: that.tracks[that.currentTrack].id.track// TODO : get from serv
                }),
                function(response) {
                    var cover = response.COVER;
                    if (cover == null) { cover = "../static/img/utils/defaultcover.jpg"; }

                    window.app.trackPreview.setVisible(true);
                    window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], cover);
                    window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        }
    },


    // Class Getters and Setters
    getId: function()         { return this.id;        },
    getTracks: function()     { return this.tracks;    },
    getName: function()       { return this.name;      },
    getIsLibrary: function()  { return this.isLibrary; },

    setName: function(name)   { this.name = name;      }
};
