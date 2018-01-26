/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  App class                                      *
 *                                                 *
 *  ManaZeak main class, orchestrate all the front *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { getCookies, JSONParsedGetRequest, JSONParsedPostRequest, getRequest } from './utils/Utils.js'
import FootBar  from './components/FootBar.js'
import MzkObject from './core/MzkObject.js'
import TopBar   from './components/TopBar.js'
import User     from './core/User.js'
import DragDrop from './components/DragDrop.js'
import PlaylistCollection from './core/PlaylistCollection.js'
import ShortcutMaestro from './utils/ShortcutMaestro.js'
import Shortcut from './utils/Shortcut.js'
import Queue    from './core/Queue.js'
import Player   from './core/Player.js'
import StatsView from './views/appviews/StatsView.js'
import AdminView from './views/appviews/AdminView.js'
import UserView from './views/appviews/UserView.js'
import PartyView from './views/appviews/PartyView.js'
import ListView from './views/ListView.js'
import Playlist from './core/Playlist.js'
import Notification from './utils/Notification.js'
import Modal from './utils/Modal.js'

class App extends MzkObject {

    constructor() {
        super();
        this.cookies          = getCookies();
        this.user             = new User();
        this.dragdrop         = new DragDrop(document.body);
        this.mainContainer    = document.createElement("DIV");
        this.mainContainer.id = "mainContainer";
        this.topBar           = null;
        this.footBar          = null;
        this.player           = null;
        this.playlists        = new PlaylistCollection();
        this.activePlaylist   = null;
        this.cssFiles         = {};
        this.appViews         = {};
        this._createDefaultViews();
        this.shortcutMaestro  = new ShortcutMaestro();
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
        this._consoleWelcome();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addTracksToPlaylist (public)
     * class  : App
     * desc   : Add tracks to a playlist, including server-side
     * arg    : {object} playlist
     *          {array}  tracks
     **/
    addTracksToPlaylist(playlist, tracks) {
        let ids    = new Array(tracks.length);
        let names  = '';
        for (let i = 0; i < tracks.length; ++i) {
            ids[i] = tracks[i].id.track;
            names += tracks[i].title + ',';
        }

        JSONParsedPostRequest(
            "playlist/addTracks/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id,
                TRACKS_ID:   ids
            }),
            (response) => {
                /* response = {
                 *     DONE         : bool
                 *     ERROR_H1     : string
                 *     ERROR_MSG    : string
                 * } */
                if (response.DONE) {
                    new Notification("INFO", "Tracks added to " + playlist.name, names + " have been added to " + playlist.name + ".");
                    playlist.getPlaylistsTracks();
                } else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR.MSG);
                }
            }
        );
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
     * method : getActivePlaylist (public)
     * class  : App
     * desc   : Returns the active playlist
     *
     **/
    getActivePlaylist() {
        return this.activePlaylist ? this.activePlaylist : null;
    }


    /**
     * method : getVolume (public)
     * class  : App
     * desc   : return the current volume
     **/
    getVolume() {
        return this.player.getVolume();
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Change the active playlist
     **/
    changePlaylist(playlistID) {
        let newActive = playlistID != null ? this.playlists.get(playlistID) : this.playlists.getDefault();
        if (newActive) {
            this.activePlaylist = newActive;
            this.activePlaylist.activate();
            return true;
        }
        this.activePlaylist = null;
        return false;
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Update FootBar PlaylistPreview
     * arg    : {object} track - The track to set as current
     *          {bool} previous - For server about history
     **/
    changeTrack(track, previous) {
        if (track == null) {
            return false;
        }

        let that            = this;
        let lastTrackPath   = this.player.player.attributes.getNamedItem("src"); // To update statistic on the previous track

        if (lastTrackPath !== null) {
            lastTrackPath   = lastTrackPath.value;
        }

        else {
            lastTrackPath   = "None";
        }

        let duration_played = (this.player.getCurrentTime() * 100) / this.player.getDuration();
        JSONParsedPostRequest(
            "track/getPath/",
            JSON.stringify({
                TRACK_ID:         track.id.track,
                LAST_TRACK_PATH:  lastTrackPath,
                TRACK_PERCENTAGE: isNaN(duration_played) ? 0 : duration_played,
                PREVIOUS:         previous
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     TRACK_PATH  : string
                 * } */
                if (response.DONE) {
                    that.player.changeSource(".." + response.TRACK_PATH, track.id.track);
                    that.changePageTitle(response.TRACK_PATH);
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
        for (let i = 0; i < this.mainContainer.children.length; ++i) {
            this.mainContainer.children[i].classList.add('mzk-view-hide');
        }

        let container = view.getContainer();
        container.classList.remove('mzk-view-hide');
        if (container.parentNode != this.mainContainer) {
            this.mainContainer.appendChild(container);
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
    deletePlaylist(playlist, callback) {
        let that = this;
        JSONParsedPostRequest(
            "collection/delete/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    that.playlists.remove(playlist.id);
                    let nextPlaylist = that.playlists.getDefault();
                    if (nextPlaylist != null) {
                        that.changePlaylist(nextPlaylist.id);
                    }

                    else {
                        that.mainContainer.innerHTML = '';
                        that.requestNewLibrary();
                    }

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


    /**
     * method : deleteUser (public)
     * class  : App
     * desc   : Remove a user from DB via its ID
     * arg    : {int} id - The user ID to delete
     *        : {function} callback - The function to callback - Mandatory
     **/
    deleteUser(id, callback) {
        JSONParsedPostRequest(
            "admin/removeUserById/",
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
     * method : downloadTrack (public)
     * class  : App
     * desc   : Download a single track
     * arg    : {object} track - The track to download
     **/
    downloadTrack(track) {
        JSONParsedPostRequest(
            "track/download/",
            JSON.stringify({
                TRACK_ID: track.id.track
            }),
            function (response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     DOWNLOAD_PATH : string
                 * } */
                if (response.DONE) {
                    let dl      = document.createElement("A");
                    dl.href     = response.DOWNLOAD_PATH;
                    dl.download = response.DOWNLOAD_PATH.replace(/^.*[\\\/]/, '');
                    document.body.appendChild(dl);
                    dl.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    document.body.removeChild(dl);
                    //TODO: What is ZEAZZZZ ???!!!
                    dl.remove();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : downloadTracksZip (public)
     * class  : App
     * desc   : Download mutliple tracks
     * arg    : {[object]} tracks - The tracks to download
     **/
    downloadTracksZip(tracks) {
        let ids    = new Array(tracks.length);
        for (let i = 0; i < tracks.length; ++i) {
            ids[i] = tracks[i].id.track;
        }

        JSONParsedPostRequest(
            "track/multiDownload/",
            JSON.stringify({
                TRACKS_ID: ids
            }),
            function (response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     DOWNLOAD_PATH      : string
                 * } */
                if (response.DONE) {
                    let dl      = document.createElement("A");
                    dl.href     = response.DOWNLOAD_PATH;
                    dl.download = response.DOWNLOAD_PATH.replace(/^.*[\\\/]/, '');
                    document.body.appendChild(dl);
                    dl.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    document.body.removeChild(dl);
                    //TODO: What is ZEAZZZZ ???!!!
                    dl.remove();
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
     * method : getPlaylistFromId (public)
     * class  : App
     * desc   : Returns a playlist from a given ID
     * arg    : {int} id - The playlist to get from an ID
     **/
    getPlaylistFromId(id) {
        this.playlists.get(id);
    }


    /**
     * method : getPlaylists (public)
     * class  : App
     * desc   : Get user playlists only
     * return : {object} element
     **/
    getPlaylists() {
        return this.playlists.filter(function() {
            return this.getIsLibrary() == false;
        });
    }


    /**
     * method : getShortcutMaestro (public)
     * class  : App
     * desc   : Get the shortcut maestro
     **/
    getShortcutMaestro() {
        return this.shortcutMaestro;
    }


    /**
     * method : hidePageContent (public)
     * class  : App
     * desc   : Hide any content in mainContainer
     **/
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
        JSONParsedGetRequest( // Loading playlists
            "playlist/fetchAll/",
            function(response) {
                /* response = {
                 *     DONE                : bool
                 *     ERROR_H1            : string
                 *     ERROR_MSG           : string
                 *
                 *     PLAYLIST_IDS        : int[] / undefined
                 *     PLAYLIST_NAMES      : string[] / undefined
                 *     PLAYLIST_IS_LIBRARY : bool[] / undefined
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
        if (this.queue.isEmpty() == false) {
            this.popQueue();
        }

        else {
            this.activePlaylist.playNextTrack();
        }
    }


    /**
     * method : playerLoadedMetadata
     * class  : App
     * desc   : fired when the player has loaded the file metadata
     **/
    playerLoadedMetadata() {

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
     * method : removeTracksFromPlaylist (public)
     * class  : App
     * desc   : Request tracks to be deleted from the playlist
     * arg    : {object} Playlist
     *          {array}  tracks;
     */
    removeTracksFromPlaylist(playlist, tracks) {
        let ids    = new Array(tracks.length);
        let names  = '';
        for (let i = 0; i < tracks.length; ++i ) {
            ids[i] = tracks[i].id.track;
            names += tracks[i].title + ',';
        }

        JSONParsedPostRequest(
            "playlist/removeTracks/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id,
                TRACKS_ID:   ids
            }),
            function (response) {
                /* response = {
                 *     DONE           : bool
                 *     ERROR_H1       : string
                 *     ERROR_MSG      : string
                 * } */
                if (response.DONE) {
                    new Notification("INFO", "Tracks removed from " + playlist.name, names + " have been removed from " + playlist.name + ".");
                    playlist.getPlaylistsTracks();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR.MSG);
                }
            });
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
            "playlist/rename/",
            JSON.stringify({
                PLAYLIST_ID:   id,
                PLAYLIST_NAME: name
            }),
            function(response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     PLAYLIST_ID   : string
                 *     PLAYLIST_NAME : string
                 * } */
                if (response.DONE) {
                    that.playlists.rename(response.PLAYLIST_ID, response.PLAYLIST_NAME);
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
        let np = new Playlist(0, null, false, false, undefined, function() {
            that.playlists.add(np);
            that.changePlaylist(np.id);
        });
    }


    /**
     * method : requestNewLibrary (public)
     * class  : App
     * desc   : Admin requested a new library
     **/
    requestNewLibrary() {
        let that = this;
        let nl = new Playlist(0, null, true, false, undefined, function() {
            that.playlists.add(nl);
            that.changePlaylist(nl.id);
        });
    }


    /**
     * method : hidePageContent (public)
     * class  : App
     * desc   : Restore any content in mainContainer
     **/
    restorePageContent() {
        this.activePlaylist.activate();
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
        this.player.setVolume(volume);
    }


    /**
     * method : stopPlayback (public)
     * class  : App
     * desc   : Stop ManaZeak playback
     **/
    stopPlayback() {
        this.changePageTitle("ManaZeak");
        this.player.stopPlayback();
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


    /**
     * method : updateTracksInfo (public)
     * class  : App
     * desc   : Update a track metadata
     * arg    : {array}      tracks- The Track object that will be used for the update
     *          {function} callback - The function to callback (not mandatory)
     **/
    updateTracksInfo(tracks, callback) {
        let ids = new Array(tracks.length);
        for(let i = 0; i < tracks.length; ++i)
            ids[i] = tracks[i].id.track;
        JSONParsedPostRequest(
            "track/getDetailedInfo/",
            JSON.stringify({
                TRACK_ID: ids
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     RESULT    : {
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         TRACK_NUMBER:
                 *         BPM:
                 *         LYRICS:
                 *         COMMENT:
                 *         BITRATE:
                 *         SAMPLERATE:
                 *         DURATION:
                 *         GENRE:
                 *         FILE_TYPE:
                 *         DISC_NUMBER:
                 *         SIZE:
                 *         LAST_MODIFIED:
                 *         COVER:
                 *         ARTISTS: {
                 *            ID:
                 *            NAME:
                 *         }
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *             TOTAL_DISC:
                 *             TOTAL_TRACK:
                 *             ARTISTS: {
                 *                 ID:
                 *                 NAME:
                 *             }
                 *         }
                 *         PLAY_COUNTER:
                 *         FILE_NAME:
                 *     }
                 * } */
                if (response.DONE) {
                    for(let i = 0; i < tracks.length; ++i)
                        tracks[i].updateMetadata(response.RESULT[i]);
                    if (callback) { callback(); }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
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
            defPlaylist.getPlaylistsTracks(function() {
                modal.close();
                that.changePlaylist(that.playlists.getDefault().id);
                that.playlists.forEach(function() {
                    this.getPlaylistsTracks();
                }, false);
            });
        }

        else if (playlists.ERROR_H1 === "null" && playlists.ERROR_MSG === "null") { // User first connection
            this.requestNewLibrary();
        }

        else {
            new Notification("ERROR", playlists.ERROR_H1, playlists.ERROR_MSG);
        }

        this._keyListener();
    }


    _consoleWelcome() {
        let cssRuleTitle  = "color: rgb(44, 44, 48);" +
                            "font-size: 3em;" +
                            "font-weight: bold;" +
                            "margin: 20px 0;" +
                            "text-shadow: 1px 1px 5px rgb(44, 44, 48);";
        let cssRuleHidden = "color: rgb(255, 255, 255);";
        setTimeout(console.log.bind(console, "%cManaZeak console", cssRuleTitle)); // Hiding source in console
        setTimeout(console.log.bind(console, "Hello there!\n" +
                                             "\nIf you don't know why you are here, you may close this window, and keep using ManaZeak." +
                                             "\nOtherwise, keep in mind that using this console may result in a non working app, at least on your side. "));
        setTimeout(console.log.bind(console, "%cCongratulation, you found the first key for the achievement TOAST. Here it is : ba6f7979ab2cb9096d050b7f850d50ff", cssRuleHidden));
        setTimeout(console.log.bind(console, "To know more about ManaZeak, visit https://github.com/Squadella/ManaZeak"));
        setTimeout(console.log.bind(console, "\n-----------"));
    }


    /**
     * method : _createDefaultViews (private)
     * class  : App
     * desc   : Create AppViews (Stats, Admin)
     **/
    _createDefaultViews() {
        this.createAppView('mzk_stats', new StatsView());
        this.createAppView('mzk_admin', new AdminView());
        this.createAppView('mzk_settings', new UserView());
        this.createAppView('mzk_party', new PartyView());
    }


    /**
     * method : _keyListener (private)
     * class  : App
     * desc   : App key listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new Shortcut('keydown', 'Space', function() { that.togglePlay(); }));
        this.addShortcut(new Shortcut('keydown', 'Semicolon', function() { that.toggleMute(); }));
        this.addShortcut(new Shortcut('keydown', 'ArrowLeft', function() { that.rewind(10); }, false));
        this.addShortcut(new Shortcut('keydown', 'ArrowLeft', function() { that.rewind(30); }, true));
        this.addShortcut(new Shortcut('keydown', 'ArrowRight', function() { that.fastForward(10); }, false));
        this.addShortcut(new Shortcut('keydown', 'ArrowRight', function() { that.fastForward(30); }, true));
        this.addShortcut(new Shortcut('keydown', 'ArrowUp', function() { that.adjustVolume(0.1); }, false));
        this.addShortcut(new Shortcut('keydown', 'ArrowUp', function() { that.adjustVolume(0.01); }, true));
        this.addShortcut(new Shortcut('keydown', 'ArrowDown', function() { that.adjustVolume(-0.1); }, false));
        this.addShortcut(new Shortcut('keydown', 'ArrowDown', function() { that.adjustVolume(-0.01); }, true));
    }

}

export default App