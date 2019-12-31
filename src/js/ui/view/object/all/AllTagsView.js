import SceneView from "../../SceneView";
import ScrollBar from "../../../component/bar/ScrollBar";
'use strict';


// This mother class is a way to proxify the fetch layout and content for all object views
class AllTagsView extends SceneView {


  constructor(options) {
    super(options);

    this._type = options.type; // Used to load content from server. Must be object type, no caps, no plural
    this._keys = options.keys; // Keys used to access objects in process/build view without code duplication
    this._sort = options.sort;

    this._dom = {
      wrapper: null,
      title: null,
      description: null
    };

    if (options.sort === 'letters') { // Create sort container depending on sort type
      this._letterGroups = {}; // The object that contains each individual first letter items
    } else if (options.sort === 'years') {
      this._yearGroups = {};
    }

    if (options.sort) { // Sorted objects are automatically handled. Genre must be handled manually due to its taxonomic character
      this._init()
        .then(this._processObjects.bind(this))
        .then(this._buildView.bind(this))
        .then(this._viewReady);
    }
  }


  _init() { // Must be called in child class when needed, and chain the specific ui initialization with then
    return new Promise((resolve, reject) => {
      this._fetchWrapper()
        .then(this._getAllObjects.bind(this))
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
            
            this._dom.wrapper = doc.getElementsByClassName(`${this._type}s`)[0];
            this._dom.title = doc.getElementsByClassName(`all-objects-title`)[0];
            this._dom.description = doc.getElementsByClassName(`all-objects-description`)[0];

            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }


  _getAllObjects() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.get(`view/all/${this._type}`)
        .then(response => {
          // Resolve promise to build UI in child class
          resolve(response);
        }).catch(reject);
    });
  }


  // Route to letters or years process depending on parameters sent in constructor
  _processObjects(response) {
    return new Promise((resolve, reject) => {
      this._dom.title.innerHTML = mzk.lang.allObjectsView[`${this._type}s`].title;
      this._dom.description.innerHTML = `${mzk.lang.allObjectsView[`${this._type}s`].description} ${response[this._keys.OBJECTS].length} ${mzk.lang.playlist[`${this._type}s`]}.`;
      if (this._sort === 'letters') {
        this._processByLetters(response).then(resolve).catch(reject);
      } else if (this._sort === 'years') {
        this._processByYears(response).then(resolve).catch(reject);
      } else {
        reject();
      }
    });
  }


  _processByLetters(response) {
    return new Promise(resolve => {
      // Separate response into letterKey objects
      let letters = '';
      for (let i = 0; i < response[this._keys.OBJECTS].length; ++i) {
        const letterKey = response[this._keys.OBJECTS][i][this._keys.NAME].charAt(0).toLowerCase(); // Get the first letter
        if (letters.indexOf(letterKey) === -1) {
          letters += letterKey;
          this._letterGroups[letterKey] = [ response[this._keys.OBJECTS][i] ]; // Index the artists by unique letters.
        } else {
          this._letterGroups[letterKey].push(response[this._keys.OBJECTS][i]); // Add to the existing list
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


  _processByYears(response) {
    return new Promise(resolve => {
      const albums = response[this._keys.OBJECTS]; // Raw albums are artist / alphabeticaly rodered
      // Double sort to first sort alphabetically by title, then by year (most recent first)
      albums.sort((a, b) => (a[this._keys.NAME] < b[this._keys.NAME]) ? 1 : -1);
      albums.sort((a, b) => (a[this._keys.YEAR] < b[this._keys.YEAR]) ? 1 : -1);
      // Building year groups object
      let cursorYear = '';
      for (let i = 0; i < albums.length; ++i) {
        // Year is different from previous one, creating a new entry in year groups
        if (cursorYear !== albums[i][this._keys.YEAR]) {
          cursorYear = albums[i][this._keys.YEAR];
          this._yearGroups[cursorYear] = [];
        }
        // Push current album
        this._yearGroups[cursorYear].push(albums[i]);
      }

      resolve();
    });
  }


  _buildView() {
    return new Promise((resolve, reject) => {
      let groups = {};
      let keys = {};
      // Fill work object depending on sort type
      if (this._sort === 'letters') {
        groups = this._letterGroups;
        keys = Object.keys(this._letterGroups);
      } else if (this._sort === 'years') {
        groups = this._yearGroups;
        keys = Object.keys(this._yearGroups);
      } else {
        reject();
      }
      // Sort keys so they are correctly displayed
      keys.sort();
      // Iterate over groups object by its keys
      for (let i = 0; i < keys.length; ++i) {
        this._buildSingleGroup(groups, keys[i]);
      }
      // Append scrollbar to the view wrapper
      new ScrollBar({
        target: this._dom.wrapper
      });

      resolve();
    });
  }


  _buildSingleGroup(groups, group) {
    const groupsWrapper = document.createElement('DIV');
    const groupType = document.createElement('H1');
    const objectWrapper = document.createElement('DIV');

    groupsWrapper.classList.add('groups-wrapper');
    groupType.innerHTML = group.toUpperCase();
    objectWrapper.classList.add('objects-wrapper');

    groupsWrapper.appendChild(groupType);
    groupsWrapper.appendChild(objectWrapper);
    this._dom.wrapper.appendChild(groupsWrapper);

    for (let i = 0; i < groups[group].length; ++i) {
      this._buildSingleObject(objectWrapper, groups[group][i]);
    }
  }


  _buildSingleObject(wrapper, element) {
    const container = document.createElement('DIV');
    const pp = document.createElement('IMG');
    const name = document.createElement('P');
    /* TODO change data in tooltip
      imgContainer.classList.add('tooltip-bottom');
      imgContainer.dataset.tooltip = this._letterGroups[keys[i]][j].ARTIST_NAME; */
    // Define picture or set fallback
    if (element[this._keys.PP] !== null && Utils.imageUrlExists(element[this._keys.PP]) === true) {
      pp.src = element[this._keys.PP];
    } else {
      pp.src = `static/img/object/${this._keys.defaultSVG}.svg`;
    }

    name.innerHTML = element[this._keys.NAME];
    container.dataset.id = element[this._keys.ID];
    container.addEventListener('click', () => {
      mzk.ui.setSceneView({
        name: `Single${this._type.replace(/^\w/, c => c.toUpperCase())}`, // Capitalize first letter
        uiName: element[this._keys.NAME],
        id: element[this._keys.ID]
      });
    }, false);

    container.appendChild(pp);
    container.appendChild(name);
    // Put append child in raf to allow progressive render in wrapper
    requestAnimationFrame(() => {
      wrapper.appendChild(container);
    });
  }


  get dom() {
    return this._dom.wrapper;
  }


}


export default AllTagsView;