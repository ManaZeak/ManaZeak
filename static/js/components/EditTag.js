/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class EditTag {

    constructor(container) {

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


    /**
     * method : _eventListener (private)
     * class  : VolumeBar
     * desc   : VolumeBar event listeners
     **/
    _eventListener() {
        let that = this;

        this.ui.mute.image.addEventListener("click", window.app.toggleMute.bind(window.app));
        this.volumeBar.container.addEventListener("mousedown", that._mouseDown.bind(this));

        window.addEventListener("mousemove", this._mouseMove.bind(this));
        window.addEventListener("mouseup", this._mouseUp.bind(this));
        window.app.listen("setVolume", function() {
            that._updateVolume(window.app.player.getPlayer().volume * 100);
        });
    }


    _uiCreateVar() {
        this.ui = {
            container: document.createElement("DIV"),
            head:  document.createElement("DIV"),
                lContainer:      document.createElement("DIV"),
                    lCover:          document.createElement("IMG"),

                cContainer:      document.createElement("DIV"),
                    cForm:           document.createElement("FORM"),
                    cTitleLabel:     document.createElement("P"),
                    cTitleInput:     document.createElement("INPUT"),
                    cArtistLabel:    document.createElement("P"),
                    cArtistInput:    document.createElement("INPUT"),

                rContainer:      document.createElement("DIV"),
                    rWrapper:        document.createElement("DIV"),
                        rTrackContainer: document.createElement("DIV"),
                            rTrackForm:      document.createElement("FORM"),
                            rTrackLabel:     document.createElement("SPAN"),
                            rTrackNumber:    document.createElement("INPUT"),
                            rTrackSeparator: document.createElement("SPAN"),
                            rTrackTotal:     document.createElement("INPUT"),
                        rDiscContainer:  document.createElement("DIV"),
                            rDiscForm:       document.createElement("FORM"),
                            rDiscLabel:      document.createElement("SPAN"),
                            rDiscNumber:     document.createElement("INPUT"),
                            rDiscSeparator:  document.createElement("SPAN"),
                            rDiscTotal:      document.createElement("INPUT"),
                        rYearContainer:  document.createElement("DIV"),
                            rYearForm:       document.createElement("FORM"),
                            rYearLabel:      document.createElement("SPAN"),
                            rYearNumber:     document.createElement("INPUT"),

            tags: document.createElement("DIV"),
                tagWrapper: document.createElement("DIV"),
                    tagForm: document.createElement("FORM"),
                        tagAlbumLabel: document.createElement("P"),
                        tagAlbumField: document.createElement("INPUT"),
                        tagAlbumArtistsLabel: document.createElement("P"),
                        tagAlbumArtistsField: document.createElement("INPUT"),
                        tagComposerLabel: document.createElement("P"),
                        tagComposerField: document.createElement("INPUT"),
                        tagPerformerLabel: document.createElement("P"),
                        tagPerformerField: document.createElement("INPUT"),
                        tagGenreLabel: document.createElement("P"),
                        tagGenreField: document.createElement("INPUT"),

            coms: document.createElement("DIV"),
                comElement: document.createElement("DIV"),
                    comForm: document.createElement("FORM"),
                        comLabel: document.createElement("P"),
                        comField: document.createElement("TEXTAREA"),
                lyrElement: document.createElement("DIV"),
                    lyrForm: document.createElement("FORM"),
                        lyrLabel: document.createElement("P"),
                        lyrField: document.createElement("TEXTAREA"),

            info: document.createElement("DIV"),
                lineOne: document.createElement("P"),
                lineTwo: document.createElement("P"),
                lineThree: document.createElement("P"),

            foot: document.createElement("DIV"),
                close: document.createElement("BUTTON"),
                save: document.createElement("BUTTON")
        };
    }


    _uiSetVar() {
        this.ui.container.className      = "editTag";
    // Head
        this.ui.head.className = "head";

        this.ui.lContainer.className = "img-container";
            this.ui.lCover.src = "/static/img/utils/defaultcover.svg";

        this.ui.cContainer.className = "art-tit-container";
            this.ui.cTitleLabel.innerHTML = "Title :";
            this.ui.cTitleInput.name = "title";
            this.ui.cArtistLabel.className = "space-up";
            this.ui.cArtistLabel.innerHTML = "Artist :";
            this.ui.cArtistInput.name = "artist";

        this.ui.rContainer.className = "numbs-year-container";
        this.ui.rWrapper.className = "item-wrapper";

        this.ui.rTrackContainer.className = "item";
            this.ui.rTrackLabel.innerHTML = "Track # : ";
            this.ui.rTrackNumber.name = "track-number";
            this.ui.rTrackSeparator.innerHTML = "/";
            this.ui.rTrackTotal.name = "track-total";

        this.ui.rDiscContainer.className = "item";
            this.ui.rDiscLabel.innerHTML = "Disc # : ";
            this.ui.rDiscNumber.name = "disc-number";
            this.ui.rDiscSeparator.innerHTML = "/";
            this.ui.rDiscTotal.innerHTML = "disc-number";

        this.ui.rYearContainer.className = "item";
            this.ui.rYearLabel.innerHTML = "Year : ";
            this.ui.rYearNumber.name = "year";
            this.ui.rYearNumber.className = "year";
    // Tags
        this.ui.tags.className = "tags";
            this.ui.tagWrapper.className = "tags-wrapper";
                this.ui.tagAlbumLabel.innerHTML = "Album :";
                this.ui.tagAlbumField.name = "album";
                this.ui.tagAlbumArtistsLabel.innerHTML = "Album artists :";
                this.ui.tagAlbumArtistsField.name = "album-artists";
                this.ui.tagComposerLabel.innerHTML = "Composer :";
                this.ui.tagComposerField.name = "composer";
                this.ui.tagPerformerLabel.innerHTML = "Performer :";
                this.ui.tagPerformerField.name = "performer";
                this.ui.tagGenreLabel.innerHTML = "Genre :";
                this.ui.tagGenreField.name = "genre";
                this.ui.tagGenreField.className = "no-margin";
    // Coms
        this.ui.coms.className = "coms";
            this.ui.comElement.className = "element";
                this.ui.comLabel.innerHTML = "Comment :";
                this.ui.comField.name = "comment";
                this.ui.comField.row = "8";
                this.ui.comField.cols = "80";
            this.ui.lyrElement.className = "element";
                this.ui.lyrLabel.innerHTML = "Lyrics :";
                this.ui.lyrField.name = "lyrics";
                this.ui.lyrField.row = "8";
                this.ui.lyrField.cols = "80";
                this.ui.lyrField.className = "center";
    // Info
        this.ui.info.className = "info";
            this.ui.lineOne.innerHTML = "Line one";
            this.ui.lineTwo.innerHTML = "Line two";
            this.ui.lineThree.innerHTML = "Line three";
    // Foot
        this.ui.foot.className = "foot";
            this.ui.close.innerHTML = "Close";
            this.ui.save.innerHTML = "Save";

    }


    _uiAppendVar() {
        // Head
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
        // Tags
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
        // Coms
        this.ui.comForm.appendChild(this.ui.comLabel);
        this.ui.comForm.appendChild(this.ui.comField);
        this.ui.lyrForm.appendChild(this.ui.lyrLabel);
        this.ui.lyrForm.appendChild(this.ui.lyrField);

        this.ui.comElement.appendChild(this.ui.comForm);
        this.ui.lyrElement.appendChild(this.ui.lyrForm);

        this.ui.coms.appendChild(this.ui.comElement);
        this.ui.coms.appendChild(this.ui.lyrElement);
        // Info
        this.ui.info.appendChild(this.ui.lineOne);
        this.ui.info.appendChild(this.ui.lineTwo);
        this.ui.info.appendChild(this.ui.lineThree);
        // Foot
        this.ui.foot.appendChild(this.ui.close);
        this.ui.foot.appendChild(this.ui.save);


        this.ui.container.appendChild(this.ui.head);
        this.ui.container.appendChild(this.ui.tags);
        this.ui.container.appendChild(this.ui.coms);
        this.ui.container.appendChild(this.ui.info);
        this.ui.container.appendChild(this.ui.foot);
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

}
