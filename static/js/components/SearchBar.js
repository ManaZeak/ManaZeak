/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  UserMenu class                                 *
 *                                                 *
 *  Handle the user's menu                         *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { matchItem, boldMatchingString } from "../utils/Utils";

class SearchBar {

    constructor() {

        this.isVisible = false;
        this._entries = [];

        this._createUI();
        this._eventListener();
    }


    show(firstLetter, rawEntries) {
        this._formatEntries(rawEntries);
        this.isVisible = true;
        document.body.appendChild(this.ui.overlay);
        this.ui.input.value = firstLetter;
        this.ui.input.focus();
    }


    hide() {
        this.isVisible = false;
        this._clearResults();
        document.body.removeChild(this.ui.overlay);
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _createUI (private)
     * class  : UserMenu
     * desc   : Build UI Elements
     * arg    : {object} container - The UserMenu container
     **/
    _createUI() {
        this.ui = {
            overlay:         document.createElement('DIV'),
            container:       document.createElement('DIV'),
            input:           document.createElement('INPUT'),
            resultContainer: document.createElement('DIV')
        };

        this.ui.overlay.id   = 'search';
        this.ui.container.classList.add('container');
        this.ui.resultContainer.classList.add('result');

        this.ui.input.name = 'search';
        this.ui.input.type = 'text';

        this.ui.input.setAttribute('autocomplete', 'off');

        this.ui.container.appendChild(this.ui.input);
        this.ui.overlay.appendChild(this.ui.container);
        this.ui.overlay.appendChild(this.ui.resultContainer);
    }


    _eventListener() {
        let that = this;
        // TODO : integrate w/ shortcut to aggro from body and preventDefault on keyboard event
        this.ui.input.addEventListener('keyup', function(event) {
            //   ESC key pressed         Search is active   Empty input
            if ((event.keyCode === 27 && that.isVisible) || that.ui.input.value.length === 0) { // Close search component
                that.hide();
            }

            else {
                that._search();
            }
        });
    }


    _search() {
        this._clearResults();

        if (this.ui.input.value.length > 1) {
            for (let i = 0; i < this._entries.length; ++i) {
                let result = matchItem(this._entries[i], this.ui.input.value); // Perform a matching test

                if (result !== null) { // Here we avoid useless chat between Main and Worker thread
                    this._newMatch(result);
                }
            }
        }
    }


    _newMatch(result) {
        let entry = document.createElement('DIV'); // Creating its entry
        let cover = document.createElement('DIV'); // Creating its entry
        let info = document.createElement('DIV'); // Creating its entry

        let trackCover = document.createElement('IMG');

        let trackTitle = document.createElement('P');
        let trackAlbum = document.createElement('P');
        let trackComposer = document.createElement('P');
        let trackGenre = document.createElement('P');
        let matchInfo = document.createElement('P');

        entry.classList.add('entry');

        trackTitle.innerHTML = boldMatchingString(result.entry.title, this.ui.input.value) + ' - ' + boldMatchingString(result.entry.artist, this.ui.input.value);
        trackAlbum.innerHTML = result.entry.track.year  + ' - ' + boldMatchingString(result.entry.album, this.ui.input.value);
        trackComposer.innerHTML = boldMatchingString(result.entry.composer, this.ui.input.value);
        trackGenre.innerHTML = boldMatchingString(result.entry.genre, this.ui.input.value);
        matchInfo.innerHTML  = result.match.toTitleCase();

        let that = this;
        entry.addEventListener('dblclick', () => {
            window.app.changeTrack(result.entry.track, true);
            that.hide();
        });

        trackCover.src = result.entry.track.cover;

        cover.appendChild(trackCover);

        info.appendChild(trackTitle);
        info.appendChild(trackAlbum);
        info.appendChild(trackComposer);
        info.appendChild(trackGenre);
        info.appendChild(matchInfo);

        entry.appendChild(cover);
        entry.appendChild(info);

        this.ui.resultContainer.appendChild(entry);
    }


    _clearResults() {
        this.ui.resultContainer.innerHTML = '';
    }


    _formatEntries(rawEntries) {
        for (let i = 0; i < rawEntries.length; ++i) {
            this._entries.push({
                track:    rawEntries[i],
                title:    rawEntries[i].title,
                artist:   rawEntries[i].artist,
                album:    rawEntries[i].album,
                composer: rawEntries[i].composer,
                genre:    rawEntries[i].genre
            });
        }
    }

    getVisible() { return this.isVisible; }
}

export default SearchBar
