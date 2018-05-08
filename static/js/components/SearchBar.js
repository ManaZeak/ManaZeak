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
        this.entries = [];

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
            overlay: document.createElement('DIV'),
            container: document.createElement('DIV'),
            input:       document.createElement('INPUT'),
            resultContainer: document.createElement('DIV')
        };

        this.ui.overlay.id   = 'search';
        this.ui.container.classList.add('container');
        this.ui.resultContainer.classList.add('result');

        this.ui.input.name = 'search';
        this.ui.input.type = 'text';

        this.ui.container.appendChild(this.ui.input);
        this.ui.overlay.appendChild(this.ui.container);
        this.ui.overlay.appendChild(this.ui.resultContainer);
    }


    _eventListener() {
        let that = this;
        // TODO : integrate w/ shortcut to aggro from body
        this.ui.input.addEventListener('keyup', function(event) {

            if (event.keyCode === 27 && that.isVisible) {
                that.hide();
                return;
            }

            that._clearResults();
            that._search();
        });
    }


    _search() {
        for (let i = 0; i < this.entries.length; ++i) {
  			let result = matchItem(this.entries[i], this.ui.input.value); // Perform a matching test

			if (result !== null) { // Here we avoid useless chat between Main and Worker thread
                this._newMatch(result);
			}
        }
    }


    _newMatch(result) {
        let tmp = document.createElement('DIV'); // Creating its entry
		tmp.innerHTML = result.entry.title + ' - ' +
                        result.entry.artist + '<br><b>Match: </b>' +
                        result.match; // TODO : clear match output
        this.ui.resultContainer.appendChild(tmp);
    }


    _clearResults() {
        this.ui.resultContainer.innerHTML = '';
    }


    _formatEntries(rawEntries) {
        for (let i = 0; i < rawEntries.length; ++i) {
            this.entries.push({
                title: rawEntries[i].title,
                album: rawEntries[i].album,
                artist: rawEntries[i].artist,
                composer: rawEntries[i].composer,
                genre: rawEntries[i].genre
            });
        }
    }


    getVisible() { return this.isVisible; }
}

export default SearchBar
