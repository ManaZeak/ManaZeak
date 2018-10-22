import ListView from './views/ListView.js';
'use_strict';

class Scene {
  /**
   * @summary ManaZeak main scene to renders views in
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the main scene
   **/
  constructor() {
    this._scene = document.getElementById('scene');
    this._optionButton = document.getElementById('view-option');
    // TODO : add test function that replace scene with a sandBox to work with

    this._events();
  }

  _events() {
    this._optionButton.addEventListener('click', () => {
      this.view.optionsClicked();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  stopPlayback() {
    this.view.removePlayingIcon(); // Warning, this is specific to listView so far
  }

  /**
   * @method
   * @name addView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new view in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   **/
  addView(node) {
    // TODO : clear existing material
    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  extend() {
    this._scene.classList.add('extended');
    setTimeout(() => {
      this.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  retract() {
    this._scene.classList.remove('extended');
    setTimeout(() => {
        this.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  toggleExtension() {
    if (this._scene.classList.contains('extended')) {
      this.retract();
    } else {
      this.extend();
    }
  }

  /**
   * @method
   * @name updateView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the current view with the given playlist
   * @param {object} playlist - The playlist to update the view with
   **/
  updateView(playlist) {
    const artists = playlist.getArtists();
    const tracks = [];

    for (let i = 0; i < artists.length; ++i) {
      for (let j = 0; j < artists[i].albums.length; ++j) {
        for (let k = 0; k < artists[i].albums[j].tracks.length; ++k) {
          tracks.push(artists[i].albums[j].tracks[k]);
        }
      }
    }

    const options = {
      columns: [{
          name: 'Duration',
          order: 0,
          width: '10'
        },
        {
          name: 'Title',
          order: 1,
          width: '20'
        },
        {
          name: 'Artist',
          order: 2,
          width: '14'
        },
        {
          name: 'Composer',
          order: 3,
          width: '14'
        },
        {
          name: 'Performer',
          order: 4,
          width: '14'
        },
        {
          name: 'Album',
          order: 5,
          width: '14'
        },
        {
          name: 'Genre',
          order: 6,
          width: '14'
        }
      ],
      target: this._scene,
      availableColumns: [ // TODO : store this in a default.json file somewhere
        {
          name: 'Duration',
          order: 0,
          width: '10'
        },
        {
          name: 'Title',
          order: 1,
          width: '20'
        },
        {
          name: 'Artist',
          order: 2,
          width: '14'
        },
        {
          name: 'Composer',
          order: 3,
          width: '14'
        },
        {
          name: 'Performer',
          order: 4,
          width: '14'
        },
        {
          name: 'Album',
          order: 5,
          width: '14'
        },
        {
          name: 'Genre',
          order: 6,
          width: '14'
        }
      ]
    };

    this.view = new ListView(options); // TODO : move this
    this.addView(this.view.getDOMFragment());
    this.view.addTracks(tracks);

    setTimeout(() => {
      this.view.centerOn(2);
    }, 500);
  }

  changeTrack(id) {
    this.view.changeTrack(id);
  }

  getNextTrackId() {
    return this.view.getNextTrackId();
  }
}

export default Scene;
