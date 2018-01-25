/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TrackPreview class                             *
 *                                                 *
 *  Handle the track info container                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import MzkObject from '../../../core/MzkObject.js'
import Modal from '../../../utils/Modal.js'

class TrackPreview extends MzkObject {

    constructor(container) {
        super();
        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeTrack (public)
     * class  : TrackPreview
     * desc   : Change track details
     * arg    : {object} track - New track to get info from
     **/
    changeTrack(track) {
        this.ui.cover.src           = track.cover;
        this.ui.thumb.src           = track.cover;
        this.ui.title.innerHTML     = track.title;
        this.ui.artist.innerHTML    = track.artist;
        this.ui.album.innerHTML     = track.album;
        this.ui.year.innerHTML      = track.year;
        if (track.genre) {
            this.ui.year.innerHTML += "&nbsp;&nbsp;-&nbsp;&nbsp;";
        }
        this.ui.genre.innerHTML     = track.genre;

        this._setVisible(true);
    }


    /**
     * method : resetTrackPreview (public)
     * class  : TrackPreview
     * desc   : Reset field values and set invisible
     **/
    resetTrackPreview() {
        this.ui.cover.src        = "";
        this.ui.thumb.src        = "";
        this.ui.title.innerHTML  = "";
        this.ui.artist.innerHTML = "";
        this.ui.album.innerHTML  = "";
        this.ui.year.innerHTML   = "";
        this.ui.genre.innerHTML  = "";
        this._setVisible(false);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : TrackPreview
     * desc   : Build UI elements
     * arg    : {object} container - The TrackPreview container
     **/
    _createUI(container) {
        this.ui = {
            container:                   document.createElement("DIV"),
            thumb:                       document.createElement("IMG"),
            cover:                       document.createElement("IMG"),
            title:                       document.createElement("LI"),
            artist:                      document.createElement("LI"),
            album:                       document.createElement("LI"),
            genreYear:                   document.createElement("LI"),
            year:                        document.createElement("SPAN"),
            genre:                       document.createElement("SPAN"),
            thumbTooltip:                document.createElement("SPAN")
        };
        this.tooltipWrapper            = document.createElement("DIV");
        this.listContainer             = document.createElement("UL");

        this.ui.container.id           = "trackPreview";
        this.tooltipWrapper.className  = "tooltipWrapper";
        this.ui.cover.id               = "trackPreviewCover";
        this.ui.thumb.id               = "trackPreviewThumb";
        this.ui.thumbTooltip.className = "tooltipTrackCover";
        this.ui.title.id               = "trackPreviewTitle";
        this.ui.artist.id              = "trackPreviewArtist";
        this.ui.album.id               = "trackPreviewAlbum";
        this.ui.year.id                = "trackPreviewYear";
        this.ui.genre.id               = "trackPreviewGenre";
        this.ui.cover.src              = "/static/img/utils/defaultcover.svg";
        this.ui.thumb.src              = "/static/img/utils/defaultcover.svg";

        this.ui.thumbTooltip.appendChild(this.ui.thumb);
        this.tooltipWrapper.appendChild(this.ui.cover);
        this.tooltipWrapper.appendChild(this.ui.thumbTooltip);
        this.ui.genreYear.appendChild(this.ui.year);
        this.ui.genreYear.appendChild(this.ui.genre);
        this.listContainer.appendChild(this.ui.title);
        this.listContainer.appendChild(this.ui.artist);
        this.listContainer.appendChild(this.ui.album);
        this.listContainer.appendChild(this.ui.genreYear);
        this.ui.container.appendChild(this.tooltipWrapper);
        this.ui.container.appendChild(this.listContainer);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : TrackPreview
     * desc   : TrackPreview event listeners
     **/
    _eventListener() {
        this.ui.cover.addEventListener("click", function() {
            let modal = new Modal("cover", {
                src:    that.ui.cover.src,
                artist: that.ui.artist.innerHTML,
                album:  that.ui.album.innerHTML,
                year:   that.ui.year.innerHTML
            });
            modal.open();
        });
        let that = this;
        window.app.listen('changeTrack', function(track) {
            that.changeTrack(track);
        });
        window.app.listen("togglePlay", function() {
            that._setVisible(true);
        });
        window.app.listen("stopPlayback", function() {
            that._setVisible(false);
        });
    }


    /**
     * method : setVisible (private)
     * class  : TrackPreview
     * desc   : Change visibility status of TrackPreview
     * arg    : {bool} visible
     **/
    _setVisible(visible) {
        this.ui.container.style.opacity = visible ? 1 : 0;
    }

}

export default TrackPreview