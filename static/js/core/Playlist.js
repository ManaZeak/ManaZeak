/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                         *
 *  Playlist class                                         *
 *                                                         *
 *  Handle a collection of track (lib, playlist, custom)   *
 *                                                         *
 *  id         : {int} Playlist ID in db                   *
 *  newLibrary : {bool} true => new library, false => load *
 *  tracks     : {[object]} Playlist tracks                *
 *  callback   : {function} Not mandatory                  *
 *                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class Playlist {
    constructor(id, name, isLibrary, isLoading, rawTracks, callback) {

        //TODO: get shuffle and repeat from server
        if (typeof rawTracks !== 'undefined') { this.rawTracks = rawTracks; } //TODO: fix this
        else                                  { this.rawTracks = [];        }
        if (typeof callback !== 'undefined')  { this.callback  = callback;  }
        else                                  { this.callback  = null;      }
        this.id                  = id;
        this.name                = name;
        this.isLibrary           = isLibrary;
        this.isLoading           = isLoading;
        this.modal               = null;
        this.shuffleMode         = 0; // 0 : off, 1 : random, 2: shuffle
        this.repeatMode          = 0; // 0 : off, 1 : one,    2: all
        this.getTracksIntervalId = -1; // Interval id for _getTracksFromServer_aux
        this.tracks              = [];
        this.currentTrack        = 0;
        this.trackTotal          = 0;
        this.artistTotal         = 0; // TODO
        this.albumTotal          = 0; // TODO
        this.durationTotal       = 0;
        let viewkeys             = Object.keys(window.app.availableViews);
        this.views               = new Array(viewkeys.length).fill(null);
        this.activeView          = window.app.availableViews[viewkeys[0]];

        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activate (public)
     * class  : Playlist
     * desc   : Set in app the current playlist to this
     **/
    activate() {
        window.app.activePlaylist = this;
        this.showView(window.app.availableViews.LIST);
    }


    /**
     * method : getFirstEntry (public)
     * class  : Playlist
     * desc   : Returns the first entry of active view
     * return : {object} View entry
     **/
    getFirstEntry() {
        return this.activeView.getFirstEntry();
    }


    /**
     * method : getPlaylistsTracks (public)
     * class  : Playlist
     * desc   : Fetch raw tracks from server
     * arg    : {function} callback - Not mandatory
     **/
    getPlaylistsTracks(callback) {
        let that = this;

        JSONParsedPostRequest(
            "ajax/getSimplifiedTracks/",
            JSON.stringify({
                PLAYLIST_ID: this.id
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT      : JSON object
                 * } */
                if (response.DONE) {
                    that.rawTracks = response.RESULT;
                    that._fillTracks(that.rawTracks);
                    that.refreshViews();

                    if (callback) {
                        that.showView(that.activeView);
                        callback();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : playNextTrack (public)
     * class  : Playlist
     * desc   : Play next track, according to user repeat/shuffle settings
     **/
    playNextTrack() {
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
                    }

                    else {
                        if (this.activeView.isLastEntry()) {
                            window.app.stopPlayback();
                        }

                        else {
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
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             *
                             *     TRACK_ID  : int
                             * } */
                            if (response.DONE) {
                                that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                window.app.changeTrack(that.currentTrack, false);
                            }

                            else {
                                new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                            }
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
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             *
                             *     LAST      : bool
                             *     TRACK_ID  : int
                             * } */
                            if (response.DONE) {
                                if (response.LAST) {
                                    window.app.stopPlayback();
                                }

                                else {
                                    that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                    window.app.changeTrack(that.currentTrack, false);
                                }
                            }

                            else {
                                new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                            }
                        }
                    );
                    break;

                default:
                    break;
            }
        }
    }


    /**
     * method : playPreviousTrack (public)
     * class  : Playlist
     * desc   : Play previous track, according to user repeat/shuffle settings
     **/
    playPreviousTrack() {
        let that = this;

        switch (this.shuffleMode) {
            case 0: // Shuffle off
                this.currentTrack = this.activeView.getPreviousEntry();
                window.app.changeTrack(this.currentTrack, false);
                break;

            default:
                JSONParsedGetRequest(
                    "ajax/getLastSongPlayed/",
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         *
                         *     TRACK_ID  : int
                         * } */
                        if (response.DONE) {
                            // TODO : test if track comes from the current playlist ...
                            that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                            window.app.changeTrack(that.currentTrack, true);
                        }

                        else {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                break;
        }
    }


    /**
     * method : refreshViews (public)
     * class  : Playlist
     * desc   : Refresh view
     **/
    refreshViews() {
        for (let i = 0; i < this.views.length; ++i) {
            if (this.views[i] !== null) {
                this.views[i].init(this.views[i].getDataFromPlaylist(this));
            }
        }
    }


    /**
     * method : setCurrentTrack (public)
     * class  : Playlist
     * desc   : Set playlist current track
     * arg    : {object} track - The track to select
     **/
    setCurrentTrack(track) {
        this.currentTrack = track; // TODO : handle list sorting, search for entry in view instead
        this.activeView.setSelected(track);
    }


    /**
     * method : showView (public)
     * class  : Playlist
     * desc   : Set UI to this playlist's view
     * arg    : {object} viewType - The view type
     **/
    showView(viewType) {
        let v = this.views[viewType.index];

        if (v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this));
            v = this.views[viewType.index];
        }

        this.activeView = v;
        window.app.changeView(v);
    }


    /**
     * method : toggleRepeat (public)
     * class  : Playlist
     * desc   : Change repeat mode ( 0 : off, 1 : one, 2: all ) and send info to server
     **/
    toggleRepeat() {
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
    }


    /**
     * method : toggleShuffle (public)
     * class  : Playlist
     * desc   : Change shuffle mode ( 0 : off, 1 : random, 2: shuffle ) and send info to server
     **/
    toggleShuffle() {
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
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _getTracksFromServer (private)
     * class  : Playlist
     * desc   : Ask server while track aren't fully scanned, every 0.5s
     * arg    : {int} playlistId - The playlist ID to get tracks from
     **/
    _getTracksFromServer(playlistId) {
        let that = this;

        this.getTracksIntervalId = window.setInterval(function() {
            that._getTracksFromServer_aux(playlistId);
        }, 500); // One call every 0.5s
    }


    /**
     * method : _getTracksFromServer_aux (private)
     * class  : Playlist
     * desc   : Post call to fetch tracks afterwards
     * arg    : {int} playlistId - The playlist ID to get tracks from
     **/
    _getTracksFromServer_aux(playlistId) {
        let that = this;

        JSONParsedPostRequest(
            "ajax/checkLibraryScanStatus/",
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
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
                            /* response = {
                             *     DONE        : bool
                             *     ERROR_H1    : string
                             *     ERROR_MSG   : string
                             *
                             *     RESULT      : JSON object
                             * } */
                            if (response.DONE) {
                                // response = raw tracks JSON object
                                self.rawTracks = response.RESULT;
                                self._fillTracks(self.rawTracks);
                                self.refreshViews();
                                self.showView(self.activeView);
                                self.modal.close();

                                if (self.callback) {
                                    self.callback();
                                }
                            }
                        }
                    );
                }
            }
        );
    }


    /**
     * method : _init (private)
     * class  : Playlist
     * desc   : Handle playlist instantiation depending on booleans given to constructor
     **/
    _init() {
        if (this.isLoading) {
            if (this.isLibrary) { this._loadLibrary(); } // Library loading process
        }

        else {
            if (this.isLibrary) { this._newLibrary();  } // Library creation process
            else                { this._newPlaylist(); } // Playlist creation process
        }
    }


    /**
     * method : _initialLibraryScan (private)
     * class  : Playlist
     * desc   : Scan a new library folder
     * arg    : {int} libraryId - The library ID to scan
     **/
    _initialLibraryScan(libraryId) {
        let that = this;

        JSONParsedPostRequest(
            "ajax/initialScan/",
            JSON.stringify({
                LIBRARY_ID: libraryId
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PLAYLIST_ID : int or undefined
                 * } */
                if (response.DONE) {
                    that._getTracksFromServer(response.PLAYLIST_ID);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _fillTracks (private)
     * class  : Playlist
     * desc   : Transform raw tracks into Track object
     * arg    : {object} tracks - Raw track w/ server syntax (capsed var)
     **/
    _fillTracks(tracks) { // Tracks is JSON response to playlist ID
        for (let i = 0; i < tracks.RESULT.length; ++i) {
            ++this.trackTotal;
            this.durationTotal += tracks.RESULT[i].DURATION;
            this.tracks.push(new Track(tracks.RESULT[i]));
        }
    }


    /**
     * method : _loadLibrary (private)
     * class  : Playlist
     * desc   : Order _fillTracks if one sent rawTrack at instantiation
     **/
    _loadLibrary() {
        if (this.rawTracks.length === 0) { return; }

        this._fillTracks(this.rawTracks);
    }


    /**
     * method : _newLibrary (private)
     * class  : Playlist
     * desc   : Starts a new library sequence
     **/
    _newLibrary() {
        this.isLibrary = true;

        this.modal = new Modal("newLibrary");
        this.modal.open();

        let that = this;
        this.modal.setCallback(function(name, path, convert) {
            that._requestNewLibrary(name.value, path.value, convert.checked);
        })
    }


    /**
     * method : _newPlaylist (private)
     * class  : Playlist
     * desc   : Starts a new playlist sequence
     **/
    _newPlaylist() {
        this.isLibrary = false;
        this.modal     = new Modal("newPlaylist");
        this.modal.open();

        let that = this;
        this.modal.setCallback(function(name) {
            that._requestNewPlaylist(name.value);
        })
    }


    /**
     * method : _requestNewLibrary (private)
     * class  : Playlist
     * desc   : Send new library information to server
     * arg    : {string} name - Name given by user
     *          {string} path - Path given by user
     *          {bool} convert - Auto conversion to ID3v2
     **/
    _requestNewLibrary(name, path, convert) {
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
                 *     DONE       : bool
                 *     ERROR_H1   : string
                 *     ERROR_MSG  : string
                 *
                 *     LIBRARY_ID : int or undefined
                 * } */
                if (response.DONE) {
                    that.name  = name;
                    that.modal.close();
                    that.modal = null;
                    that.modal = new Modal("scanLibrary");
                    that.modal.open();
                    that.id    = response.LIBRARY_ID;
                    that._initialLibraryScan(response.LIBRARY_ID);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestNewPlaylist (private)
     * class  : Playlist
     * desc   : Send new playlist information to server
     * arg    : {string} name - Name given by user
     **/
    _requestNewPlaylist(name) {
        let that = this;
        JSONParsedPostRequest(
            "ajax/newPlaylist/",
            JSON.stringify({
                NAME: name
            }),
            function(response) {
                /* response = {
                 *     DONE       : bool
                 *     ERROR_H1   : string
                 *     ERROR_MSG  : string
                 *
                 *     LIBRARY_ID : int or undefined
                 * } */
                if (response.DONE) {
                    that.name  = name;
                    that.id    = response.PLAYLIST_ID;
                    that.modal.close();
                    that.modal = null;

                    that.refreshViews();
                    window.app.refreshUI();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getId()          { return this.id;          }
    getName()        { return this.name;        }
    getIsLibrary()   { return this.isLibrary;   }
    getShuffleMode() { return this.shuffleMode; }
    getRepeatMode()  { return this.repeatMode;  }

}
