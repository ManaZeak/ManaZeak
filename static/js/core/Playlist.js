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
let Playlist = function(id, name, isLibrary, isLoading, rawTracks, callback) {
    // NewLibrary relative attributes, useless (if isLibrary = false && isLoading = false)
    this.ui = {
        name:        null,
        path:        null,
        convert:     null,
    };
    this.modal = null;

    // Playlist internal attributes
    this.id          = id;
    this.name        = name;
    this.isLibrary   = isLibrary;
    this.isLoading   = isLoading;
    this.shuffleMode = 0; // 0 : off, 1 : random, 2: shuffle
    this.repeatMode  = 0; // 0 : off, 1 : one, 2: all
    this.isRepeat    = false;

    //TODO: fix this
    if (typeof rawTracks !== 'undefined') { this.rawTracks = rawTracks; }
    else                                  { this.rawTracks = [];        }

    if (typeof callback !== 'undefined')  { this.callback = callback;   }
    else                                  { this.callback = null;       }

    // Boolean to add to know if tracks are set or not
    this.getTracksIntervalId = -1; // Interval id for _getTracksFromServer_aux

    this.tracks        = [];
    this.currentTrack  = 0;
    this.trackTotal    = 0;
    this.artistTotal   = 0;
    this.albumTotal    = 0;
    this.durationTotal = 0;

    let viewkeys = Object.keys(window.app.availableViews);

    this.views      = new Array(viewkeys.length).fill(null);
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


    _loadLibrary: function() {
        this._fillTracks(this.rawTracks);
    },


    _newLibrary: function() {
        this.isLibrary = true;

        this.modal = new Modal("newLibrary", this.id);
        this.modal.open();

        let that = this;
        this.modal.setCallback(function(name, path, convert) {
            that._requestNewLibrary(name.value, path.value, convert.checked);
        })
    },


    _requestNewLibrary: function(name, path, convert) {
        let that = this;
        JSONParsedPostRequest(
            "ajax/newLibrary/",
            JSON.stringify({
                URL:     path,
                NAME:    name,
                CONVERT: convert
            }),
            function(response) {
                /* response = {
                 *     DONE:       bool
                 *     LIBRARY_ID: int or undefined
                 *     ERROR_H1:   string
                 *     ERROR_MSG:  string
                 * } */
                if (response.DONE) {
                    that.name = name;
                    that.modal.close();
                    that.modal = null;
                    that.modal = new Modal("scanLibrary", that.id);
                    that.modal.open();
                    that.id = response.LIBRARY_ID;
                    that._initialLibraryScan(response.LIBRARY_ID);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
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
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _getTracksFromServer: function(playlistId) {
        let that = this;

        this.getTracksIntervalId = window.setInterval(function() {
            that._getTracksFromServer_aux(playlistId);
        }, 500); // One call every 0.5s
    },


    _getTracksFromServer_aux: function(playlistId) {
        let that = this;

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
                let self = that;

                if (response.DONE) {
                    window.clearInterval(that.getTracksIntervalId);
                    that.getTracksIntervalId = -1;

                    JSONParsedPostRequest(
                        "ajax/getSimplifiedTracks/",
                        JSON.stringify({
                            PLAYLIST_ID: playlistId
                        }),
                        function(response) {
                            // response = raw tracks JSON object
                            self.rawTracks = response;
                            self.modal.close();
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
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    getPlaylistsTracks: function(callback) {
        let that = this;

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


    _fillTracks: function(tracks) {
        for (let i = 0; i < tracks.length; ++i) {
            ++this.trackTotal;
            this.durationTotal += tracks[i].DURATION;
            this.tracks.push(new Track(tracks[i]));
        }
    },


    playNextTrack: function() {
        let that = this;

        if (this.repeatMode === 1) {
            window.app.repeatTrack();
        }

        else {
            switch (this.shuffleMode) {
                case 0: // Shuffle off
                    if (this.repeatMode !== 0) {
                        this.currentTrack = this.activeView.getNextEntry();
                        window.app.changeTrack(this.currentTrack, false);
                    } else {
                        if (this.activeView.isLastEntry()) {
                            window.app.stopPlayback();
                        } else {
                            this.currentTrack = this.activeView.getNextEntry();
                            window.app.changeTrack(this.currentTrack, false);
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
                            window.app.changeTrack(that.currentTrack, false);
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
                            }

                            else {
                                that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                window.app.changeTrack(that.currentTrack, false);
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
        let that = this;

        switch (this.shuffleMode) {
            case 0: // Shuffle off
                this.currentTrack = this.activeView.getPreviousEntry();
                window.app.changeTrack(this.currentTrack, false);
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
                            window.app.changeTrack(that.currentTrack, true);
                        } else {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
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
        let v = this.views[viewType.index];

        if (v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this));
            v = this.views[viewType.index];
        }

        this.activeView = v;
        v.show();
    },


    updateView: function(track) {
        this.currentTrack = track; // TODO : handle list sorting, search for entry in view instead
        this.activeView.setSelected(track);
    },


    refreshViews: function() {
        for(let i = 0; i < this.views.length; ++i) {
            if(this.views[i] !== null) {
                this.views[i].init(this.views[i].getDataFromPlaylist(this));
            }
        }
    },


    getId: function()         { return this.id;        },
    getTracks: function()     { return this.tracks;    },
    getName: function()       { return this.name;      },
    getIsLibrary: function()  { return this.isLibrary; },
    getshuffleMode: function() { return this.shuffleMode; },
    getRepeatMode: function()  { return this.repeatMode; },


    setName: function(name)   { this.name = name;      }
};
