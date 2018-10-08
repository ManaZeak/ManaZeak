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
    // TODO : add test function that replace scene with a sandBox to work with
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

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
    let fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  /**
  * @method
  * @name addOverlay
  * @public
  * @memberof Scene
  * @author Arthur Beaulieu
  * @since September 2018
  * @description Add an overlay div (modal style) over the scene
  * @param {object} node - The DOM node to append to the scene as an overlay
  **/
  addOverlay(node) {
    let fragment = document.createDocumentFragment();
    node.classList.add('overlay');
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  toggleSceneExtension() {
    //TODO : replace this;view w/ this._activeView ie Views array system
    if (this._scene.classList.contains('extended')) {
      this._scene.classList.remove('extended');
    } else {
      this._scene.classList.add('extended');
    }

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
    let artists = playlist.getArtists();
    let tracks = [];

    for (var i = 0; i < artists.length; ++i) {
      for (var j = 0; j < artists[i].albums.length; ++j) {
        for (var k = 0; k < artists[i].albums[j].tracks.length; ++k) {
          tracks.push(artists[i].albums[j].tracks[k]);
        }
      }
    }

    let options = {
        columns: [
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
      //view.addTracks(tracks);
    }, 500);
  }
}

export default Scene;
