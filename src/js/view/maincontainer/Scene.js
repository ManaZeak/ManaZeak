import ListView from './views/ListView.js';
import AlbumView from './views/AlbumView.js';
import SceneCommands from './SceneCommands.js';
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
    this.view = {};
    this._sceneCommands = new SceneCommands({
      target: this._scene
    });

    this._events();
  }

  _events() {
    this._optionButton.addEventListener('click', () => {
      this.view.optionsClicked();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  stopPlayback() {
    this.view.stopPlayback(); // Warning, this is specific to listView so far
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
    this._scene.innerHTML = '';
    this._scene.appendChild(this._sceneCommands.dom);
    this._scene.appendChild(this._optionButton);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  extend() {
    this._sceneCommands.asideClosed();
    this.view.refreshView();
  }

  retract() {
    this._sceneCommands.asideOpened();
    this.view.refreshView();
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

    const activeView = playlist.activeView;

    if (activeView === 'ListView') {
      this.view = new ListView(options);
    }

    else if (activeView === 'AlbumView') {
      this.view = new AlbumView(options);
    }

    this.addView(this.view.getDOMFragment());
    this.view.addTracks(playlist.getArtists());
  }

  changeTrack(id) {
    this.view.changeTrack(id);
  }

  getNextTrackId() {
    return this.view.getNextTrackId();
  }

  getPreviousTrackId() {
    return this.view.getPreviousTrackId();
  }

  getFirstTrackId() {
    return this.view.getFirstTrackId();
  }

  isLastTrack() {
    return this.view.isLastTrack();
  }

  startLoading() {
    return new Promise(resolve => {
      const spinner = document.createElement('DIV');
      spinner.id = 'loading-spinner';
      this._scene.appendChild(spinner);
      setTimeout(() => {
        resolve();
      }, 50); // Ensure spinner has started its animation before resolving the promise
    });
  }

  stopLoading() {
    return new Promise(resolve => {
        const spinner = this._scene.querySelector("#loading-spinner");
        if (spinner != null) {
            this._scene.removeChild(spinner);
        }
        resolve();
    });
  }
}

export default Scene;
