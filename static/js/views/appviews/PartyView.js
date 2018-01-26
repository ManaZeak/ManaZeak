/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  PartyView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import Track from '../../core/Track.js'
import View from '../../core/View.js'

class PartyView extends View {

    constructor() {
        super();
        this._createUI();
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : _createUI (public)
     * class  : PartyView
     * desc   : Returns container while fetching details about current track in player
     **/
    getContainer() {
        this._setPlayPause();

        let that = this;
        JSONParsedPostRequest(
            "track/getDetailedInfo/",
            JSON.stringify({
                TRACK_ID: [window.app.player.getSourceID()]
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
                    that._setCurrentTrack(new Track(response.RESULT[0]));
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );

        return this.ui.container;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PartyView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:          this.container,

            sparksContainer:    document.createElement("DIV"),
            sparksLayer1:       document.createElement("DIV"),
            sparksLayer2:       document.createElement("DIV"),
            sparksLayer3:       document.createElement("DIV"),
            sparksLayer4:       document.createElement("DIV"),

            trackContainer:     document.createElement("DIV"),
            trackCover:         document.createElement("IMG"),

            trackInfoContainer: document.createElement("DIV"),
            trackTitle:         document.createElement("H1"),
            trackArtist:        document.createElement("H2"),
            trackComposer:      document.createElement("H3"),
            trackYearAlbum:     document.createElement("H3"),
            trackGenre:         document.createElement("H3"),

            close:              document.createElement("IMG"),
            previous:           document.createElement("IMG"),
            play:               document.createElement("IMG"),
            next:               document.createElement("IMG"),
        };

        this.ui.container.id             = "party";
        // Smells like Grafikart here ;) (https://www.youtube.com/watch?v=rV6Xgb_4FFo)
        this.ui.sparksContainer.id       = "snow";
        this.ui.sparksLayer1.id          = "snow-layer";
        this.ui.sparksLayer2.id          = "snow-layer";
        this.ui.sparksLayer3.id          = "snow-layer";
        this.ui.sparksLayer4.id          = "snow-layer";

        this.ui.trackContainer.id        = "trackContainer";
        this.ui.trackCover.src           = "/static/img/utils/defaultcover.svg";

        this.ui.trackInfoContainer.id    = "partyTrackInfo";
        this.ui.trackTitle.id            = "a";
        this.ui.trackArtist.id           = "b";
        this.ui.trackComposer.id         = "c";
        this.ui.trackYearAlbum.id        = "d";
        this.ui.trackGenre.id            = "e";

        this.ui.close.id                 = "close";
        this.ui.previous.id              = "previous";
        this.ui.play.id                  = "play";
        this.ui.next.id                  = "next";

        this.ui.close.src                = "/static/img/utils/idea.svg"; // TODO : add ManaZeak log + tooltip
        this.ui.previous.src             = "/static/img/player/previous.svg";
        this.ui.play.src                 = "/static/img/player/play.svg";
        this.ui.next.src                 = "/static/img/player/next.svg";

        this.ui.sparksContainer.appendChild(this.ui.sparksLayer1);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer2);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer3);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer4);

        this.ui.trackInfoContainer.appendChild(this.ui.trackTitle);
        this.ui.trackInfoContainer.appendChild(this.ui.trackArtist);
        this.ui.trackInfoContainer.appendChild(this.ui.trackComposer);
        this.ui.trackInfoContainer.appendChild(this.ui.trackYearAlbum);
        this.ui.trackInfoContainer.appendChild(this.ui.trackGenre);

        this.ui.trackContainer.appendChild(this.ui.trackCover);
        this.ui.trackContainer.appendChild(this.ui.trackInfoContainer);

        this.ui.container.appendChild(this.ui.sparksContainer);
        this.ui.container.appendChild(this.ui.trackContainer);
        this.ui.container.appendChild(this.ui.close);
        this.ui.container.appendChild(this.ui.previous);
        this.ui.container.appendChild(this.ui.play);
        this.ui.container.appendChild(this.ui.next);
    }


    /**
     * method : _eventListener (private)
     * class  : PartyView
     * desc   : PartyView event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.close.addEventListener("click", function() {
            window.app.restorePageContent();
        });
        this.ui.play.addEventListener("click", function() {
            window.app.togglePlay();
            that._setPlayPause();
        });
        this.ui.next.addEventListener("click", function() {
            window.app.next();
        });
    }


    /**
     * method : _setPlayPause (private)
     * class  : PartyView
     * desc   : Change Play/Pause button depending on player status
     **/
    _setPlayPause() {
        if (window.app.player.getIsPlaying() === true) {
            this.ui.play.src = "/static/img/player/pause.svg";
        }

        else {
            this.ui.play.src = "/static/img/player/play.svg";
        }
    }


    /**
     * method : _setCurrentTrack (private)
     * class  : PartyView
     * desc   : Change current track in view
     **/
    _setCurrentTrack(track) {
        this.ui.trackCover.src           = track.cover;
        this.ui.trackTitle.innerHTML     = track.title;
        this.ui.trackArtist.innerHTML    = track.artist;
        this.ui.trackComposer.innerHTML  = track.composer;
        this.ui.trackYearAlbum.innerHTML = track.year + " - " + track.album;
        this.ui.trackGenre.innerHTML     = track.genre;
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

}

export default PartyView