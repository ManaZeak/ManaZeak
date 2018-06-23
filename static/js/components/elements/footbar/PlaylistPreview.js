/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  PlaylistPreview class                          *
 *                                                 *
 *  Handle the playlist info container             *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { secondsToTimecode } from '../../../utils/Utils.js'
import MzkObject from '../../../core/MzkObject.js'

class PlaylistPreview extends MzkObject {

    constructor(container) {
        super();

        this.LOG = true; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview construction');
        }

        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changePlaylist (public)
     * class  : PlaylistPreview
     * desc   : Change track details
     * arg    : {object} playlist - New playlist to get info from
     **/
    changePlaylist(playlist) {
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview : changePlaylist call');
        }

        // TODO : POST on getPlaylistInfo to add Total genre etc.
        this.ui.name.innerHTML     = playlist.name;
        this.ui.total.innerHTML    = playlist.trackTotal + ' ' + (playlist.trackTotal > 1 ? window.app.nls.utils.tracks : window.app.nls.utils.track);
        this.ui.duration.innerHTML = secondsToTimecode(playlist.durationTotal);
        this._updatePlaylistPreview();
    }


    /**
     * method : setVisible (public)
     * class  : PlaylistPreview
     * desc   : Change visibility status of PlaylistPreview
     * arg    : {bool} visible
     **/
    setVisible(visible) {
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview : setVisible call');
        }

        this.ui.container.style.opacity = visible ? 1 : 0;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PlaylistPreview
     * desc   : Build UI elements
     * arg    : {object} container - The PlaylistPreview container
     **/
    _createUI(container) {
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview : _createUI call');
        }

        this.ui = {
            container:     document.createElement("DIV"),
            name:          document.createElement("LI"),
            total:         document.createElement("LI"),
            duration:      document.createElement("LI"),
            repeatShuffle: document.createElement("LI"),
            repeat:        document.createElement("SPAN"),
            genre:         document.createElement("SPAN"),
            shuffle:       document.createElement("SPAN")
        };
        this.listContainer = document.createElement("UL");

        this.ui.container.className = "mzk-playlist-review";

        this.ui.repeatShuffle.appendChild(this.ui.repeat);
        this.ui.repeatShuffle.appendChild(this.ui.shuffle);
        this.listContainer.appendChild(this.ui.name);
        this.listContainer.appendChild(this.ui.total);
        this.listContainer.appendChild(this.ui.duration);
        this.listContainer.appendChild(this.ui.repeatShuffle);
        this.ui.container.appendChild(this.listContainer);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : PlaylistPreview
     * desc   : PlaylistPreview event listeners
     **/
    _eventListener() {
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview : _eventListener call');
        }

        let that = this;
        window.app.listen(['renamePlaylist', 'changePlaylist'], function() {
            let activePlaylist = window.app.getActivePlaylist();
            if (activePlaylist != null) {
                that.changePlaylist(activePlaylist);
                that.setVisible(true);
            }

            else {
                that.setVisible(false);
            }
        });
        window.app.listen(['toggleRepeat', 'toggleShuffle'], function() {
            that._updatePlaylistPreview();
        });
    }


    /**
     * method : _updatePlaylistPreview (private)
     * class  : PlaylistPreview
     * desc   : Update shuffle and repeat mode
     **/
    _updatePlaylistPreview() {
        if (window.debug && this.LOG) {
            console.log('      PlaylistPreview : _updatePlaylistPreview call');
        }

        let repeatMode  = window.app.activePlaylist.getRepeatMode();
        let shuffleMode = window.app.activePlaylist.getShuffleMode();

        switch (repeatMode) {
            case 0:
                this.ui.repeat.innerHTML = window.app.nls.playlistPreview.repeatOff;
                break;

            case 1:
                this.ui.repeat.innerHTML = window.app.nls.playlistPreview.repeatOne;
                break;

            case 2:
                this.ui.repeat.innerHTML = window.app.nls.playlistPreview.repeatAll;
                break;

            default:
                new Notification("ERROR", "Unknown repeat mode value", "Something went wrong with the repeat mode value.");
                break;
        }

        switch (shuffleMode) {
            case 0:
                this.ui.shuffle.innerHTML = ' - ' + window.app.nls.playlistPreview.shuffleOff;
                break;

            case 1:
                this.ui.shuffle.innerHTML = ' - ' + window.app.nls.playlistPreview.random;
                break;

            case 2:
                this.ui.shuffle.innerHTML = ' - ' + window.app.nls.playlistPreview.shuffleOn;
                break;

            default:
                new Notification("ERROR", "Unknown shuffle mode value", "Something went wrong with the shuffle mode value.");
                break;
        }
    }

}

export default PlaylistPreview