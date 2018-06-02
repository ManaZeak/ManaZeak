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

import { JSONParsedPostRequest, JSONParsedGetRequest } from '../utils/Utils.js'
import Notification from '../utils/Notification.js'
import Track from './Track.js'
import Modal from '../utils/Modal.js'

class Playlist {

    constructor(id, name, description, isLibrary, isLoading, rawTracks, callback) { //TODO: get shuffle and repeat from server/cookies
        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('  Playlist construction');
        }

        typeof rawTracks !== 'undefined' ? this.rawTracks = rawTracks : this.rawTracks = [];
        typeof callback  !== 'undefined' ? this.callback  = callback  : this.callback  = null;

        this.id                  = id;
        this.name                = name;
        this.description         = description;
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
        this.lazyLoadOK          = true;
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activate (public)
     * class  : Playlist
     * desc   : Set in app the current playlist to this
     **/
    activate() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : activate call');
        }

        if (this.lazyLoadOK == false) {
            this.modal = new Modal('fetchPlaylists', null);
            this.modal.open();
            let that   = this;
            let timer  = window.setInterval(function() {
                if (that.lazyLoadOK == true) {
                    that.modal.close();
                    that.modal = null;
                    that.activate();
                    clearInterval(timer);
                }
            }, 100);
        }

        else {
            window.app.activePlaylist = this;
            this.showView(window.app.availableViews.LIST);
        }
    }


    /**
     * method : getFirstEntry (public)
     * class  : Playlist
     * desc   : Returns the first entry of active view
     * return : {object} View entry
     **/
    getFirstEntry() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : getFirst call');
        }

        return this.activeView.getFirstEntry();
    }


    /**
     * method : getPlaylistsTracks (public)
     * class  : Playlist
     * desc   : Fetch raw tracks from server
     * arg    : {function} callback - The function to callback - Not mandatory
     **/
    getPlaylistsTracks(callback) {
        if (window.debug && this.LOG) {
            console.log('  Playlist : getPlaylistsTracks call');
        }

        this._getTracksLazy(0, callback);
    }


    /**
     * method : playNextTrack (public)
     * class  : Playlist
     * desc   : Play next track, according to user repeat/shuffle settings
     **/
    playNextTrack() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : playNextTrack call');
        }

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
                        "player/randomNext/",
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
                            if (window.debug && that.LOG) {
                                 console.log('  Playlist : playNextTrack server response');
                            }

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
                        "player/shuffleNext/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id
                        }),
                        function(response) {
                            /* response = {
                             *     DONE       : bool
                             *     ERROR_H1   : string
                             *     ERROR_MSG  : string
                             *
                             *     IS_LAST    : bool
                             *     TRACK_ID   : int
                             * } */
                             if (window.debug && that.LOG) {
                                 console.log('  Playlist : playNextTrack server response');
                             }

                            if (response.DONE) {
                                if (response.IS_LAST) {
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : playPreviousTrack call');
        }

        let that = this;
        switch (this.shuffleMode) {
            case 0: // Shuffle off
                this.currentTrack = this.activeView.getPreviousEntry();
                window.app.changeTrack(this.currentTrack, false);
                break;

            default:
                JSONParsedGetRequest(
                    "history/getLastSongPlayed/",
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         *
                         *     TRACK_ID  : int
                         * } */
                         if (window.debug && that.LOG) {
                             console.log('  Playlist : playPreviousTrack server response');
                         }

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
        if (window.debug && this.LOG) {
            console.log('  Playlist : refreshViews call');
        }

        for (let i = 0; i < this.views.length; ++i) {
            if (this.views[i] !== null) {
                this.views[i].refreshTracks(this.tracks);
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : setCurrentTrack call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Playlist : showView call');
        }

        let v = this.views[viewType.index];

        if (v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this), this.isLibrary, this.id);
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : toggleRepeat call');
        }

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
    }


    /**
     * method : toggleShuffle (public)
     * class  : Playlist
     * desc   : Change shuffle mode ( 0 : off, 1 : random, 2: shuffle ) and send info to server
     **/
    toggleShuffle() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : toggleShuffle call');
        }

        ++this.shuffleMode;
        this.shuffleMode %= 3;

        JSONParsedPostRequest(
            "player/toggleRandomMode/",
            JSON.stringify({
                PLAYLIST_ID: this.id,
                RANDOM_MODE: this.shuffleMode
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                 if (window.debug && that.LOG) {
                     console.log('  Playlist : toggleShuffle server response');
                 }

                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearTracks (private)
     * class  : Playlist
     * desc   : Remove all track and reset tracks, artists and album count
     **/
    _clearTracks() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _clearTracks call');
        }

        this.tracks        = [];
        this.durationTotal = 0;
        this.trackTotal    = 0;
        this.artistTotal   = 0;
        this.albumTotal    = 0;
    }


    /**
     * method : _fillTracks (private)
     * class  : Playlist
     * desc   : Transform raw tracks into Track object
     * arg    : {object} tracks - Raw track w/ server syntax (capsed var)
     **/
    _fillTracks(tracks) { // Tracks is JSON response to playlist ID
        if (window.debug && this.LOG) {
            console.log('  Playlist : _fillTracks call');
        }

        for (let i = 0; i < tracks.length; ++i) {
            ++this.trackTotal;
            this.durationTotal += tracks[i].DURATION;
            this.tracks.push(new Track(tracks[i]));
        }
    }


    /**
     * method : _getTracksLazy (public)
     * class  : Playlist
     * desc   : Fetch raw tracks from server using the lazy loading
     * arg    : {integer} step - Must start at 0
     *          {function} callback - Not mandatory
     **/
    _getTracksLazy(step, callback) {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _getTracksLazy call');
        }

        if (step == 0) {
            this.lazyLoadOK = false;
            this.rawTracks  = [];
            this._clearTracks();
        }

        let that = this;
        JSONParsedPostRequest(
            "playlist/simplifiedLazyLoading/",
            JSON.stringify({
                PLAYLIST_ID:    this.id,
                REQUEST_NUMBER: step
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT: [
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         BITRATE:
                 *         DURATION:
                 *         COVER:
                 *         ARTISTS:
                 *         GENRE:
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *         }
                 *     ]
                 * } */
                if (window.debug && that.LOG) {
                    console.log('  Playlist : _getTracksLazy server response');
                }

                if (response.DONE) {
                    that.rawTracks = that.rawTracks.concat(response.RESULT);
                    that._getTracksLazy(step + 1, callback);
                }

                else {
                    if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
                        that._fillTracks(that.rawTracks);
                        that.refreshViews();
                        that.lazyLoadOK = true;

                        if (callback) {
                            that.activate();
                            callback();
                        }
                    }

                    else {
                        new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    }
                }
            }
        );
    }


    /**
     * method : _getTracksFromServer (private)
     * class  : Playlist
     * desc   : Ask server while track aren't fully scanned, every 0.5s
     * arg    : {int} playlistId - The playlist ID to get tracks from
     **/
    _getTracksFromServer(playlistId) {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _getTracksFromServer call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Playlist : _getTracksFromServer_aux call');
        }

        let that = this;
        JSONParsedPostRequest(
            "library/checkScanStatus/",
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('  Playlist : _getTracksFromServer_aux server response');
                }

                if (response.DONE) {
                    window.clearInterval(that.getTracksIntervalId);
                    that.getTracksIntervalId = -1;

                    let self = that;
                    that.getPlaylistsTracks(function() {
                        self.showView(window.app.availableViews.LIST);
                        self.modal.close();
                        if (self.callback) {
                            self.callback();
                        }
                    });
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : _init call');
        }

        if (this.isLoading) {
            if (this.isLibrary) { // Library loading process
                this._loadLibrary();
            }

            else { // Playlist loading process
                this._loadPlaylist();
            }
        }

        else {
            if (this.isLibrary) { // Library creation process
                this._newLibrary();
            }

            else { // Playlist creation process
                this._newPlaylist();
            }
        }
    }


    /**
     * method : _initialLibraryScan (private)
     * class  : Playlist
     * desc   : Scan a new library folder
     * arg    : {int} libraryId - The library ID to scan
     **/
    _initialLibraryScan(libraryId) {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _initialLibraryScan call');
        }

        let that = this;
        JSONParsedPostRequest(
            "library/initialScan/",
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
                if (window.debug && that.LOG) {
                    console.log('  Playlist : _initialLibraryScan server response');
                }

                if (response.DONE) {
                    that.id = response.PLAYLIST_ID;
                    that._getTracksFromServer(response.PLAYLIST_ID);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _loadLibrary (private)
     * class  : Playlist
     * desc   : Order _fillTracks if one sent rawTrack at instantiation
     **/
    _loadLibrary() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _loadLibrary call');
        }

        if (this.rawTracks.length === 0) {
            return;
        }

        this._fillTracks(this.rawTracks);
    }


    /**
     * method : _loadLibrary (private)
     * class  : Playlist
     * desc   : Order _fillTracks if one sent rawTrack at instantiation
     **/
    _loadPlaylist() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _loadPlaylist call');
        }

        if (this.rawTracks.length === 0) {
            return;
        }

        this._fillTracks(this.rawTracks);
    }


    /**
     * method : _newLibrary (private)
     * class  : Playlist
     * desc   : Starts a new library sequence
     **/
    _newLibrary() {
        if (window.debug && this.LOG) {
            console.log('  Playlist : _newLibrary call');
        }

        this.isLibrary = true;
        this.modal     = new Modal("newLibrary");
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : _newPlaylist call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Playlist : _requestNewLibrary call');
        }

        let that = this;
        JSONParsedPostRequest(
            "library/new/",
            JSON.stringify({
                URL:     path,
                NAME:    name,
                CONVERT: convert
            }),
            function(response) {
                /* response = {
                 *     DONE         : bool
                 *     ERROR_H1     : string
                 *     ERROR_MSG    : string
                 *
                 *     LIBRARY_ID   : int or undefined
                 *     LIBRARY_NAME : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('  Playlist : _requestNewLibrary server response');
                }

                if (response.DONE) {
                    that.name  = response.LIBRARY_NAME;
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
        if (window.debug && this.LOG) {
            console.log('  Playlist : _requestNewPlaylist call');
        }

        let that = this;
        JSONParsedPostRequest(
            "playlist/new/",
            JSON.stringify({
                PLAYLIST_NAME: name
            }),
            function(response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     PLAYLIST_ID   : int or undefined
                 *     PLAYLIST_NAME : string
                 * } */
                if (window.debug && that.LOG) {
                    console.log('  Playlist : _requestNewPlaylist server response');
                }

                if (response.DONE) {
                    that.name  = response.PLAYLIST_NAME;
                    that.id    = response.PLAYLIST_ID;
                    that.modal.close();
                    that.modal = null;
                    if (that.callback) { that.callback(); }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getName()        { return this.name;        }
    getIsLibrary()   { return this.isLibrary;   }
    getRepeatMode()  { return this.repeatMode;  }
    getShuffleMode() { return this.shuffleMode; }
    getActiveView()  { return this.activeView;  }

    setName(name)               { this.name = name;               }
    setDescription(description) { this.description = description; }
}

export default Playlist
