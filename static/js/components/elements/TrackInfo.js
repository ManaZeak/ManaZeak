/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  TrackInfo class - handle the track info container                                  *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const TOTAL_SUGGESTIONS_NUMBER = 4;

let TrackInfo = function(container) {

    this.inactivityTimeoutId = -1;
    this.trackSuggestionMode = 0; // 0 = By Artists, 1 = By Album, 2 = By Genre
    this.locked = false;

    this._createUI(container);
    this._eventListener();
};


TrackInfo.prototype = {

    _createUI: function(container) {
        this.ui = {
            container:         document.createElement("DIV"),
            cover:             document.createElement("IMG"),
            numbers:           document.createElement("P"),

            trackWrapper:      document.createElement("DIV"),
            title:             document.createElement("P"),
            artist:            document.createElement("P"),
            albumArtist:       document.createElement("P"),
            composer:          document.createElement("P"),
            performer:         document.createElement("P"),
            genre:             document.createElement("P"),
            album:             document.createElement("P"),
            trackDetails:      document.createElement("P"),

            suggestionWrapper: document.createElement("DIV"),
            suggestionTitle:   document.createElement("P"),
            suggestionList:    document.createElement("UL"),

            changeTrackType:   document.createElement("IMG")
        };

        this.ui.tracks = [];

        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.ui.tracks[i] = document.createElement("LI");
        }

        this.ui.container.id         = "trackInfo";
        this.ui.trackWrapper.id      = "trackWrapper";
        this.ui.title.id             = "title";
        this.ui.album.id             = "album";
        this.ui.numbers.id           = "numbers";
        this.ui.genre.id             = "album";
        this.ui.suggestionWrapper.id = "suggestionWrapper";
        this.ui.suggestionTitle.id   = "title";
        this.ui.changeTrackType.src  = "/static/img/utils/trackinfo/artist.svg"; // Get from cookies mode

        // TODO : entries subClass in here for deaz

        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.ui.suggestionList.appendChild(this.ui.tracks[i]);
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
        this.ui.suggestionWrapper.appendChild(this.ui.changeTrackType);

        this.ui.container.appendChild(this.ui.cover);
        this.ui.container.appendChild(this.ui.numbers);
        this.ui.container.appendChild(this.ui.suggestionWrapper);
        this.ui.container.appendChild(this.ui.trackWrapper);

        container.appendChild(this.ui.container);
    },

    updateGeometry: function(rect, offset) {
        this.ui.container.style.top    = (rect.top - 24) + "px";
        this.ui.container.style.left   = (rect.left + offset + 8) + "px"; // 8 come from the padding in col-title
        this.ui.container.style.height = "200px";
        this.ui.container.style.width  = "auto";
    },


    updateInfo: function(track, callback) {
        let that = this;

        JSONParsedPostRequest(
            "ajax/getTrackDetailedInfo/",
            JSON.stringify({
                TRACK_ID: track.id.track
            }),
            function(response) {
                if (response.RESULT === "FAIL") {
                    new Notification("Bad format.", response.ERROR);
                } else {
                    track.updateMetadata(response);

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
                    that.ui.suggestionTitle.innerHTML = "From the same artist :";

                    that.updateSuggestion(track);
                    callback();
                }
            }
        );
    },


    setVisible: function(visible) {
        if (this.locked === true) {
            return;
        }

        if (visible === true) {
            this.ui.container.style.opacity = 1;
            this.ui.container.style.zIndex = 0;
            this.startInactivityTimeout(3000);  // If mouse doesn't move for 3 seconds outside the TrackInfo container, it's closed.
        }

        else {
            let that = this;

            this.ui.container.style.opacity = 0;
            window.setTimeout(function() {
                that.ui.container.style.zIndex = -1;
            }, 100); // 100ms bc of transition time in #TrackInfo - trackinfo.scss
        }
    },


    toggleChangeType: function() {
        ++this.trackSuggestionMode;
        this.trackSuggestionMode %= 3;

        // TODO : ask tracks from server and build list
        switch (this.trackSuggestionMode) {
            case 0:
                this.ui.suggestionTitle.innerHTML = "From the same artist :";
                this.ui.changeTrackType.src       = "/static/img/utils/trackinfo/artist.svg";
                break;

            case 1:
                this.ui.suggestionTitle.innerHTML = "From the same album :";
                this.ui.changeTrackType.src       = "/static/img/utils/trackinfo/album.svg";
                break;

            case 2:
                this.ui.suggestionTitle.innerHTML = "From the same genre :";
                this.ui.changeTrackType.src       = "/static/img/utils/trackinfo/genre.svg";
                break;

            default:
                // TODO : Switch default event
                break;
        }
    },


    updateSuggestion: function(track) {
        let that = this;

        JSONParsedPostRequest(
            "ajax/getSimilarTrack/",
            JSON.stringify({ // TODO : send total_ to avoid oob
                TRACK_ID: track.id.track,
                MODE:     this.trackSuggestionMode
            }),
            function(response) {
                if (response.RESULT === "FAIL") {
                    new Notification("Bad format.", response.ERROR);
                } else {
                    for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
                        that.ui.tracks[i].innerHTML = secondsToTimecode(response[i].DURATION) + " - " + response[i].TITLE + "<br>" + response[i].performer;
                    }
                }
            }
        );
    },


    startInactivityTimeout: function(time) {
        let that = this;

        this.inactivityTimeoutId = window.setTimeout(function() {
            that.setVisible(false);
        }, time);
    },


    stopInactivityTimeout: function() {
        window.clearTimeout(this.inactivityTimeoutId);
    },


    _eventListener: function() {
        let that = this;

        this.ui.container.addEventListener("mouseenter", function() {
            that.locked = true;
            that.stopInactivityTimeout();
        });
        this.ui.container.addEventListener("mouseleave", function() {
            that.locked = false;
            that.setVisible(false);
        });
        this.ui.changeTrackType.addEventListener("click", function() {
            that.toggleChangeType();
        });
    }
};
