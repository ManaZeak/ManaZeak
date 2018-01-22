/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class EditTagEntry {
    constructor(container, track) {
        this.entry = document.createElement("P");
        this.track = track;
        this.entry.innerHTML = track.fileName;
        this.entry.dataset.childID = container.children.length;

        container.appendChild(this.entry);
    }


    /**
     * method : setIsSelected (public)
     * class  : ListViewEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) { this.entry.classList.add("mzk-selected");    }
        else                 { this.entry.classList.remove("mzk-selected"); }
    }
}

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
        this.send = [];
        this.entries = [];
        this.selector = new MultiSelect();

        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    saveState() {
        JSONParsedPostRequest(
            "ajax/changeTracksMetadata/",
            JSON.stringify({
                TRACKS_ID:         this.selector.get(),
                TITLE:             this.ui.cTitleInput.value,
                YEAR:              this.ui.rYearNumber.value,
                COMPOSER:          this.ui.tagComposerField.value,
                PERFORMER:         this.ui.tagPerformerField.value,
                TRACK_NUMBER:      this.ui.rTrackNumber.value,
                ALBUM_TOTAL_TRACK: this.ui.rTrackTotal.value,
                DISC_NUMBER:       this.ui.rDiscNumber.value,
                ALBUM_TOTAL_DISC:  this.ui.rDiscTotal.value,
                LYRICS:            this.ui.lyrField.value,
                COMMENT:           this.ui.comField.value,
                ALBUM_TITLE:       this.ui.tagAlbumField.value,
                GENRE:             this.ui.tagGenreField.value,
                ARTISTS:           this.ui.cArtistInput.value,
                ALBUM_ARTISTS:     this.ui.tagAlbumArtistsField.value
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     PATH      : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    _createUI(container) {
        this._uiCreateVar();
        this._uiSetVar();
        this._uiAppendVar();

        this._updateFields(this.data[0]); // Initializing modal with first track value

        if (this.data.length > 1) {
            this.entries = new Array(this.data.length);

            for (let i = 0; i < this.data.length ;++i) {
                this.entries[i] = new EditTagEntry(this.ui.list, this.data[i]);
            }


            container.style = "display: flex;";
            container.appendChild(this.ui.list);
            this.ui.container.style += "display: inline;";
        }
        if (this.entries.length > 0) this.entries[0].setIsSelected(true);

        container.appendChild(this.ui.container);
    }

    _eventListener() {
        let that = this;

        this.selector.listen('clear', function() {
            for(let i = 0; i < that.entries.length; ++i)
                that.entries[i].setIsSelected(false);
        });

        this.ui.list.addEventListener('click', function(event) {
            if (event.target == that.ui.list) {
                return;
            }

            let target = event.target;
            while (target.parentNode != that.ui.list) {
                target = target.parentNode;
            }

            let ix = target.dataset.childID;
            that.entries[ix].setIsSelected(that.selector.add(ix, event.ctrlKey));

            that.saveState(); // Saving tag before changing track
            that._updateFields(that.entries[ix].track);
        });
    }


    _updateFields(track) {
        this.ui.lCover                     = track.cover;
        this.ui.cTitleInput.value          = track.title;
        this.ui.rYearNumber.value          = track.year;
        this.ui.tagComposerField.value     = track.composer;
        this.ui.tagPerformerField.value    = track.performer;
        this.ui.rTrackNumber.value         = track.track;
        this.ui.rTrackTotal.value          = track.trackTotal;
        this.ui.rDiscNumber.value          = track.disc;
        this.ui.rDiscTotal.value           = track.discTotal;
        this.ui.lyrField.value             = track.lyrics;
        this.ui.comField.value             = track.comment;
        this.ui.tagAlbumField.value        = track.album;
        this.ui.tagGenreField.value        = track.genre;
        this.ui.cArtistInput.value         = track.artist;
        this.ui.tagAlbumArtistsField.value = track.albumArtist;

        this.ui.lineOne.innerHTML          = secondsToTimecode(track.duration) + " - " +
                                             rawSizeToReadableSize(track.size) + " - " +
                                             track.fileType + " - " +
                                             Math.round(track.bitRate / 1000) + " kbps - " +
                                             track.sampleRate + " Hz";
        this.ui.lineTwo.innerHTML          = "This track has been played " + track.playCount + " times (" +
                                             secondsToTimecode(track.playCount * track.duration) + ")";
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
        // Add element in local container ------------------------
        this.ui.container.appendChild(this.ui.head);
        this.ui.container.appendChild(this.ui.tags);
        this.ui.container.appendChild(this.ui.coms);
        this.ui.container.appendChild(this.ui.info);

    }


    _uiCreateVar() {
        this.ui = {
            container:            document.createElement("DIV"),
            // List --------------------------
            list:                 document.createElement("DIV"),
            // Head --------------------------
            head:                 document.createElement("DIV"),
            lContainer:           document.createElement("DIV"),
            lCover:               document.createElement("IMG"),
            cContainer:           document.createElement("DIV"),
            cForm:                document.createElement("FORM"),
            cTitleLabel:          document.createElement("P"),
            cTitleInput:          document.createElement("INPUT"),
            cArtistLabel:         document.createElement("P"),
            cArtistInput:         document.createElement("INPUT"),
            rContainer:           document.createElement("DIV"),
            rWrapper:             document.createElement("DIV"),
            rTrackContainer:      document.createElement("DIV"),
            rTrackForm:           document.createElement("FORM"),
            rTrackLabel:          document.createElement("SPAN"),
            rTrackNumber:         document.createElement("INPUT"),
            rTrackSeparator:      document.createElement("SPAN"),
            rTrackTotal:          document.createElement("INPUT"),
            rDiscContainer:       document.createElement("DIV"),
            rDiscForm:            document.createElement("FORM"),
            rDiscLabel:           document.createElement("SPAN"),
            rDiscNumber:          document.createElement("INPUT"),
            rDiscSeparator:       document.createElement("SPAN"),
            rDiscTotal:           document.createElement("INPUT"),
            rYearContainer:       document.createElement("DIV"),
            rYearForm:            document.createElement("FORM"),
            rYearLabel:           document.createElement("SPAN"),
            rYearNumber:          document.createElement("INPUT"),
            // Tags --------------------------
            tags:                 document.createElement("DIV"),
            tagWrapper:           document.createElement("DIV"),
            tagForm:              document.createElement("FORM"),
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
            coms:                 document.createElement("DIV"),
            comElement:           document.createElement("DIV"),
            comForm:              document.createElement("FORM"),
            comLabel:             document.createElement("P"),
            comField:             document.createElement("TEXTAREA"),
            lyrElement:           document.createElement("DIV"),
            lyrForm:              document.createElement("FORM"),
            lyrLabel:             document.createElement("P"),
            lyrField:             document.createElement("TEXTAREA"),
            // Info --------------------------
            info:                 document.createElement("DIV"),
            lineOne:              document.createElement("P"),
            lineTwo:              document.createElement("P"),
            // Foot is handled in Modal class
        };
    }


    _uiSetVar() {
        this.ui.container.className            = "editTag";
        // List ------------------------------------------
        this.ui.list.className            = "list";
        // Head ------------------------------------------
        this.ui.head.className                 = "head";
        this.ui.lContainer.className           = "img-container";
        this.ui.cContainer.className           = "art-tit-container";
        this.ui.cTitleLabel.innerHTML          = "Title :";
        this.ui.cTitleInput.name               = "title";
        this.ui.cTitleInput.type               = "text";
        this.ui.cArtistLabel.className         = "space-up";
        this.ui.cArtistLabel.innerHTML         = "Artist :";
        this.ui.cArtistInput.name              = "artist";
        this.ui.cArtistInput.type              = "text";
        this.ui.rContainer.className           = "numbs-year-container";
        this.ui.rWrapper.className             = "item-wrapper";
        this.ui.rTrackContainer.className      = "item";
        this.ui.rTrackLabel.innerHTML          = "Track # : ";
        this.ui.rTrackNumber.name              = "track-number";
        this.ui.rTrackNumber.type              = "text";
        this.ui.rTrackSeparator.innerHTML      = "/";
        this.ui.rTrackTotal.name               = "track-total";
        this.ui.rTrackTotal.type               = "text";
        this.ui.rDiscContainer.className       = "item";
        this.ui.rDiscLabel.innerHTML           = "Disc # : ";
        this.ui.rDiscNumber.name               = "disc-number";
        this.ui.rDiscNumber.type               = "text";
        this.ui.rDiscSeparator.innerHTML       = "/";
        this.ui.rDiscTotal.name                = "disc-number";
        this.ui.rDiscTotal.type                = "text";
        this.ui.rYearContainer.className       = "item";
        this.ui.rYearLabel.innerHTML           = "Year : ";
        this.ui.rYearNumber.name               = "year";
        this.ui.rYearNumber.type               = "text";
        this.ui.rYearNumber.className          = "year";
        // Tags ------------------------------------------
        this.ui.tags.className                 = "tags";
        this.ui.tagWrapper.className           = "tags-wrapper";
        this.ui.tagAlbumLabel.innerHTML        = "Album :";
        this.ui.tagAlbumField.name             = "album";
        this.ui.tagAlbumField.type             = "text";
        this.ui.tagAlbumArtistsLabel.innerHTML = "Album artists :";
        this.ui.tagAlbumArtistsField.name      = "album-artists";
        this.ui.tagAlbumArtistsField.type      = "text";
        this.ui.tagComposerLabel.innerHTML     = "Composer :";
        this.ui.tagComposerField.name          = "composer";
        this.ui.tagComposerField.type          = "text";
        this.ui.tagPerformerLabel.innerHTML    = "Performer :";
        this.ui.tagPerformerField.name         = "performer";
        this.ui.tagPerformerField.type         = "text";
        this.ui.tagGenreLabel.innerHTML        = "Genre :";
        this.ui.tagGenreField.name             = "genre";
        this.ui.tagGenreField.type             = "text";
        this.ui.tagGenreField.className        = "no-margin";
        // Coms ------------------------------------------
        this.ui.coms.className                 = "coms";
        this.ui.comElement.className           = "element";
        this.ui.comLabel.innerHTML             = "Comment :";
        this.ui.comField.name                  = "comment";
        this.ui.comField.row                   = "8";
        this.ui.comField.cols                  = "80";
        this.ui.lyrElement.className           = "element";
        this.ui.lyrLabel.innerHTML             = "Lyrics :";
        this.ui.lyrField.name                  = "lyrics";
        this.ui.lyrField.row                   = "8";
        this.ui.lyrField.cols                  = "80";
        this.ui.lyrField.className             = "center";
        // Info ------------------------------------------
        this.ui.info.className                 = "info";
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getContainer() { return this.ui.container; }

}
