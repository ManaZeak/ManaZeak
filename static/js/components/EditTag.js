/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class EditTag {

    constructor(container, data) {

        this.data = data;
        this._createUI(container);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : VolumeBar
     * desc   : Build UI elements
     * arg    : {object} container - The VolumeBar container
     **/
    _createUI(container) {
        this._uiCreateVar();
        this._uiSetVar();
        this._uiAppendVar();

        container.appendChild(this.ui.container);
    }


    _uiAppendVar() {
        // Head --------------------------------------------------
        this.ui.cForm.appendChild(this.ui.cTitleLabel);
        this.ui.cForm.appendChild(this.ui.cTitleInput);
        this.ui.cForm.appendChild(this.ui.cArtistLabel);
        this.ui.cForm.appendChild(this.ui.cArtistInput);
        this.ui.rTrackForm.appendChild(this.ui.rTrackLabel);
        this.ui.rTrackForm.appendChild(this.ui.rTrackNumber);
        this.ui.rTrackForm.appendChild(this.ui.rTrackSeparator);
        this.ui.rTrackForm.appendChild(this.ui.rTrackTotal);
        this.ui.rTrackContainer.appendChild(this.ui.rTrackForm);
        this.ui.rDiscForm.appendChild(this.ui.rDiscLabel);
        this.ui.rDiscForm.appendChild(this.ui.rDiscNumber);
        this.ui.rDiscForm.appendChild(this.ui.rDiscSeparator);
        this.ui.rDiscForm.appendChild(this.ui.rDiscTotal);
        this.ui.rDiscContainer.appendChild(this.ui.rDiscForm);
        this.ui.rYearForm.appendChild(this.ui.rYearLabel);
        this.ui.rYearForm.appendChild(this.ui.rYearNumber);
        this.ui.rYearContainer.appendChild(this.ui.rYearForm);
        this.ui.rWrapper.appendChild(this.ui.rTrackContainer);
        this.ui.rWrapper.appendChild(this.ui.rDiscContainer);
        this.ui.rWrapper.appendChild(this.ui.rYearContainer);
        this.ui.lContainer.appendChild(this.ui.lCover);
        this.ui.cContainer.appendChild(this.ui.cForm);
        this.ui.rContainer.appendChild(this.ui.rWrapper);
        this.ui.head.appendChild(this.ui.lContainer);
        this.ui.head.appendChild(this.ui.cContainer);
        this.ui.head.appendChild(this.ui.rContainer);
        // Tags --------------------------------------------------
        this.ui.tagForm.appendChild(this.ui.tagAlbumLabel);
        this.ui.tagForm.appendChild(this.ui.tagAlbumField);
        this.ui.tagForm.appendChild(this.ui.tagAlbumArtistsLabel);
        this.ui.tagForm.appendChild(this.ui.tagAlbumArtistsField);
        this.ui.tagForm.appendChild(this.ui.tagComposerLabel);
        this.ui.tagForm.appendChild(this.ui.tagComposerField);
        this.ui.tagForm.appendChild(this.ui.tagPerformerLabel);
        this.ui.tagForm.appendChild(this.ui.tagPerformerField);
        this.ui.tagForm.appendChild(this.ui.tagGenreLabel);
        this.ui.tagForm.appendChild(this.ui.tagGenreField);
        this.ui.tagWrapper.appendChild(this.ui.tagForm);
        this.ui.tags.appendChild(this.ui.tagWrapper);
        // Coms --------------------------------------------------
        this.ui.comForm.appendChild(this.ui.comLabel);
        this.ui.comForm.appendChild(this.ui.comField);
        this.ui.lyrForm.appendChild(this.ui.lyrLabel);
        this.ui.lyrForm.appendChild(this.ui.lyrField);
        this.ui.comElement.appendChild(this.ui.comForm);
        this.ui.lyrElement.appendChild(this.ui.lyrForm);
        this.ui.coms.appendChild(this.ui.comElement);
        this.ui.coms.appendChild(this.ui.lyrElement);
        // Info --------------------------------------------------
        this.ui.info.appendChild(this.ui.lineOne);
        this.ui.info.appendChild(this.ui.lineTwo);
        // Foot --------------------------------------------------
        this.ui.foot.appendChild(this.ui.close);
        this.ui.foot.appendChild(this.ui.save);
        // Add element in local container ------------------------
        this.ui.container.appendChild(this.ui.head);
        this.ui.container.appendChild(this.ui.tags);
        this.ui.container.appendChild(this.ui.coms);
        this.ui.container.appendChild(this.ui.info);
        this.ui.container.appendChild(this.ui.foot);
    }


    _uiCreateVar() {
        this.ui = {
            container:                        document.createElement("DIV"),
            // Head --------------------------
            head:                             document.createElement("DIV"),
                lContainer:                   document.createElement("DIV"),
                    lCover:                   document.createElement("IMG"),
                cContainer:                   document.createElement("DIV"),
                    cForm:                    document.createElement("FORM"),
                    cTitleLabel:              document.createElement("P"),
                    cTitleInput:              document.createElement("INPUT"),
                    cArtistLabel:             document.createElement("P"),
                    cArtistInput:             document.createElement("INPUT"),
                rContainer:                   document.createElement("DIV"),
                    rWrapper:                 document.createElement("DIV"),
                        rTrackContainer:      document.createElement("DIV"),
                            rTrackForm:       document.createElement("FORM"),
                            rTrackLabel:      document.createElement("SPAN"),
                            rTrackNumber:     document.createElement("INPUT"),
                            rTrackSeparator:  document.createElement("SPAN"),
                            rTrackTotal:      document.createElement("INPUT"),
                        rDiscContainer:       document.createElement("DIV"),
                            rDiscForm:        document.createElement("FORM"),
                            rDiscLabel:       document.createElement("SPAN"),
                            rDiscNumber:      document.createElement("INPUT"),
                            rDiscSeparator:   document.createElement("SPAN"),
                            rDiscTotal:       document.createElement("INPUT"),
                        rYearContainer:       document.createElement("DIV"),
                            rYearForm:        document.createElement("FORM"),
                            rYearLabel:       document.createElement("SPAN"),
                            rYearNumber:      document.createElement("INPUT"),
            // Tags --------------------------
            tags:                             document.createElement("DIV"),
                tagWrapper:                   document.createElement("DIV"),
                    tagForm:                  document.createElement("FORM"),
                        tagAlbumLabel:        document.createElement("P"),
                        tagAlbumField:        document.createElement("INPUT"),
                        tagAlbumArtistsLabel: document.createElement("P"),
                        tagAlbumArtistsField: document.createElement("INPUT"),
                        tagComposerLabel:     document.createElement("P"),
                        tagComposerField:     document.createElement("INPUT"),
                        tagPerformerLabel:    document.createElement("P"),
                        tagPerformerField:    document.createElement("INPUT"),
                        tagGenreLabel:        document.createElement("P"),
                        tagGenreField:        document.createElement("INPUT"),
            // Coms --------------------------
            coms:                             document.createElement("DIV"),
                comElement:                   document.createElement("DIV"),
                    comForm:                  document.createElement("FORM"),
                        comLabel:             document.createElement("P"),
                        comField:             document.createElement("TEXTAREA"),
                lyrElement:                   document.createElement("DIV"),
                    lyrForm:                  document.createElement("FORM"),
                        lyrLabel:             document.createElement("P"),
                        lyrField:             document.createElement("TEXTAREA"),
            // Info --------------------------
            info:                             document.createElement("DIV"),
                lineOne:                      document.createElement("P"),
                lineTwo:                      document.createElement("P"),
            // Foot --------------------------
            foot:                             document.createElement("DIV"),
                close:                        document.createElement("BUTTON"),
                save:                         document.createElement("BUTTON")
        };
    }


    _uiSetVar() {
        this.ui.container.className                       = "editTag";
        // Head ------------------------------------------
        this.ui.head.className                            = "head";
            this.ui.lContainer.className                  = "img-container";
                this.ui.lCover.src                        = "/static/img/utils/defaultcover.svg";
            this.ui.cContainer.className                  = "art-tit-container";
                this.ui.cTitleLabel.innerHTML             = "Title :";
                this.ui.cTitleInput.name                  = "title";
                this.ui.cTitleInput.type                  = "text";
                this.ui.cTitleInput.value                 = this.data.track.title;
                this.ui.cArtistLabel.className            = "space-up";
                this.ui.cArtistLabel.innerHTML            = "Artist :";
                this.ui.cArtistInput.name                 = "artist";
                this.ui.cArtistInput.type                 = "text";
                this.ui.cArtistInput.value                = this.data.track.artist;
            this.ui.rContainer.className                  = "numbs-year-container";
                this.ui.rWrapper.className                = "item-wrapper";
                    this.ui.rTrackContainer.className     = "item";
                        this.ui.rTrackLabel.innerHTML     = "Track # : ";
                        this.ui.rTrackNumber.name         = "track-number";
                        this.ui.rTrackNumber.type         = "text";
                        this.ui.rTrackNumber.value        = this.data.track.track;
                        this.ui.rTrackSeparator.innerHTML = "/";
                        this.ui.rTrackTotal.name          = "track-total";
                        this.ui.rTrackTotal.type          = "text";
                        this.ui.rTrackTotal.value         = this.data.track.trackTotal;
                    this.ui.rDiscContainer.className      = "item";
                        this.ui.rDiscLabel.innerHTML      = "Disc # : ";
                        this.ui.rDiscNumber.name          = "disc-number";
                        this.ui.rDiscNumber.type          = "text";
                        this.ui.rDiscNumber.value         = this.data.track.disc;
                        this.ui.rDiscSeparator.innerHTML  = "/";
                        this.ui.rDiscTotal.name           = "disc-number";
                        this.ui.rDiscTotal.type           = "text";
                        this.ui.rDiscTotal.value          = this.data.track.discTotal;
                    this.ui.rYearContainer.className      = "item";
                        this.ui.rYearLabel.innerHTML      = "Year : ";
                        this.ui.rYearNumber.name          = "year";
                        this.ui.rYearNumber.type          = "text";
                        this.ui.rYearNumber.className     = "year";
                        this.ui.rYearNumber.value         = this.data.track.year;
        // Tags ------------------------------------------
        this.ui.tags.className                            = "tags";
            this.ui.tagWrapper.className                  = "tags-wrapper";
                this.ui.tagAlbumLabel.innerHTML           = "Album :";
                this.ui.tagAlbumField.name                = "album";
                this.ui.tagAlbumField.type                = "text";
                this.ui.tagAlbumField.value               = this.data.track.album;
                this.ui.tagAlbumArtistsLabel.innerHTML    = "Album artists :";
                this.ui.tagAlbumArtistsField.name         = "album-artists";
                this.ui.tagAlbumArtistsField.type         = "text";
                this.ui.tagAlbumArtistsField.value        = this.data.track.albumArtist;
                this.ui.tagComposerLabel.innerHTML        = "Composer :";
                this.ui.tagComposerField.name             = "composer";
                this.ui.tagComposerField.type             = "text";
                this.ui.tagComposerField.value            = this.data.track.composer;
                this.ui.tagPerformerLabel.innerHTML       = "Performer :";
                this.ui.tagPerformerField.name            = "performer";
                this.ui.tagPerformerField.type            = "text";
                this.ui.tagPerformerField.value           = this.data.track.performer;
                this.ui.tagGenreLabel.innerHTML           = "Genre :";
                this.ui.tagGenreField.name                = "genre";
                this.ui.tagGenreField.type                = "text";
                this.ui.tagGenreField.value               = this.data.track.genre;
                this.ui.tagGenreField.className           = "no-margin";
        // Coms ------------------------------------------
        this.ui.coms.className                            = "coms";
            this.ui.comElement.className                  = "element";
                this.ui.comLabel.innerHTML                = "Comment :";
                this.ui.comField.name                     = "comment";
                this.ui.comField.row                      = "8";
                this.ui.comField.cols                     = "80";
                this.ui.comField.value                    = this.data.track.comment;
            this.ui.lyrElement.className                  = "element";
                this.ui.lyrLabel.innerHTML                = "Lyrics :";
                this.ui.lyrField.name                     = "lyrics";
                this.ui.lyrField.row                      = "8";
                this.ui.lyrField.cols                     = "80";
                this.ui.lyrField.value                    = this.data.track.lyrics;
                this.ui.lyrField.className                = "center";
        // Info ------------------------------------------
        this.ui.info.className                            = "info";
            this.ui.lineOne.innerHTML                     = secondsToTimecode(this.data.track.duration) + " - " +
                                                            rawSizeToReadableSize(this.data.track.size) + " - " +
                                                            this.data.track.fileType + " - " +
                                                            Math.round(this.data.track.bitRate / 1000) + " kbps - " +
                                                            this.data.track.sampleRate + " Hz";
            this.ui.lineTwo.innerHTML                     = "This track has been played " + this.data.track.playCount + " times (" + secondsToTimecode(this.data.track.playCount * this.data.track.duration) + ")";
        // Foot ------------------------------------------
        this.ui.foot.className                            = "foot";
            this.ui.close.innerHTML                       = "Close";
            this.ui.save.innerHTML                        = "Save";

            console.log(this.data.track);
    }


    /**
     * method : _getArtistFromArtistsArray (private)
     * class  : Track
     * desc   : Create artists string from artist's names in [object]
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {string} The Artists concated string
     **/
    static _getArtistFromArtistsArray(artists) {
        if (artists === null || artists === undefined) { return ""; }

        let artistsName = []; // Artists name array
        for (let i = 0; i < artists.length; ++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort(); // In order to get artists alphabetically ordered

        let artist = ""; // Output string
        for (let i = 0; i < artistsName.length; ++i) {
            artist += artistsName[i];
            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

}
