import SceneView from '../SceneView';
import ViewSwitcherContext from "../../context/ViewSwitcherContext";
'use strict';

class LibraryViews extends SceneView {


  constructor(options) {
    super(options);

    this._tracks = [];
    this._scrollBar = {};

    this._selection = [];
    this._click = { // Object to handle click events on track entry
      dbclick: false,
      index: -1,
      timeoutId: -1
    };

    this._playingTrackIndex = -1;

    if (options.selection) { // Override selection only if user has a selection, keep empty array from super otherwise
      this.selection = options.selection;
    }

    if (options.playingTrackIndex) {
      this._playingTrackIndex = options.playingTrackIndex;
    }

    this._container = {};
    this._optionButton = {};
    this._sceneCommands = {};
    this._sceneManipulations = {};
    this._centerOnTop = {};
    this._centerOnActiveTrack = {};
    this._lockCenternOn = {};
    this._centerOnBottom = {};
    this._activeView = {};

    this._activeViewLabel = options.viewLabel;
    this._viewSwitcher = new ViewSwitcherContext({
      target: document.body,
      url: 'context/changeview/'
    });
  }


  _events() {
    this._activeView.addEventListener('click', () => {
      if (document.body.contains(this._viewSwitcher.dom)) {
        this._viewSwitcher.close();
      } else {
        this._viewSwitcher.open();
      }
    });

    this._centerOnTop.addEventListener('click', () => {
      this.centerOn({
        position: 'top'
      });
    });

    this._centerOnActiveTrack.addEventListener('click', () => {
      this.centerOn({
        index: this.playingTrackIndex
      });
    });

    this._lockCenternOn.addEventListener('click', () => {
      const prefName = 'lock-center-on-track';
      const pref = mzk.user.getPreference(prefName);
      if (pref === true) {
        mzk.user.setPreference(prefName, false);
        this._lockCenternOn.src = '/static/img/actions/lock-off.svg';
        this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.off;
      } else {
        mzk.user.setPreference(prefName, true);
        this._lockCenternOn.src = '/static/img/actions/lock-on.svg';
        this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.on;
      }
    });

    this._centerOnBottom.addEventListener('click', () => {
      this.centerOn({
        position: 'bottom'
      });
    });

    if (this._activeViewLabel === 'ListView') {
      this._optionButton.addEventListener('click', () => {
        this._optionClicked();
      });
    }
  }


  buildDom() {
    return new Promise((resolve, reject) => {
      mzk.komunikator.getTemplate('view/library/layout/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, 'text/html');
          const container = doc.getElementsByClassName('library-page')[0];

          this._optionButton = doc.getElementById('scene-view-option');
          this._sceneCommands = doc.getElementById('scene-commands');
          this._sceneManipulations = doc.getElementById('scene-manipulation');
          this._centerOnTop = doc.getElementById('center-on-top');
          this._centerOnActiveTrack = doc.getElementById('center-on-track');
          this._lockCenternOn = doc.getElementById('lock-center-on-track');
          this._centerOnBottom = doc.getElementById('center-on-bottom');

          this._setLangFeedback();

          this._activeView = this._sceneCommands.childNodes[1];
          this._activeView.innerHTML = mzk.lang.libraryview[this._activeViewLabel];

          if (this._activeViewLabel === 'DetailsView') {
            this._optionButton.style.display = 'none';
          }
/*
          container.appendChild(this._optionButton);
          container.appendChild(this._sceneCommands);
          container.appendChild(this._sceneManipulations);
*/

          this._events();

          resolve(container);
        })
        .catch(reject);
    });
  }


  _setLangFeedback() {
    this._centerOnTop.parentNode.dataset.tooltip = mzk.lang.libraryview.centertop;
    this._centerOnActiveTrack.parentNode.dataset.tooltip = mzk.lang.libraryview.centertrack;
    this._lockCenternOn.parentNode.dataset.tooltip = mzk.lang.libraryview.lockcenter.off; // Auto center is off by default
    this._centerOnBottom.parentNode.dataset.tooltip = mzk.lang.libraryview.centerbottom;

    if (Utils.isMobileDevice() === true) {
      this._centerOnTop.parentNode.classList.add('tooltip-bottom');
      this._centerOnActiveTrack.parentNode.classList.add('tooltip-bottom');
      this._lockCenternOn.parentNode.classList.add('tooltip-bottom');
      this._centerOnBottom.parentNode.classList.add('tooltip-bottom');
    } else {
      this._centerOnTop.parentNode.classList.add('tooltip-left');
      this._centerOnActiveTrack.parentNode.classList.add('tooltip-left');
      this._lockCenternOn.parentNode.classList.add('tooltip-left');
      this._centerOnBottom.parentNode.classList.add('tooltip-left');
    }
  }


  _simpleClick(index) {
    const isTargetSelected = this._tracks[index].selected; // Saving target selection state before unselecting all
    this.unselectAll();
    // Remove selection on track if it was already selected before click
    if (isTargetSelected === true) {
      this._removeFromSelection(index);
    } else {
      this._addToSelection(index);
    }
  }

  _playTrack(index) {
    clearTimeout(this._click.timeoutId);
    this.stopPlayback();
    this._addToSelection(index);
    mzk.changeTrack(this._tracks[index].id);
  }

  _addToSelection(index) {
    this._tracks[index].selected = true;
    this._selection.push(parseInt(index, 10));
    this._trimSelection();
  }

  _removeFromSelection(index) {
    this._tracks[index].selected = false;
    this._selection.splice(this._selection.indexOf(index), 1);
    this._trimSelection();
  }

  _trimSelection() {
    // Sort selection ids
    this._selection.sort((a, b) => {
      return (a - b);
    });
    // Removing all duplicates
    this._selection = [...new Set(this._selection)];
  }

  _toggleSelected(index) {
    if (this._tracks[index].selected) {
      this._removeFromSelection(index);
    } else {
      this._addToSelection(index);
    }
  }

  _controlShiftClick(index) {
    let start = 0;
    let end = 0;

    if (parseInt(index, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
      start = parseInt(index, 10);
      end = this._selection[0];
    } else if (parseInt(index, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
      start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
      end = parseInt(index, 10);
    }

    for (let i = start; i <= end; ++i) { // Loop to fill in between items
      this._addToSelection(i);
    }
  }

  _trackClicked(event) {
    event.stopPropagation(); // Block click listener

    const closest = event.target.closest('.track');
    let index = 0;

    if (closest === null) {
      this.unselectAll();
      return;
    } else {
      index = closest.dataset.id;
    }

    if (Utils.isMobileDevice()) { // Mobile Click
      this.unselectAll();
      this._playTrack(index);
      return;
    }

    if (!this._click.dbclick || this._click.index !== index) { // Second test force dbclick to occur on same track
      this._click.dbclick = true; // Activate double click lock
      this._click.index = index;

      if (!event.ctrlKey) { // Simple click
        this._simpleClick(index);
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        this._controlShiftClick(index);
      } else if (event.ctrlKey) { // Ctrl click behavior
        this._toggleSelected(index);
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false; // Deactivate double click lock
      }, 300);
    } else { // Dble click
      this._playTrack(index);
    }

    this._trimSelection();
  }


  stopPlayback() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].playing = false; // Remove the flag
      this._playingTrackIndex = -1;
    }
  }

  unselectAll() {
    this._selection = [];

    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].selected = false;
    }
  }

  changeTrack(id) {
    let index = 0;

    for (let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        index = i;
        break;
      }
    }

    if (this._playingTrackIndex !== -1) {
      this._tracks[this._playingTrackIndex].playing = false;
    }

    this._playingTrackIndex = index;
    this._click.dbclick = false;
    this._tracks[index].playing = true;
  }

  addTracks() {

  }

  initTracksState() {
    if (this._playingTrackIndex >= 0) {
      this._tracks[this._playingTrackIndex].playing = true;
    }

    if (this._selection.length > 0) {
      for (let i = 0; i < this._selection.length; ++i) {
        this._tracks[this._selection[i]].selected = true;
      }
    }

    const options = {
      index: this._playingTrackIndex
    };

    this.centerOn(options);
  }

  centerOn(options) {
    let index = -1;

    if (options.position) {
      this._boundCentering(options.position);
    } else {
      index = this._getIndexToCenterOn(options);

      if (index === -1) {
        return;
      }

      const relativeDelta = this._tracks[index].dom.offsetTop + this._tracks[index].dom.scrollHeight / 2;
      this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
    }
  }

  _boundCentering(position) {
    if (position === 'top') {
      this._dom.container.scrollTop = 0;
    } else if (position === 'bottom') {
      const relativeDelta = this._tracks[this._tracks.length -1].dom.offsetTop + this._tracks[this._tracks.length -1].dom.scrollHeight / 2;
      this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
    }
  }

  _getIndexToCenterOn(options) {
    let index = -1;

    if (options.index && options.index !== -1) {
      index = options.index;
    } else if (options.id) {
      for (let i = 0; i < this._tracks.length; ++i) {
        if (parseInt(this._tracks[i].id) === options.id) {
          index = i;
          break;
        }
      }
    }

    return index;
  }


  getTrackById(id) {
    return this._tracks[id];
  }


  isFirstTrack() {
    return this._playingTrackIndex === 0;
  }


  isLastTrack() {
    return this._playingTrackIndex === this._tracks.length - 1;
  }


  get dom() {
    return this._dom.fragment;
  }


  get playingTrackId() {
    return this._tracks;
  }


  get playingTrackIndex() {
    return this._playingTrackIndex;
  }


  get firstTrackId() {
    return this._tracks[0].id;
  }


  get nextTrackId() {
    return this._tracks[(this._playingTrackIndex + 1) % this._tracks.length].id;
  }


  get previousTrackId() {
    return this._tracks[(this._playingTrackIndex + this._tracks.length - 1) % this._tracks.length].id;
  }


  get selection() {
    return this._selection;
  }


  set playingTrackIndex(trackIndex) {
      this._playingTrackIndex = trackIndex;
  }


  set selection(selection) {
    this._selection = selection;
  }


}

export default LibraryViews;
