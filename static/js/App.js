/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  App class                                      *
 *                                                 *
 *  ManaZeak main class, orchestrate all the front *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class App extends MzkObject {
    constructor() {
        super();

        this.cookies          = getCookies();
        this.user             = new User();
        this.dragdrop         = new DragDrop(document.body);
        this.mainContainer    = document.createElement("DIV");
        this.mainContainer.id = "mainContainer";
        this.footBar          = null;
        this.player           = null;
        this.playlists        = new PlaylistCollection();
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

        document.body.appendChild(this.mainContainer);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

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
        let duration_played = (this.player.getCurrentTime() * 100) / this.player.getDuration();
        JSONParsedPostRequest(
            "ajax/getTrackPathByID/",
            JSON.stringify({
                TRACK_ID:        track.id.track,
                LAST_TRACK_PATH: lastTrackPath,
                TRACK_PER:       isNaN(duration_played) ? 0 : duration_played,
                PREVIOUS:        previous
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
                    that.player.changeSource(".." + response.PATH, track.id.track);
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
        if (view.getContainer().id === "party") {
            view.setIsEnabled(true);
            document.body.appendChild(view.getContainer());
        }

        else {
            this.mainContainer.innerHTML = '';
            this.mainContainer.appendChild(view.getContainer());
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
     * arg    : {function} callback - Not mandatory
     **/
    deletePlaylist(id, callback) {
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
                    that.playlists.remove(id);
                    that.playlists.getDefault().activate(); // TODO : test if there is still some playlists
                    that.refreshTopBar();
                    that.refreshFootBar();

                    if (callback) {
                        callback();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    deleteUser(id, callback) {
        JSONParsedPostRequest(
            "ajax/removeUserById/",
            JSON.stringify({
                USER_ID: id
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    callback();
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
     * method : getPlaylistFromId (public)
     * class  : App
     * desc   : Returns a playlist from a given ID
     * arg    : {int} id - The playlist to get from an ID
     **/
    getPlaylistFromId(id) {
        this.playlists.remove(id);
    }


    /**
     * method : getPlaylists (public)
     * class  : App
     * desc   : Get user playlists only
     * return : {object} element
     **/
    getPlaylists() {
        return this.playlists.filter(function() {
            return this.getIsLibrary();
        });
    }


    hidePageContent() {
        addInvisibilityLock(this.footBar.getFootBar());
        addInvisibilityLock(this.mainContainer);
        addInvisibilityLock(this.topBar.getTopBar());
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
        if (this.appViews["mzk_party"].getIsEnabled()) {
            return;
        }

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

        if (!this.player.isEmpty()) {
            this.footBar.progressBar.refreshInterval(this.player.getPlayer());
        }
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
                    let target = that.playlists.get(id);
                    if(target != null) {
                        target.setName(name);
                        that.playlists.getDefault().activate(); // TODO : test if there is still some playlists
                    }
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

        this.playlists.add(new Playlist(0, null, false, false, undefined, function() {
            that.playlists.getDefault().activate();
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

        this.playlists.add(new Playlist(0, null, true, false, undefined, function() {
            that.playlists.getDefault().activate();
            that.refreshTopBar();
            that.refreshFootBar();
        }));
    }


    restorePageContent() {
        removeInvisibilityLock(this.footBar.getFootBar());
        removeInvisibilityLock(this.mainContainer);
        removeInvisibilityLock(this.topBar.getTopBar());
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
        switch(this.activePlaylist.getRepeatMode()) {
            case 0:
                new Notification("INFO", "Change repeat mode", "Repeat off - Playback will stop by the end of your playlist.");
                break;
            case 1:
                new Notification("INFO", "Change repeat mode", "Repeat one - The current track will be repeated for ever.");
                break;
            case 2:
                new Notification("INFO", "Change repeat mode", "Repeat all - Repeat your playlist for ever.");
                break;
            default:
                break;
        }
    }


    /**
     * method : toggleShuffle (public)
     * class  : App
     * desc   : Toggle shuffle mode on playlist
     **/
    toggleShuffle() {
        this.activePlaylist.toggleShuffle();
        switch(this.activePlaylist.getShuffleMode()) {
            case 0:
                new Notification("INFO", "Change shuffle mode", "Shuffle off - Playback will follow your current view order.");
                break;
            case 1:
                new Notification("INFO", "Change shuffle mode", "Random on - Random With track repetition");
                break;
            case 2:
                new Notification("INFO", "Change shuffle mode", "Shuffle on - Random with no track repetition");
                break;
            default:
                break;
        }
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
                that.playlists.add(new Playlist(playlists.PLAYLIST_IDS[i],
                    playlists.PLAYLIST_NAMES[i],
                    playlists.PLAYLIST_IS_LIBRARY[i],
                    true,
                    undefined,
                    undefined));
            }

            let defPlaylist = this.playlists.getDefault();
            this.topBar.init(this.playlists.filter(function() {return true;}), defPlaylist);
            defPlaylist.getPlaylistsTracks(function() {
                modal.close();
                that.changePlaylist();
                that.footBar.playlistPreview.setVisible(true);
                // TODO : replace begin arg to the active playlists, to avoid loading it
                that.playlists.forEach(function() {
                    this.getPlaylistsTracks();
                }, false);
            });
        }

        else if (playlists.ERROR_H1 === "null" && playlists.ERROR_MSG === "null") { // User first connection
            this.playlists.add(new Playlist(0, null, true, false, undefined, function() {
                let defPlaylist = that.playlists.getDefault();
                that.topBar.init(that.playlists.filter(function() {return true;}), defPlaylist);
                that.footBar.playlistPreview.setVisible(true);
                that.footBar.playlistPreview.changePlaylist(defPlaylist); // TODO : get Lib/Play image/icon
                // ? that.activePlaylist = defPlaylist;
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
        this.createAppView('mzk_settings', new SettingsView());
        this.createAppView('mzk_party', new PartyView());
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