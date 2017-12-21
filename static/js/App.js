/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  App class                                      *
 *                                                 *
 *  ManaZeak main class, orchestrate all the front *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class App {
    constructor() {

        this.cookies          = getCookies();
        this.user             = new User();
        this.mainContainer    = document.createElement("DIV");
        this.mainContainer.id = "mainContainer";
        this.footBar          = null;
        this.player           = null;
        this.playlists        = [];
        this.activePlaylist   = null;
        this.cssFiles         = {};
        this.appViews         = {};
        this._createDefaultViews();

        this.availableViews   = {
            LIST: {
                index: 0,
                class: ListView
            },
            ALBUM: {
                index: 1,
                class: null
            }
        };

        this.listeners = {};
        let properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (let i = 0; i < properties.length; ++i) {
            if (typeof this[properties[i]] === "function") {
                this.listeners[properties[i]] = [];

                let oldFunc = this[properties[i]];

                this[properties[i]] = (function(pname, func) {
                    return function() {
                        let r = func.apply(this, arguments);
                        for (let i = 0; i < this.listeners[pname].length; ++i) {
                            this.listeners[pname][i].apply(null, arguments);
                        }
                        return r;
                    }
                }(properties[i], oldFunc));
            }
        }

        document.body.appendChild(this.mainContainer);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addListener (public)
     * class  : App
     * desc   : Add listener on an App function
     * arg    : {object} event - TODO
     *        : {function} callback
     **/
    addListener(event, callback) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; ++i)
                if (this.listeners[event[i]])
                    this.listeners[event[i]].push(callback);
        }

        else if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }


    /**
     * method : adjustVolume (public)
     * class  : App
     * desc   : Adjust ManaZeak volume
     * arg    : {float} amount - Value between 0 and 1
     **/
    adjustVolume(amount) {
        this.setVolume(this.player.getPlayer().volume + amount);
    }


    /**
     * method : changePageTitle (public)
     * class  : App
     * desc   : Change page title
     * arg    : {string} path - Current track path
     **/
    changePageTitle(path) {
        // IDEA : Recontruct from Track attributes bc special char won't display as below ... (?/etc.)
        document.title = path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ''); // Automatically remove path to file and any extension
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Update FootBar PlaylistPreview w/ activePlaylist
     **/
    changePlaylist() {
        this.footBar.playlistPreview.changePlaylist(this.activePlaylist);
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Update FootBar PlaylistPreview
     * arg    : {object} track - The track to set as current
     *          {bool} previous - For server about history
     **/
    changeTrack(track, previous) {
        if (track == null) { return false; }

        let that          = this;
        let lastTrackPath = this.player.player.attributes.getNamedItem("src"); // To update statistic on the previous track

        if (lastTrackPath !== null) { lastTrackPath = lastTrackPath.value; }
        else                        { lastTrackPath = "None";              }

        this.footBar.progressBar.resetProgressBar();
        JSONParsedPostRequest(
            "ajax/getTrackPathByID/",
            JSON.stringify({
                TRACK_ID:        track.id.track,
                LAST_TRACK_PATH: lastTrackPath,
                TRACK_PER:       (this.player.getCurrentTime() * 100) / this.player.getDuration(),
                PREVIOUS:         previous
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (response.DONE) {
                    that.footBar.trackPreview.changeTrack(track);
                    that.topBar.changeMoodbar(track.id.track);
                    that.player.changeSource(".." + response.PATH);
                    that.changePageTitle(response.PATH);
                    that.activePlaylist.setCurrentTrack(track);
                    that.togglePlay();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
        return true;
    }


    /**
     * method : changeView (public)
     * class  : App
     * desc   : Change the main view
     * arg    : {object} view - The view to set
     **/
    changeView(view) {
        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(view.getContainer());

        if (view.getContainer().id === "stats") { // TODO : find a better way
            view.fetchStats();
        }
    }


    /**
     * method : createAppView (public)
     * class  : App
     * desc   : Create an AppView
     * arg    : {string} name - The view name
     *          {object} view - The View object
     **/
    createAppView(name, view) {
        if (this.appViews[name] == null) {
            this.appViews[name] = view;
            return true;
        }

        else {
            return false;
        }
    }


    /**
     * method : deletePlaylist (public)
     * class  : App
     * desc   : Ask server to delete a playlist from a given ID
     * arg    : {int} id - The playlist ID
     **/
    deletePlaylist(id) {
        let that = this;
        JSONParsedPostRequest(
            "ajax/deletePlaylist/",
            JSON.stringify({
                PLAYLIST_ID: id,
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (response.DONE) {
                    for (let i = 0; i < that.playlists.length; ++i) { // Removing from playlists Array
                        if (that.playlists[i].id === id) {
                            that.playlists.splice(i, 1);
                            break;
                        }
                    }
                    that.playlists[0].activate(); // TODO : test if there is still some playlists
                    that.refreshTopBar();
                    that.refreshFootBar();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : fastForward (public)
     * class  : App
     * desc   : Fast forward playback
     * arg    : {int} amount - Time in seconds
     **/
    fastForward(amount) {
        this.player.getPlayer().currentTime += amount;
    }


    /**
     * method : getAllPlaylistsTracks (public)
     * class  : App
     * desc   : Fetch playlists tracks
     * arg    : {int} begin - The index to begin the loop with
     **/
    getAllPlaylistsTracks(begin) {
        for (let i = begin; i < this.playlists.length; ++i) {
            this.playlists[i].getPlaylistsTracks(undefined);
        }
    }


    /**
     * method : getPlaylistFromId (public)
     * class  : App
     * desc   : Returns a playlist from a given ID
     * arg    : {int} id - The playlist to get from an ID
     **/
    getPlaylistFromId(id) {
        for (let i = 0; i < this.playlists.length; ++i) {
            if (this.playlists[i].id === id) {
                return this.playlists[i];
            }
        }

        return null;
    }


    /**
     * method : getPlaylists (public)
     * class  : App
     * desc   : Get user playlists only
     * return : {object} element
     **/
    getPlaylists() {
        return this.playlists.filter(function(element) {
            return element.isLibrary != true;
        });
    }


    /**
     * method : init (public)
     * class  : App
     * desc   : Init components and request user playlist from server
     **/
    init() {
        this.topBar  = new TopBar();
        this.queue   = new Queue();
        this.player  = new Player();
        this.footBar = new FootBar();
        document.body.appendChild(this.topBar.getTopBar());
        document.body.appendChild(this.footBar.getFootBar());

        let that = this;
        // Loading playlists
        JSONParsedGetRequest(
            "ajax/getPlaylists/",
            function(response) {
                /* response = {
                 *     DONE           : bool
                 *     ERROR_H1       : string
                 *     ERROR_MSG      : string
                 *
                 *     PLAYLIST_IDS   : int[] / undefined
                 *     PLAYLIST_NAMES : string[] / undefined
                 * } */
                that._appStart(response); // Response is tested in _appStart
            }
        );
    }


    /**
     * method : logOut (public)
     * class  : App
     * desc   : Log out from current user
     **/
    logOut() {
        getRequest(
            "logout",
            function() {
                location.reload();
            }
        );
    }


    /**
     * method : moveQueue (public)
     * class  : App
     * desc   : TODO
     * arg    : {type} element - TODO
     **/
    moveQueue(element, newPos) {
        this.queue.slide(element, newPos);
    }


    /**
     * method : mute (public)
     * class  : App
     * desc   : Mute playback
     **/
    mute() {
        this.player.mute();
    }


    /**
     * method : next (public)
     * class  : App
     * desc   : Get next track
     **/
    next() {
        if (this.queue.isEmpty() == false) { this.popQueue();                     }
        else                               { this.activePlaylist.playNextTrack(); }
    }


    /**
     * method : popQueue (public)
     * class  : App
     * desc   : TODO
     **/
    popQueue() {
        this.changeTrack(this.queue.dequeue(), false);
    }


    /**
     * method : previous (public)
     * class  : App
     * desc   : Get previous track
     **/
    previous() {
        if (!this.player.isEmpty()) {
            this.activePlaylist.playPreviousTrack();
        }
    }


    /**
     * method : pushQueue (public)
     * class  : App
     * desc   : TODO
     * arg    : {object} track - The Track to push in Queue
     **/
    pushQueue(track) {
        console.log(track);
        this.queue.enqueue(track);
    }


    /**
     * method : refreshFootBar (public)
     * class  : App
     * desc   : Refresh ManaZeak FootBar
     **/
    refreshFootBar() {
        if (!this.footBar.playlistPreview.getIsVisible()) {
            this.footBar.playlistPreview.setVisible(true);
        }

        this.footBar.playlistPreview.changePlaylist(this.activePlaylist);
        this.footBar.progressBar.refreshInterval(this.player.getPlayer());
    }


    /**
     * method : refreshTopBar (public)
     * class  : App
     * desc   : Refresh ManaZeak TopBar
     **/
    refreshTopBar() {
        this.topBar.refreshTopBar();
    }


    /**
     * method : renamePlaylist (public)
     * class  : App
     * desc   : Renames a playlist/library from its ID
     * arg    : {int} id - The playlist's ID to rename
     *        : {string} name - The name to give to the playlist
     **/
    renamePlaylist(id, name) {
        let that = this;
        JSONParsedPostRequest(
            "ajax/renamePlaylist/",
            JSON.stringify({
                PLAYLIST_ID: id,
                NAME:        name
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (response.DONE) {
                    for (let i = 0; i < that.playlists.length; ++i) { // Renaming from playlists Array
                        if (that.playlists[i].id === id) {
                            console.log(name);
                            that.playlists[i].setName(name);
                            break;
                        }
                    }
                    that.playlists[0].activate(); // TODO : test if there is still some playlists
                    that.refreshTopBar();
                    that.refreshFootBar();
                    // TODO : delete playlist from this.playlists, refresh topBar, refreshFootbar, change active playlist
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

    /**
     * method : repeatTrack (public)
     * class  : App
     * desc   : Repeat current track
     **/
    repeatTrack() {
        this.player.repeatTrack();
    }


    /**
     * method : requestNewPlaylist (public)
     * class  : App
     * desc   : User requested a new playlist
     **/
    requestNewPlaylist() {
        let that = this;

        this.playlists.push(new Playlist(0, null, false, false, undefined, function() {
            that.playlists[0].activate();
            that.refreshTopBar();
            that.refreshFootBar();
        }));
    }


    /**
     * method : requestNewLibrary (public)
     * class  : App
     * desc   : Admin requested a new library
     **/
    requestNewLibrary() {
        let that = this;

        this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
            that.playlists[0].activate();
            that.refreshTopBar();
            that.refreshFootBar();
        }));
    }


    /**
     * method : reverseQueue (public)
     * class  : App
     * desc   : Reverse the Queue order
     * arg    : {bool} reverse
     **/
    reverseQueue(reverse) {
        this.queue.setReverse(reverse);
    }


    /**
     * method : rewind (public)
     * class  : App
     * desc   : Rewind playback
     * arg    : {int} amount - Time in seconds
     **/
    rewind(amount) {
        this.player.getPlayer().currentTime -= amount;
    }


    /**
     * method : showAppView (public)
     * class  : App
     * desc   : Show the given AppView
     * arg    : {string} name - AppView name
     **/
    showAppView(name) {
        if (this.appViews[name]) {
            this.changeView(this.appViews[name]);
        }
    }


    /**
     * method : setVolume (public)
     * class  : App
     * desc   : Set ManaZeak volume to a given value
     * arg    : {float} volume - Volume between 0 and 1
     **/
    setVolume(volume) {
        if (volume > 1)      { volume = 1; }
        else if (volume < 0) { volume = 0; }

        this.player.getPlayer().volume = precisionRound(volume, 2);
    }


    /**
     * method : stopPlayback (public)
     * class  : App
     * desc   : Stop ManaZeak playback
     **/
    stopPlayback() {
        this.changePageTitle("ManaZeak");
        this.player.stopPlayback();
        this.topBar.resetMoodbar();
        this.footBar.resetUI();
    }


    /**
     * method : toggleMute (public)
     * class  : App
     * desc   : Toggle mute on player
     **/
    toggleMute() {
        if (this.player.isMuted) {
            this.unmute();
            this.setVolume(this.player.oldVolume);
        }

        else {
            this.mute();
            this.setVolume(0);
        }
    }


    /**
     * method : togglePlay (public)
     * class  : App
     * desc   : Toggle play on player
     **/
    togglePlay() {
        if (this.player.isEmpty()) {
            this.changeTrack(this.activePlaylist.getFirstEntry(), false);
        }

        else {
            this.player.togglePlay();
        }
    }


    /**
     * method : toggleRepeat (public)
     * class  : App
     * desc   : Toggle repeat mode on playlist
     **/
    toggleRepeat() {
        this.activePlaylist.toggleRepeat();
    }


    /**
     * method : toggleShuffle (public)
     * class  : App
     * desc   : Toggle shuffle mode on playlist
     **/
    toggleShuffle() {
        this.activePlaylist.toggleShuffle();
    }


    /**
     * method : unmute (public)
     * class  : App
     * desc   : Unmute playback
     **/
    unmute() {
        this.player.unmute();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _appStart (private)
     * class  : App
     * desc   : ManaZeak start point. Fetching playlist, build UI according to those, and activate the last playlist used
     **/
    _appStart(playlists) {
        let that = this;
        if (playlists.DONE) { // User already have playlists
            let modal = new Modal("fetchPlaylists"); // TODO : gen unique ID from utils here
            modal.open();

            for (let i = 0; i < playlists.PLAYLIST_IDS.length; ++i) {
                that.playlists.push(new Playlist(playlists.PLAYLIST_IDS[i],
                    playlists.PLAYLIST_NAMES[i],
                    playlists.PLAYLIST_IS_LIBRARY[i],
                    true,
                    undefined,
                    undefined));
            }

            this.topBar.init(this.playlists, this.playlists[0]);
            this.playlists[0].getPlaylistsTracks(function() {
                modal.close();
                that.changePlaylist();
                that.footBar.playlistPreview.setVisible(true);
                // TODO : replace begin arg to the active playlists, to avoid loading it
                that.getAllPlaylistsTracks(1); // 1 stand for the beginning of the loop in playlists
            });
        }

        else if (playlists.ERROR_H1 === "null" && playlists.ERROR_MSG === "null") { // User first connection
            this.playlists.push(new Playlist(0, null, true, false, undefined, function() {
                that.playlists[0].activate();
                that.topBar.init(that.playlists, that.playlists[0]);
                that.footBar.playlistPreview.setVisible(true);
                that.footBar.playlistPreview.changePlaylist(that.playlists[0]); // TODO : get Lib/Play image/icon
                // ? that.activePlaylist = that.playlists[0];
            }));
        }

        else {
            new Notification("ERROR", playlists.ERROR_H1, playlists.ERROR_MSG);
        }

        this._keyListener();
    }

    /**
     * method : _createDefaultViews (private)
     * class  : App
     * desc   : Create AppViews (Stats, Admin)
     **/
    _createDefaultViews() {
        this.createAppView('mzk_stats', new StatsView());
        this.createAppView('mzk_admin', new AdminView());
    }


    /**
     * method : _keyListener (private)
     * class  : App
     * desc   : App key listeners
     **/
    _keyListener() { // TODO : put this someday in a Shortcut class (in Utils maybe ?)
        let that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 32: // Space player
                    that.togglePlay();
                    break;
                case 37: // Left arrow
                    if (event.ctrlKey)
                        that.rewind(30);
                    else
                        that.rewind(10);
                    break;
                case 38: // Up arrow
                    that.footBar.volumeUp(event);
                    break;
                case 39: // Right arrow
                    if (event.ctrlKey)
                        that.fastForward(30);
                    else
                        that.fastForward(10);
                    break;
                case 40: // Down arrow
                    that.footBar.volumeDown(event);
                    break;
                case 77: // m key (w/ ctrl)
                    if (event.ctrlKey)
                        that.toggleMute(event);
                    break;
                case 81:
                    if (event.ctrlKey)
                        that.toggleQueue(event);
                    break;
                default:
                    break;
            }
        });
        // Key released event
        document.addEventListener("keyup", function(event) {
            switch (event.keyCode) {
                case 38: // Up arrow
                    that.footBar.delayHideVolume();
                    break;
                case 40: // Down arrow
                    that.footBar.delayHideVolume();
                    break;
                default:
                    break;
            }
        });
    }

}

//TODO: Closure or something
let addonSrcs = document.querySelectorAll('script[data-script-type="appAddon"]');
for (let i = 0; i < addonSrcs.length; ++i) {
    addonSrcs[i].src = addonSrcs[i].dataset.src;
}
