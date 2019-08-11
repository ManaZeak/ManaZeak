'use strict';


class SceneView {
  constructor(options) {
    this._tracks = [];
    this._scrollBar = {};

    this._selection = [];
    this._click = { // Object to handle click events on track entries
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

    for ( let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        index = i;
        break;
      }
    }

    mzk.ui.startLoading()
      .then(() => {
        if (this._playingTrackIndex !== -1) {
          this._tracks[this._playingTrackIndex].playing = false;
        }

        this._playingTrackIndex = index;
        this._click.dbclick = false;
        this._tracks[index].playing = true;
        mzk.ui.stopLoading();
      });
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

  refreshView() {

  }

  fillContext() {
    return null;
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

export default SceneView;
