/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  UserMenu class                                 *
 *                                                 *
 *  Handle the user's menu                         *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { matchItem } from "../utils/Utils";

class SearchBar {

    constructor() {

        this.isVisible = false;
        this._entries = [];
        this._eventListeners = [];

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

        if (this.ui.input.value.length > 0) {
            for (let i = 0; i < this._entries.length; ++i) {
                let result = matchItem(this._entries[i], this.ui.input.value); // Perform a matching test

                if (result !== null) { // Here we avoid useless chat between Main and Worker thread
                    this._newMatch(result);
                }
            }
        }
    }


    _newMatch(result) {
        let tmp = document.createElement('DIV'); // Creating its entry

        tmp.innerHTML = result.entry.title + ' - ' +
                        result.entry.artist +
                        '<br><b>Match: </b>' + result.match.toTitleCase(); // TODO : clear match output

        let that = this;
        this._eventListeners.push(tmp.addEventListener('dblclick', () => {
            window.app.changeTrack(result.entry.track, true);
            that.hide();
        }));

        this.ui.resultContainer.appendChild(tmp);
    }


    _clearResults() {
        this.ui.resultContainer.innerHTML = '';
    }


    _formatEntries(rawEntries) {
        for (let i = 0; i < rawEntries.length; ++i) {
            this._entries.push({
                track:    rawEntries[i],
                title:    rawEntries[i].title,
                album:    rawEntries[i].album,
                artist:   rawEntries[i].artist,
                composer: rawEntries[i].composer,
                genre:    rawEntries[i].genre
            });
        }
    }

    getVisible() { return this.isVisible; }
}

export default SearchBar
