/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TrackInfo class                                *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { secondsToTimecode, JSONParsedPostRequest, setCookie, getCookies } from '../../utils/Utils.js'


const TOTAL_SUGGESTIONS_NUMBER = 4; // Number of track to display in suggested tracks
const TOTAL_SUGGESTIONS_MODES  = 3; // Number of suggestion mode (see trackSuggestionMode in constructor)

class TrackInfo {

    constructor(container) {
        this.inactivityTimeoutId = -1;    // ID for the inactivity timeout
        this.trackSuggestionMode = 0;     // 0: By Artists / 1: By Album / 2: By Genre
        this.track               = null;  // Track that triggered TrackInfo in view
        this.locked              = false; // TrackInfo lock status
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : isVisible (public)
     * class  : TrackInfo
     * desc   : Returns true if TrackInfo is visible
     **/
    isVisible() {
        return this.ui.container.style.opacity == 1;
    }


    /**
     * method : setVisible (public)
     * class  : TrackInfo
     * desc   : Set TrackInfo visibility. Must be fired in updateInfo() callback
     * arg    : {bool} visible - The visibility status to set
     **/
    setVisible(visible) {
        if (this.locked === true) {
            return;
        }

        if (visible === true) {
            this.ui.container.style.opacity    = 1;
            this.ui.container.style.zIndex     = 0;

            this._startInactivityTimeout(5000);  // If mouse doesn't move for 5 seconds outside the TrackInfo container, it's closed.
        }

        else {
            let that = this;

            this.ui.container.style.opacity    = 0;
            window.setTimeout(function() {
                that.ui.container.style.zIndex = -1;
            }, 100); // 100ms bc of transition time in #TrackInfo - _trackinfo.scss
        }
    }


    /**
     * method : updateGeometry (public)
     * class  : TrackInfo
     * desc   : Set the new position of the TrackInfo container depending on the targeted entry's boundingRect.
     * arg    : {object} rect - The view entry boundingRect
     *          {int}  offset - The left offset to open TrackInfo with
     **/
    updateGeometry(rect, offset) {
        this.ui.container.style.top    = (rect.top - 24) + "px";
        this.ui.container.style.left   = (rect.left + offset + 8) + "px"; // 8 come from the padding in col-title
        this.ui.container.style.height = "200px";
        this.ui.container.style.width  = "auto";
    }


    /**
     * method : updateInfo (public)
     * class  : TrackInfo
     * desc   : Update all elements in TrackInfo container and fetch suggested track according to the given track
     * arg    : {object}      track - The Track object that will be used for the update
     *          {function} callback - The function to callback (not mandatory)
     **/
    updateInfo(track, callback) {
        let that = this;
        window.app.updateTracksInfo([track], function() {
            that.track                        = track;
            that.ui.cover.src                 = track.cover;
            that.ui.title.innerHTML           = track.title;
            that.ui.artist.innerHTML          = track.artist;
            that.ui.albumArtist.innerHTML     = "Album Artists : " + track.albumArtist;
            that.ui.composer.innerHTML        = "Composer : " + track.composer;
            that.ui.performer.innerHTML       = "Performer : " + track.performer;
            that.ui.genre.innerHTML           = "Genre : " + track.genre;
            that.ui.album.innerHTML           = track.year + " - " + track.album;
            that.ui.numbers.innerHTML         = "track 1 / 12&nbsp;-&nbsp;disc 1 / 1";
            that.ui.trackDetails.innerHTML    = secondsToTimecode(track.duration) + " - " +
                                                    track.fileType + " - " +
                                                    Math.round(track.bitRate / 1000) + " kbps - " +
                                                    track.sampleRate + " Hz";
            // TODO : add total played and other interesting stats about track
            that._updateSuggestionMode();
            that._updateSuggestionTracks();
            callback();
        });
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : TrackInfo
     * desc   : Build and append UI elements to parent
     * arg    : {object} container - The TrackInfo container
     **/
    _createUI(container) {
        this.ui = {
            container:            document.createElement("DIV"),
            cover:                document.createElement("IMG"),
            numbers:              document.createElement("P"),

            trackWrapper:         document.createElement("DIV"),
            title:                document.createElement("P"),
            artist:               document.createElement("P"),
            albumArtist:          document.createElement("P"),
            composer:             document.createElement("P"),
            performer:            document.createElement("P"),
            genre:                document.createElement("P"),
            album:                document.createElement("P"),
            trackDetails:         document.createElement("P"),

            suggestionWrapper:    document.createElement("DIV"),
            suggestionTitle:      document.createElement("P"),
            suggestionList:       document.createElement("UL"),

            changeSuggestionType: document.createElement("IMG")
        };

        this.ui.container.id              = "trackInfo";
        this.ui.trackWrapper.id           = "trackWrapper";
        this.ui.title.id                  = "title";
        this.ui.album.id                  = "album";
        this.ui.numbers.id                = "numbers";
        this.ui.genre.id                  = "album";
        this.ui.suggestionWrapper.id      = "suggestionWrapper";
        this.ui.suggestionTitle.id        = "title";
        this.ui.changeSuggestionType.src  = "";

        this.tracks = [];

        // TODO : entries subClass in here for deaz
        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.tracks[i] = {
                ui:        null,
                id:        null,
                duration:  null,
                title:     null,
                performer: null
            };

            this.tracks[i].ui = document.createElement("LI");
            this.ui.suggestionList.appendChild(this.tracks[i].ui);
        }

        this.ui.trackWrapper.appendChild(this.ui.title);
        this.ui.trackWrapper.appendChild(this.ui.artist);
        this.ui.trackWrapper.appendChild(this.ui.album);
        this.ui.trackWrapper.appendChild(this.ui.albumArtist);
        this.ui.trackWrapper.appendChild(this.ui.composer);
        this.ui.trackWrapper.appendChild(this.ui.performer);
        this.ui.trackWrapper.appendChild(this.ui.genre);
        this.ui.trackWrapper.appendChild(this.ui.trackDetails);
        this.ui.suggestionWrapper.appendChild(this.ui.suggestionTitle);
        this.ui.suggestionWrapper.appendChild(this.ui.suggestionList);
        this.ui.suggestionWrapper.appendChild(this.ui.changeSuggestionType);
        this.ui.container.appendChild(this.ui.cover);
        this.ui.container.appendChild(this.ui.numbers);
        this.ui.container.appendChild(this.ui.suggestionWrapper);
        this.ui.container.appendChild(this.ui.trackWrapper);
        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : TrackInfo
     * desc   : TrackInfo event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.container.addEventListener("mouseenter", function() {
            that.locked = true;
            that._stopInactivityTimeout();
        }, true);
        this.ui.container.addEventListener("mouseleave", function() {
            that.locked = false;
            that.setVisible(false);
        });
        this.ui.changeSuggestionType.addEventListener("click", function() {
            that._toggleChangeType();
        });
    }


    /**
     * method : _init (private)
     * class  : TrackInfo
     * desc   : Init suggestions from cookies and add listeners on UI elements
     **/
    _init() {
        let cookies = getCookies();

        if (cookies.TRACK_INFO_SUGGESTION_MODE >= 0 && cookies.TRACK_INFO_SUGGESTION_MODE < TOTAL_SUGGESTIONS_MODES) {
            this._updateSuggestionMode(cookies.TRACK_INFO_SUGGESTION_MODE);
        }

        else {
            this._updateSuggestionMode(0);
        }

        this._eventListener();
    }


    /**
     * method : _startInactivityTimeout (private)
     * class  : TrackInfo
     * desc   : Starts a timeout to make TrackInfo invisible after a given amount of time if not canceled by _stopInactivityTimeout
     * arg    : {bool} visible - TrackInfo visibility status to set
     **/
    _startInactivityTimeout(time) {
        let that = this;
        this.inactivityTimeoutId = window.setTimeout(function() {
            that.setVisible(false);
        }, time);
    }


    /**
     * method : _stopInactivityTimeout (private)
     * class  : TrackInfo
     * desc   : Stops the inactivity timeout
     **/
    _stopInactivityTimeout() {
        if (this.inactivityTimeoutId !== -1) {
            window.clearTimeout(this.inactivityTimeoutId);
        }
    }


    /**
     * method : _toggleChangeType (private)
     * class  : TrackInfo
     * desc   : Event from changeSuggestionType attribute clicked to change suggestion mode
     **/
    _toggleChangeType() {
        ++this.trackSuggestionMode;
        this._updateSuggestionMode();
        this._updateSuggestionTracks();
    }


    /**
     * method : _updateSuggestionMode (private)
     * class  : TrackInfo
     * desc   : Update the suggestion UI title and icon elements according to the trackSuggestionMode attribute
     * arg    : {int} value - The set value (not mandatory)
     **/
    _updateSuggestionMode(value) {
        if (value) {
            this.trackSuggestionMode              = value % TOTAL_SUGGESTIONS_MODES;
        }

        else {
            this.trackSuggestionMode             %= TOTAL_SUGGESTIONS_MODES;
        }

        setCookie("TRACK_INFO_SUGGESTION_MODE", this.trackSuggestionMode, 20);

        switch (this.trackSuggestionMode) {
            case 0:
                this.ui.suggestionTitle.innerHTML = "From the same artist :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/artist.svg";
                break;

            case 1:
                this.ui.suggestionTitle.innerHTML = "From the same album :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/album.svg";
                break;

            case 2:
                this.ui.suggestionTitle.innerHTML = "From the same genre :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/genre.svg";
                break;

            default:
                new Notification("ERROR", "Track Info suggestion error.", "The suggestion mode value is beyond its bounds.");
                break;
        }

        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.tracks[i].ui.style.opacity = 0;
            this.tracks[i].ui.innerHTML     = "";
        }
    }


    /**
     * method : _updateSuggestionTracks (private)
     * class  : TrackInfo
     * desc   : Fetch suggested tracks depending on trackSuggestionMode attribute and update UI
     **/
    _updateSuggestionTracks() {
        let that = this;
        if (this.track !== null) {
            JSONParsedPostRequest(
                "suggestions/getSimilarTrack/",
                JSON.stringify({
                    TRACK_ID:        this.track.id.track,
                    SUGGESTION_MODE: this.trackSuggestionMode
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
                     * } */
                    if (!response.DONE) {
                        that.tracks[0].ui.innerHTML             = response.ERROR_H1 + "<br>" + response.ERROR_MSG;
                        that.tracks[0].ui.style.opacity         = 1;
                    }

                    else {
                        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
                            if (response.RESULT[i]) {
                                that.tracks[i].id               = response.RESULT[i].ID;
                                that.tracks[i].duration         = response.RESULT[i].DURATION;
                                that.tracks[i].title            = response.RESULT[i].TITLE;
                                that.tracks[i].performer        = response.RESULT[i].PERFORMER;
                                that.tracks[i].ui.innerHTML     = secondsToTimecode(that.tracks[i].duration) + " - " +
                                                                  that.tracks[i].title + "<br><div class=\"performerIndent\"></div>" +
                                                                  that.tracks[i].performer;
                                that.tracks[i].ui.style.opacity = 1;
                            }
                        }
                    }
                }
            );
        }
    }

}

export default TrackInfo