'use strict';


class SceneView {
  constructor(options) {
    this._tracks = [];
    this._scrollBar = {};

    this._selection = [];
    this._click = { // Object to handle click events on track entries
      dbclick: false,
      targetId: -1,
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

  _simpleClick(targetId) {
    const isTargetSelected = this._tracks[targetId].selected; // Saving target selection state before unselecting all
    this.unselectAll();

    if (isTargetSelected) {
      this._tracks[targetId].selected = false; // Restore previous state to properly use in Normal click behavior condition
      this._selection.splice(this._selection.indexOf(targetId), 1);
    }
  }

  _playTrack(targetId) {
    clearTimeout(this._click.timeoutId);
    this.stopPlayback();
    this._tracks[targetId].selected = true;
    this._selection.push(parseInt(targetId, 10));
    mzk.changeTrack(this._tracks[targetId].id);
  }

  _toggleSelected(targetId) {
    mzk.ui.startLoading()
      .then(() => {
        if (this._tracks[targetId].selected) {
          this._tracks[targetId].selected = false;
          this._selection.splice(this._selection.indexOf(targetId), 1);
        } else {
          this._tracks[targetId].selected = true;
          this._selection.push(parseInt(targetId, 10));
        }

        mzk.ui.stopLoading();
      });
  }

  _controlShiftClick(targetId) {
    mzk.ui.startLoading()
      .then(() => {
        let start = 0;
        let end = 0;

        if (parseInt(targetId, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
          start = parseInt(targetId, 10);
          end = this._selection[0];
        } else if (parseInt(targetId, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
          start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
          end = parseInt(targetId, 10) + 1; // +1 to not forget the targetId too
        }

        for (let i = start; i < end; ++i) { // Loop to fill in between items
          this._tracks[i].selected = true;
          this._selection.push(i);
        }

        mzk.ui.stopLoading();
      });
  }

  _trackClicked(event) {
    event.stopPropagation(); // Block window click listener

    const closest = event.target.closest('.track');
    let targetId = 0;

    if (closest === null) {
      this.unselectAll();
      return;
    } else {
      targetId = closest.dataset.id;
    }

    if (Utils.isMobileDevice()) { // Mobile Click
      this.unselectAll();
      this._playTrack(targetId);
      return;
    }

    if (!this._click.dbclick || this._click.targetId !== targetId) { // Second test force dbclick to occur on same track
      this._click.dbclick = true; // Activate double click lock
      this._click.targetId = targetId;

      if (!event.ctrlKey) { // Simple click unselects all, return to avoid side effects. Unselect then done
        this._simpleClick(targetId);
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        this._controlShiftClick(targetId);
      } else { // Ctrl click behavior (+ normal click behavior toggle selected)
        this._toggleSelected(targetId);
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false; // Desactivate double click lock
      }, 300);
    } else { // Dble click
      this._playTrack(targetId);
    }

    this._selection.sort((a, b) => {
      return (a - b);
    });
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
    let targetId = 0;

    for ( let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        targetId = i;
        break;
      }
    }

    mzk.ui.startLoading()
      .then(() => {
        if (this._playingTrackIndex !== -1) {
          this._tracks[this._playingTrackIndex].playing = false;
        }

        this._playingTrackIndex = targetId;
        this._click.dbclick = false;
        this._tracks[targetId].playing = true;
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
