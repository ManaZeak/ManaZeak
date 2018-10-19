import TopBar from './topbar/TopBar.js';
import Aside from './maincontainer/Aside.js';
import Scene from './maincontainer/Scene.js';
import FootBar from './footbar/FootBar.js';
import Modal from '../utils/Modal.js';
'use_strict';


class View {
  /**
   * @summary Fronted View class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle everything that is UI. Not meant AT ALL to handle data modelisation, use <code>Model.js</code>. This class is meant to be accessed from anywhere in the app, since it is attached to the Mzk object.
   **/
  constructor() {
    this._mainContainer = {};
    this._topBar = {};
    this._aside = {};
    this._scene = {};
    this._footBar = {};

    this.modal = new Modal();

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the View object width TopBar, FootBar, Asides and Scene
   **/
  _init() {
    this._mainContainer = document.getElementById('mainContainer'); // Used when switching Discover (anciennement modes (partyview, managotit etc))

    this._topBar = new TopBar();
    this._aside = new Aside({
      side: 'left'
    });
    this._scene = new Scene();
    this._footBar = new FootBar();

    this._footBar.getVolumeBar().updateVolume(mzk.getIsMuted(), mzk.getVolume()); // TODO : replace with mzk.getUserVolume() or from localStorage or from opts (serv)
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing track informations
   **/
  changeTrack(track) {
    d3.selectAll('.moodbar svg g').remove(); // Clear current moodbar
    this.togglePlay();

    const player = mzk.model.getPlayer();
    this._footBar.renderMoodFile(track.moodbar);
    this._footBar.getProgressBar().updateDuration(player.getDuration());
  }

  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing state
   **/
  togglePlay() {
    const isPlaying = mzk.model.getPlayer().getIsPlaying();
    this._footBar.updatePlayButton(isPlaying);

    if (isPlaying) { // Don't handle !playing (desactivate) bc pause != stop
      this._footBar.getProgressBar().activate(); // Activate make the progress bar appear w/ animation
    }
  }

  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates UI element to match the player stand by state
   **/
  stopPlayback() {
    d3.selectAll('.moodbar svg g').remove(); // Clear current moodbar
    this._footBar.updatePlayButton(false); // Send !isPlaying to restore play icon
    this._footBar.getProgressBar().resetProgressBar();
    this._scene.stopPlayback();
  }

  /**
   * @method
   * @name initPlaylist
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the given playlist into the scene/view
   * @param {object} playlist - The playlist to init the view with
   **/
  initPlaylist(playlist) {
    this._scene.updateView(playlist);
  }

  /**
   * @method
   * @name updateVolume
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the volume values in the UI according to the player's value
   **/
  updateVolume() {
    const player = mzk.model.getPlayer();
    this._footBar.getVolumeBar().updateVolume(player.getIsMuted(), player.getVolume());
  }

  /**
   * @method
   * @name updateProgress
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates the progress bar according to the player progress' value
   **/
  updateProgress() { // Called onClick
    const progress = mzk.model.getPlayer().getProgress();
    this._footBar.getProgressBar().desactivateTransitions(); // Must disable transition when called
    this._footBar.getProgressBar().setProgress(progress);

    setTimeout(function() { // Restore transitions
      this._footBar.getProgressBar().activateTransitions();
    }.bind(this), 50); // 5 is fine, but 50 is more 'lag friendly'
  }


  extendMainContainer() {
    this._mainContainer.classList.add('extended');
    setTimeout(() => {
      this._scene.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  retractMainContainer() {
    this._mainContainer.classList.remove('extended');
    setTimeout(() => {
        this._scene.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  /** @method
   * @name addOverlay
   * @public
   * @memberof View
   * @description Add an overlay div (modal style) over the scene
   * @param {object} node - The DOM node to append to the scene as an overlay
   **/
  addOverlay(node) {
    const overlay = document.createElement('DIV');
    const fragment = document.createDocumentFragment();

    overlay.id = 'overlay';
    overlay.appendChild(node);
    fragment.appendChild(overlay);

    this._mainContainer.appendChild(fragment);
  }

  removeOverlay() {
    this._mainContainer.removeChild(document.getElementById('overlay'));
  }

  displayModal(options) {
    if (options.name === 'newlibrary') {
      mzk.komunikator.getTemplate('modals/newlibrary/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, "text/html");
          const modal = doc.getElementsByClassName('modal')[0];
          this.addOverlay(modal);

          this.modal.newLibrary({
            callback: options.callback
          });
        });
    }
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getFootBar() {
    return this._footBar;
  }
}

export default View;
