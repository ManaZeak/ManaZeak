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
var Playlist = function(id, name, isLibrary, isLoading, rawTracks, callback) {

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
    this.shuffleMode = 0; // 0 : off, 1 : random, 2: shuffle
    this.repeatMode = 0; // 0 : off, 1 : one, 2: all
    this.isRepeat  = false;

    //TODO: fix this
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
    this.artistTotal   = 0;
    this.albumTotal    = 0;
    this.durationTotal = 0;

    var viewkeys = Object.keys(window.app.availableViews);
    this.views = new Array(viewkeys.length).fill(null);
    this.activeView = window.app.availableViews[viewkeys[0]];

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
            // TODO : remove ui.scan listener
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

        JSONParsedPostRequest(
            "ajax/initialScan/",
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
            that._getTracksFromServer_aux(playlistId);
        }, 500); // called every .5s
    },


    _getTracksFromServer_aux: function(playlistId) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/checkLibraryScanStatus/",
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
                        JSON.stringify({
                            PLAYLIST_ID: playlistId
                        }),
                        function(response) {
                            // response = raw tracks JSON object
                            self.rawTracks = response;
                            self.scanModal.close();
                            self._fillTracks(self.rawTracks);
                            self.refreshViews();
                            self.showView(self.activeView);

                            if (self.callback) {
                                self.callback();
                            }
                        }
                    );
                }
                else if (response.ERROR_H1 === "null") {
                    // TODO : refresh UI to come back to Library/Playlist creation
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    getPlaylistsTracks: function(callback) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/getSimplifiedTracks/",
            JSON.stringify({
                PLAYLIST_ID: this.id
            }),
            function(response) {
                // response = raw tracks JSON object
                that.rawTracks = response;
                that._fillTracks(that.rawTracks);
                that.refreshViews();

                if (callback) {
                    that.showView(that.activeView);

                    callback();
                }
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

        if (this.repeatMode === 1) {
            window.app.repeatTrack();
        } else {
            switch (this.shuffleMode) {

                case 0: // Shuffle off
                    if (this.repeatMode !== 0) {
                        this.currentTrack = this.activeView.getNextEntry();
                        window.app.changeTrack(this.currentTrack);
                    } else {
                        if (this.activeView.isLastEntry()) {
                            window.app.stopPlayback();
                        } else {
                            this.currentTrack = this.activeView.getNextEntry();
                            window.app.changeTrack(this.currentTrack);
                        }
                    }
                    break;

                case 1: // Random
                    JSONParsedPostRequest(
                        "ajax/randomNextTrack/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id
                        }),
                        function(response) {
                            that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                            window.app.changeTrack(that.currentTrack);
                        }
                    );
                    break;

                case 2: // Shuffle on
                    JSONParsedPostRequest(
                        "ajax/shuffleNextTrack/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id
                        }),
                        function(response) {
                            if (response.LAST) {
                                window.app.stopPlayback();
                            } else {
                                that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                window.app.changeTrack(that.currentTrack);
                            }
                        }
                    );
                    break;

                default:
                    break;
            }
        }
    },


    playPreviousTrack: function() {
        switch (this.shuffleMode) {

            case 0: // Shuffle off
                this.currentTrack = this.activeView.getPreviousEntry();
                window.app.changeTrack(this.currentTrack);
                break;

            case 1: // Random
                //TODO: Get from server history
                break;

            case 2: // Shuffle on
                //TODO: Get from server history
                break;

            default:
                JSONParsedGetRequest(
                    "ajax/getLastSongPlayed/",
                    false,
                    function(response) {
                        if (response.DONE) {
                            /* response = {
                             *     DONE:        bool
                             *     TRACK_ID:    int
                             *     ERROR_H1:    string
                             *     ERROR_MSG:   string
                             * } */
                            // TODO : test if track comes from the current playlist ...
                            that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                            window.app.changeTrack(that.currentTrack);
                        } else {
                            new Notification(response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                break;
        }
    },


    toggleShuffle: function() {
        ++this.shuffleMode;
        this.shuffleMode %= 3;

        JSONParsedPostRequest(
            "ajax/toggleRandom/",
            JSON.stringify({
                PLAYLIST_ID: this.id,
                RANDOM_MODE: this.shuffleMode
            }),
            null
        );

        window.app.refreshUI();
    },


    toggleRepeat: function() {
        ++this.repeatMode;
        this.repeatMode %= 3;

        JSONParsedPostRequest(
            "ajax/toggleRepeat/",
            JSON.stringify({
                PLAYLIST_ID: this.id,
                REPEAT_MODE: this.repeatMode
            }),
            null
        );

        window.app.refreshUI();
    },


    activate: function() {
        window.app.activePlaylist = this;
        this.showView(window.app.availableViews.LIST);
    },

    showView: function(viewType) {
        var v = this.views[viewType.index];
        if(v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this));
            v = this.views[viewType.index];
        }
        v.show();

        this.activeView = v;
    },


    updateView: function(track) {
        this.currentTrack = track; // TODO : handle list sorting, search for entry in view instead
        this.activeView.setSelected(track);
    },


    refreshViews: function() {
        for(var i = 0; i < this.views.length; ++i)
            if(this.views[i] !== null)
                this.views[i].init(this.views[i].getDataFromPlaylist(this));
    },

    // Class Getters and Setters
    getId: function()         { return this.id;        },
    getTracks: function()     { return this.tracks;    },
    getName: function()       { return this.name;      },
    getIsLibrary: function()  { return this.isLibrary; },
    getshuffleMode: function()  { return this.shuffleMode; },
    getRepeatMode: function()  { return this.repeatMode; },

    setName: function(name)   { this.name = name;      }
};
