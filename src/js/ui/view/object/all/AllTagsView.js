import SceneView from "../../SceneView";
import ScrollBar from "../../../component/bar/ScrollBar";
'use strict';


// This mother class is a way to proxify the fetch layout and content for all object views
class AllTagsView extends SceneView {


  constructor(options) {
    super(options);

    this._type = options.type;
    if (options.sort === 'letters') {
      this._letterGroups = {}; // The object that contains each individual first letter items
    } else if (options.sort === 'years') {
      this._yearGroups = {};
    }

    this._dom = {
      wrapper: null,
      title: null,
      description: null
    };
  }


  _init() { // Must be called in child class when needed, and chain the specific ui initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(this._getAll.bind(this))
        .then(resolve).catch(reject);
    });
  }


  _fetchWrapper() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate(`view/all/${this._type}/layout/`)
        .then((response) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response, 'text/html');
            
            this._dom.wrapper = doc.getElementsByClassName(`all-${this._type}s-page`)[0];
            this._dom.title = doc.getElementsByClassName(`all-objects-title`)[0];
            this._dom.description = doc.getElementsByClassName(`all-objects-description`)[0];

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }

  _getAll() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get(`view/all/${this._type}`)
        .then(response => {
          // Resolve promise to build UI in child class
          resolve(response);
        }).catch(reject);
    });
  }


  _processByLetters(response) {
    return new Promise(resolve => {
      this._dom.title.innerHTML = mzk.lang.allObjectsView[this._keyWords.object].title;
      this._dom.description.innerHTML = `${mzk.lang.allObjectsView[this._keyWords.object].description} ${response[this._keyWords.fromResponse].length} ${mzk.lang.playlist[this._keyWords.object]}.`;
      // Separate response into letterKey objects
      let letters = '';
      for (let i = 0; i < response[this._keyWords.fromResponse].length; ++i) {
        const letterKey = response[this._keyWords.fromResponse][i][this._keyWords.objectName].charAt(0).toLowerCase(); // Get the first letter
        if (letters.indexOf(letterKey) === -1) {
          letters += letterKey;
          this._letterGroups[letterKey] = [ response[this._keyWords.fromResponse][i] ]; // Index the artists by unique letters.
        } else {
          this._letterGroups[letterKey].push(response[this._keyWords.fromResponse][i]); // Add to the existing list
        }
      }
      // Now grouping numerical keys together (0-9)
      const keys = Object.keys(this._letterGroups);
      let alphaNumericalGroup = [];
      for (let i = 0; i < keys.length; ++i) {
        if (isNaN(parseInt(keys[i])) === false) {
          alphaNumericalGroup = alphaNumericalGroup.concat(this._letterGroups[keys[i]]);
          delete this._letterGroups[keys[i]];
        }
      }
      // Write into letter groups
      if (alphaNumericalGroup.length > 0) {
        this._letterGroups['0-9'] = alphaNumericalGroup;
      }
      // Resolve promise to build UI
      resolve();
    });
  }


  _processByYear(response) {
    return new Promise(resolve => {
      this._dom.title.innerHTML = mzk.lang.allObjectsView[this._keyWords.object].title;
      this._dom.description.innerHTML = `${mzk.lang.allObjectsView[this._keyWords.object].description} ${response[this._keyWords.fromResponse].length} ${mzk.lang.playlist[this._keyWords.object]}.`;
      const albums = response[this._keyWords.fromResponse]; // Raw albums are artist / alphabeticaly rodered
      // Double sort to first sort alphabetically by title, then by year (most recent first)
      albums.sort((a, b) => (a[this._keyWords.objectName] < b[this._keyWords.objectName]) ? 1 : -1);
      albums.sort((a, b) => (a[this._keyWords.objectYear] < b[this._keyWords.objectYear]) ? 1 : -1);
      // Building year groups object
      let cursorYear = '';
      for (let i = 0; i < albums.length; ++i) {
        // Year is different from previous one, creating a new entry in year groups
        if (cursorYear !== albums[i][this._keyWords.objectYear]) {
          cursorYear = albums[i][this._keyWords.objectYear];
          this._yearGroups[cursorYear] = [];
        }
        // Push current album
        this._yearGroups[cursorYear].push(albums[i]);
      }

      resolve();
    });
  }


  _buildLettersView() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this._letterGroups);
      keys.sort();
      // Iterate over letter groups object
      for (let i = 0; i < keys.length; ++i) {
        const container = document.createElement('DIV');
        const letter = document.createElement('H1');

        container.classList.add('allart-letter-container');
        letter.innerHTML = keys[i].toUpperCase();

        const letterArtistsWrapper = document.createElement('DIV');
        letterArtistsWrapper.classList.add('allart-letter-artists');

        container.appendChild(letter);
        container.appendChild(letterArtistsWrapper);
        this._dom.wrapper.appendChild(container);

        for (let j = 0; j < this._letterGroups[keys[i]].length; ++j) {
          const imgContainer = document.createElement('DIV');
          const artistImg = document.createElement('IMG');
          const artistName = document.createElement('P');
/* TODO change data in tooltip
          imgContainer.classList.add('tooltip-bottom');
          imgContainer.dataset.tooltip = this._letterGroups[keys[i]][j].ARTIST_NAME;
 */
          imgContainer.dataset.id = this._letterGroups[keys[i]][j][this._keyWords.objectId];

          if (this._letterGroups[keys[i]][j][this._keyWords.objectPp] !== null) {
            artistImg.src = this._letterGroups[keys[i]][j][this._keyWords.objectPp];
          } else {
            artistImg.src = `static/img/object/${this._keyWords.defaultImg}.svg`;
          }

          artistName.innerHTML = this._letterGroups[keys[i]][j][this._keyWords.objectName];

          imgContainer.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: this._keyWords.objectEntryType,
              uiName: this._letterGroups[keys[i]][j][this._keyWords.objectName],
              id: this._letterGroups[keys[i]][j][this._keyWords.objectId]
            });
          }, false);

          imgContainer.appendChild(artistImg);
          imgContainer.appendChild(artistName);
          requestAnimationFrame(() => {
            letterArtistsWrapper.appendChild(imgContainer);
          });
        }
      }

      new ScrollBar({
        target: this._dom.wrapper
      });

      resolve();
    });
  }


  _buildYearsView() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this._yearGroups);
      keys.reverse(); // Most recent years come first
      // Iterate over letter groups object
      for (let i = 0; i < keys.length; ++i) {
        const container = document.createElement('DIV');
        const letter = document.createElement('H1');

        container.classList.add('allalb-year-container');
        letter.innerHTML = keys[i].toUpperCase();

        const letterArtistsWrapper = document.createElement('DIV');
        letterArtistsWrapper.classList.add('allalb-year-albums');

        container.appendChild(letter);
        container.appendChild(letterArtistsWrapper);
        this._dom.wrapper.appendChild(container);

        for (let j = 0; j < this._yearGroups[keys[i]].length; ++j) {
          const imgContainer = document.createElement('DIV');
          const albumImg = document.createElement('IMG');
          const albumName = document.createElement('P');
/* TODO change data in tooltip
          imgContainer.classList.add('tooltip-bottom');
          imgContainer.dataset.tooltip = `${this._yearGroups[keys[i]][j].ALBUM_TITLE}`;
*/
          imgContainer.dataset.id = this._yearGroups[keys[i]][j][this._keyWords.objectId];

          if (this._yearGroups[keys[i]][j][this._keyWords.objectPp] !== null) {
            albumImg.src = this._yearGroups[keys[i]][j][this._keyWords.objectPp];
          } else {
            albumImg.src = `static/img/object/${this._keyWords.defaultImg}.svg`;
          }

          albumName.innerHTML = this._yearGroups[keys[i]][j][this._keyWords.objectName];

          imgContainer.addEventListener('click', () => {
            mzk.ui.setSceneView({
              name: 'SingleAlbum',
              uiName: this._yearGroups[keys[i]][j][this._keyWords.objectName],
              id: this._yearGroups[keys[i]][j][this._keyWords.objectId]
            });
          }, false);

          imgContainer.appendChild(albumImg);
          imgContainer.appendChild(albumName);
          requestAnimationFrame(() => {
            letterArtistsWrapper.appendChild(imgContainer);
          });
        }
      }

      new ScrollBar({
        target: this._dom.wrapper
      });

      resolve();
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllTagsView;